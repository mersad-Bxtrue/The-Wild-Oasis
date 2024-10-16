import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" }, // Option to show all cabins
          { value: "no-discount", label: "No discount" }, // Option to filter cabins without discounts
          { value: "with-discount", label: "With discount" }, // Option to filter cabins with discounts
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" }, // Sort cabins by name in ascending order
          { value: "name-desc", label: "Sort by name (Z-A)" }, // Sort cabins by name in descending order
          { value: "regularPrice-asc", label: "Sort by price (low first)" }, // Sort cabins by price (low to high)
          { value: "regularPrice-desc", label: "Sort by price (high first)" }, // Sort cabins by price (high to low)
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" }, // Sort cabins by capacity (low to high)
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" }, // Sort cabins by capacity (high to low)
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
