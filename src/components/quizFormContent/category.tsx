import React, { useState } from 'react';
import {
  Flex, Icon, Button, Center, createListCollection
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { BiSolidCategoryAlt  } from "react-icons/bi";

interface CategoryProps {
  setCategory: (nextValue: string) => void
}


const Category: React.FC<CategoryProps> = ({ setCategory }) => {
  const [categoryDisplay, setCategoryDisplay] = useState(['Any Category']);
  const categories = createListCollection({
    items: [
      {value: 'any', label: 'Any Category'},
      {value: '9', label: 'General Knowledge'},
      {value: '10', label: 'Entertainment: Books'},
      {value: '11', label: 'Entertainment: Film'},
      {value: '12', label: 'Entertainment: Music'},
      {value: '13', label: 'Entertainment: Musicals & Theatres'},
      {value: '14', label: 'Entertainment: Television'},
      {value: '15', label: 'Entertainment: Video Games'},
      {value: '16', label: 'Entertainment: Board Games'},
      {value: '17', label: 'Science & Nature'},
      {value: '18', label: 'Science: Computers'},
      {value: '19', label: 'Science: Mathematics'},
      {value: '20', label: 'Mythology'},
      {value: '21', label: 'Sports'},
      {value: '22', label: 'Geography'},
      {value: '23', label: 'History'},
      {value: '24', label: 'Politics'},
      {value: '25', label: 'Art'},
      {value: '26', label: 'Celebrities'},
      {value: '27', label: 'Animals'},
      {value: '28', label: 'Vehicles'},
      {value: '29', label: 'Entertainment: Comics'},
      {value: '30', label: 'Science: Gadgets'},
      {value: '31', label: 'Entertainment: Japanese Anime & Manga'},
      {value: '32', label: 'Entertainment: Cartoon & Animations'}
    ]
  });

  return (
    <Field mt={6} label='Category'>
      <Flex w="100%">
        <Center width='2.75rem' borderColor='gray.200' borderWidth='1px' borderRadius='0.375rem'
        borderTopRightRadius={0} borderBottomRightRadius={0} borderRightWidth={0}>
          <Icon boxSize={5}>
            <BiSolidCategoryAlt />
          </Icon>
        </Center>
        {/* <MenuRoot> */}
          {/* <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%" bg='white' fontWeight={'normal'}
            borderWidth='1px' borderColor='gray.200' _focus={{ bg: 'white' }}
            _hover={{ borderColor: 'teal.400' }} _expanded={{ borderColor: 'teal.400', bg: 'white' }}
          > */}
          {/* <MenuTrigger>
            <Button w='100%' bg='white' fontWeight={'normal'} borderWidth='1px' borderColor='gray.200' _focus={{ bg: 'white' }} _hover={{ borderColor: 'teal.400' }} _expanded={{ borderColor: 'teal.400', bg: 'white' }}>
              <ChevronDownIcon /> {categoryDisplay}
            </Button>
          </MenuTrigger>
          <MenuContent overflowY="scroll" h="200px" w='27.5rem'>
            {categories.map((categoryObj) => (<MenuItem key={'categoryOption'+categoryObj.value} value={categoryObj.value} onClick={() => {setCategory(categoryObj.value); setCategoryDisplay(categoryObj.label);}}>{categoryObj.label}</MenuItem>))}
          </MenuContent>
        </MenuRoot> */}
        <SelectRoot collection={categories} size="md" value={categoryDisplay} onValueChange={(e) => {setCategory(e.value[0]); setCategoryDisplay(e.value);}}>
          <SelectTrigger>
            <SelectValueText placeholder='Any Category' />
          </SelectTrigger>
          <SelectContent>
            {categories.items.map((categoryObj) => (
              <SelectItem item={categoryObj} key={categoryObj.value}>
                {categoryObj.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Flex>
    </Field>
  )
}

export default Category;