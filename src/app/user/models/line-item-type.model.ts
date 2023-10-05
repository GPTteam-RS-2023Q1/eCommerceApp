import { LocalizedString } from '@app/shared/models/interfaces/product';

export interface LineItemTypeDraft {
  key: string;
  name: LocalizedString;
  resourceTypeIds: string[];
  fieldDefinitions: FieldDefinition[];
}

export interface LineItemFields {
  description: string;
  'short-description': string;
}

export interface FieldDefinition {
  type: {
    name: string;
  };
  name: string;
  label: LocalizedString;
  required: boolean;
}
