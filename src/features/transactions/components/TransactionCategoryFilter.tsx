import SelectEl from "../../../ui/SelectEl";
import { seedCategories } from "../../../data/seeds";

type TransactionCategoryFilterProps = {
  onFilter: (categoryId: string) => void;
};

export default function TransactionCategoryFilter({
  onFilter,
}: TransactionCategoryFilterProps) {
  return (
    <div className="relative">
      <SelectEl onChange={(e) => onFilter(e.target.value)}>
        <option value="Category">Category</option>
        {seedCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectEl>
    </div>
  );
}
