import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn_ui/components/ui/select";

const SelectItems = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items</SelectLabel>
          <SelectItem value="Masks">Masks</SelectItem>
          <SelectItem value="Syringes">Syringes</SelectItem>
          <SelectItem value="Gloves">Gloves</SelectItem>
          <SelectItem value="Thermometers">Thermometers</SelectItem>
          <SelectItem value="Bandages">Bandages</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectItems;
