import React, { useState } from 'react';
import {
  Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Icon, Select, Button, Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { BiSolidCategoryAlt  } from "react-icons/bi";
import { ChevronDownIcon } from '@chakra-ui/icons';

interface CategoryProps {
  setCategory: (nextValue: string) => void
}

const Category: React.FC<CategoryProps> = ({ setCategory }) => {
  const [categoryDisplay, setCategoryDisplay] = useState('Any Category');
  const categories = [
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

  return (
    <FormControl mt={6}>
      <FormLabel color='teal.300'>Category</FormLabel>
      <Flex>
        <InputGroup width='2.5rem' zIndex='10'>
          <InputLeftElement pointerEvents='none'>
            <Icon boxSize={5} color='teal.300' as={BiSolidCategoryAlt }/>
          </InputLeftElement>
          <Input width='0rem' pr='0' />
        </InputGroup>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w='100%' bg='white' fontWeight={'normal'}
            borderWidth='2px' borderColor='white' _focus={{ bg: 'white' }}
            _hover={{ borderColor: 'teal.300' }} _expanded={{ borderColor: 'teal.300', bg: 'white' }}
          >
            {categoryDisplay}
          </MenuButton>
          <MenuList overflowY="auto" h="200px" w='27.5rem'>
            {categories.map((categoryObj) => (<MenuItem key={'categoryOption'+categoryObj.value} value={categoryObj.value} onClick={() => {setCategory(categoryObj.value); setCategoryDisplay(categoryObj.label);}}>{categoryObj.label}</MenuItem>))}
          </MenuList>
        </Menu>
      </Flex>
    </FormControl>
  )
}

export default Category;