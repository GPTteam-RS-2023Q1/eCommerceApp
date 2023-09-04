import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs';

import { Category } from '@app/core/models/category';
import { CategoryService } from '@app/core/services/category.service';
import { selectCatalogCategories } from '@app/ngrx/selectors/catalog.selector';
import { EMPTY_ARRAY, TuiHandler } from '@taiga-ui/cdk';
import { TUI_TREE_CONTENT } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { TreeItemComponent } from './tree-item/tree-item.component';

interface TreeNode {
  children: TreeNode[];
  text: string;
  link: string;
  id: string;
}

@Component({
  selector: 'ec-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_TREE_CONTENT,
      useValue: new PolymorpheusComponent(TreeItemComponent),
    },
  ],
})
export class CategoriesComponent implements OnInit {
  public data!: TreeNode[];

  public map = new Map<TreeNode, boolean>();

  public selectedCategory = this.route.paramMap.pipe(
    map((params) => params.get('category'))
  );

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  public ngOnInit(): void {
    this.store
      .select(selectCatalogCategories)
      .pipe(take(1))
      .subscribe((categories) => {
        this.data = this.createTree(categories);
      });

    this.openTree();
  }

  public handler: TuiHandler<TreeNode, TreeNode[]> = (item) =>
    item.children || EMPTY_ARRAY;

  private openTree(): void {
    const activeCategory = this.route.snapshot.data['category'] as Category;
    let nodes = this.data;
    activeCategory.ancestors.forEach((ancestor) => {
      const parent = nodes.find((node) => node.id === ancestor.id);
      if (parent) {
        this.openNode(parent);
        nodes = parent.children;
      }
    });

    const target = nodes.find((node) => node.id === activeCategory.id);

    if (target) {
      this.openNode(target);
    }
  }

  private arrayToTree(categories: Category[], parent?: string): TreeNode[] {
    return categories
      .filter((category) => category.parent && category.parent.id === parent)
      .map((child) => {
        const array = this.arrayToTree(categories, child.id);
        const node = {
          text: child.name.en,
          id: child.id,
          link: child.key,
          children: array,
        };
        return node;
      });
  }

  private createTree(categories: Category[] | null): TreeNode[] {
    const defaultTree = {} as TreeNode[];
    if (!categories) {
      return defaultTree;
    }

    const root = categories.find((category) => !category.parent);

    if (!root) {
      return defaultTree;
    }

    const treeNode = {
      text: root.name.en || '',
      link: root.description.en,
      id: root.id,
      children: this.arrayToTree(categories, root.id),
    };

    return [treeNode];
  }

  public openNode(node: TreeNode): void {
    this.categoryService.menuSubject.next(false);
    this.map.set(node, true);
  }
}
