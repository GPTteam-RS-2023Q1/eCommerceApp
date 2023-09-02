import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { map } from 'rxjs';

import { Category } from '@app/core/models/category';
import { selectCatalogCategories } from '@app/ngrx/selectors/catalog.selector';
import { EMPTY_ARRAY, TuiHandler } from '@taiga-ui/cdk';
import { TUI_TREE_CONTENT } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { TreeItemComponent } from './tree-item/tree-item.component';

interface TreeNode {
  children: TreeNode[];
  text: string;
  link: string;
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

  public selectedCategory = this.route.paramMap.pipe(
    map((params) => params.get('category'))
  );

  constructor(private store: Store, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.store.select(selectCatalogCategories).subscribe((categories) => {
      this.data = this.createTree(categories);
    });
  }

  public handler: TuiHandler<TreeNode, TreeNode[]> = (item) =>
    item.children || EMPTY_ARRAY;

  private arrayToTree(categories: Category[], parent?: string): TreeNode[] {
    return categories
      .filter((category) => category.parent && category.parent.id === parent)
      .map((child) => {
        const array = this.arrayToTree(categories, child.id);
        return { text: child.name.en, link: child.key, children: array };
      });
  }

  private createTree(categories: Category[] | null): TreeNode[] {
    const defaultTree = [
      {
        text: 'Not found',
        link: 'path',
        children: [],
      },
    ];

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
      children: this.arrayToTree(categories, root?.id),
    };

    return [treeNode];
  }
}
