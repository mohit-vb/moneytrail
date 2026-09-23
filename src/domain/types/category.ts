export type CategoryType = "expense" | "income";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  isSystem: boolean; // system categories (Other/Other Income) cannot be deleted or renamed
  isArchived: boolean;
}
