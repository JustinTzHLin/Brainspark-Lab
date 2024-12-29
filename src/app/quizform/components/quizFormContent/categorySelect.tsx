import { useState } from "react";
import { Flex, Center, createListCollection } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { BiSolidCategoryAlt } from "react-icons/bi";

interface CategorySelectProps {
  setCategory: (nextValue: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ setCategory }) => {
  const [categoryDisplay, setCategoryDisplay] = useState(["Any Category"]);
  const categories = createListCollection({
    items: [
      { value: "any", label: "Any Category" },
      { value: "9", label: "General Knowledge" },
      { value: "10", label: "Entertainment: Books" },
      { value: "11", label: "Entertainment: Film" },
      { value: "12", label: "Entertainment: Music" },
      { value: "13", label: "Entertainment: Musicals & Theatres" },
      { value: "14", label: "Entertainment: Television" },
      { value: "15", label: "Entertainment: Video Games" },
      { value: "16", label: "Entertainment: Board Games" },
      { value: "17", label: "Science & Nature" },
      { value: "18", label: "Science: Computers" },
      { value: "19", label: "Science: Mathematics" },
      { value: "20", label: "Mythology" },
      { value: "21", label: "Sports" },
      { value: "22", label: "Geography" },
      { value: "23", label: "History" },
      { value: "24", label: "Politics" },
      { value: "25", label: "Art" },
      { value: "26", label: "Celebrities" },
      { value: "27", label: "Animals" },
      { value: "28", label: "Vehicles" },
      { value: "29", label: "Entertainment: Comics" },
      { value: "30", label: "Science: Gadgets" },
      { value: "31", label: "Entertainment: Japanese Anime & Manga" },
      { value: "32", label: "Entertainment: Cartoon & Animations" },
    ],
  });

  return (
    <Field mt={8} label="Category">
      <Flex w="full">
        <Center
          width="2.5rem"
          borderColor="gray.200"
          borderWidth="1px"
          borderRadius="0.375rem"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          borderRightWidth={0}
        >
          <BiSolidCategoryAlt size={20} />
        </Center>
        <SelectRoot
          w="calc(100% - 2.5rem)"
          collection={categories}
          size="md"
          value={categoryDisplay}
          onValueChange={(e) => {
            setCategory(e.value[0]);
            setCategoryDisplay(e.value);
          }}
        >
          <SelectTrigger>
            <Center w="full">
              <SelectValueText placeholder="Any Category" />
            </Center>
          </SelectTrigger>
          <SelectContent>
            {categories.items.map((categoryObj) => (
              <SelectItem item={categoryObj} key={categoryObj.value}>
                <Center w="full">{categoryObj.label}</Center>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Flex>
    </Field>
  );
};

export default CategorySelect;
