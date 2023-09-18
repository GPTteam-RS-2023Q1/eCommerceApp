import { LocalizedString } from './product';

export interface Category {
  id: string;
  key: string;
  version: number;
  name: LocalizedString;
  slug: LocalizedString;
  description: LocalizedString;
  metaDescription: LocalizedString;
  parent: Parent;
  ancestors: any[];
  orderHint: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface Parent {
  typeId: string;
  id: string;
}
