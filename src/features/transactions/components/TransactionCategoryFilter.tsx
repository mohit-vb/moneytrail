import SelectEl from "../../../ui/SelectEl";
import { seedCategories } from "../../../data/seeds";

type TransactionCategoryFilterProps = {
  categoryId: string;
  onFilter: (categoryId: string) => void;
};

export default function TransactionCategoryFilter({
  categoryId,
  onFilter,
}: TransactionCategoryFilterProps) {
  return (
    <div className="relative">
      <SelectEl
        value={categoryId}
        className="rounded-full"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="Category" disabled={true}>
          Category
        </option>
        {seedCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectEl>
    </div>
  );
}
