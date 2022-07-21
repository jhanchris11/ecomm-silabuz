import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from '../../hooks/useForm'
import { startEditProduct, startNewProduct } from '../../redux/product/thunks'

import { ProductItem } from '../../types'

interface MyProps {
  onClose: () => void
  isOpen: boolean
}

export const ProductModal = ({ onClose, isOpen }: MyProps) => {
  const { currentProduct, categories, isEditProduct } = useAppSelector(
    (state) => state.products
  )

  const { formState, title, description, image, handleInputChange } = useForm(
    currentProduct as ProductItem,
    {}
  )
  const dispatch = useAppDispatch()
  const [valueNumber, setValueNumber] = useState<number>()
  const [valueSelect, setValueSelect] = useState<string>('')

  const handleEditProduct = (): void => {
    const newFormState = {
      ...formState,
      price: Number(valueNumber),
      category: valueSelect,
      ...currentProduct.rating
    }
    console.log(newFormState)
    dispatch(startEditProduct(newFormState.id, newFormState))
    onClose()
  }

  const handleSaveProduct = (): void => {
    const rating = {
      rate: 0,
      count: 0
    }
    const newFormState = {
      ...formState,
      price: Number(valueNumber),
      category: valueSelect,
      ...rating
    }
    onClose()
    // dispatch(startNewProduct(newFormState))
  }

  useEffect(() => {
    setValueNumber(currentProduct.price)
    setValueSelect(currentProduct.category)
  }, [currentProduct.price, currentProduct.category])

  const handleInputNumberPrice = (valueString: any) => {
    setValueNumber(valueString)
  }
  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(e.target.value)
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditProduct ? 'Edit Product' : 'New Product'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <form>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Textarea
                name="title"
                onChange={handleInputChange}
                placeholder="Title"
                value={title}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                onChange={handleInputNumberPrice}
                value={valueNumber}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                onChange={handleInputChange}
                value={description}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>URL Image</FormLabel>
              <Textarea
                name="image"
                onChange={handleInputChange}
                value={image}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select option"
                value={valueSelect}
                onChange={handleSelectCategory}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          {isEditProduct ? (
            <Button colorScheme="blue" mr={3} onClick={handleEditProduct}>
              Edit
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleSaveProduct}>
              Save
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
