import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Link
} from '@chakra-ui/react'
import { SearchIcon } from '../../icons/Search'
import {
  BaseItem,
  createAutocomplete,
  InternalAutocompleteSource
} from '@algolia/autocomplete-core'
import { useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ProductItem } from '../../types'
import { useNavigate } from 'react-router-dom'
import { startGetProductById } from '../../redux/product/thunks'

export interface CollectionType {
  source: InternalAutocompleteSource<BaseItem>
  items: ProductItem[]
}

export const Search = (props: any) => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const { products } = useAppSelector((state) => state.products)
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })
  const getSearchProduts = (query: string) => {
    return products?.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Search products',
        onStateChange: ({ state }: any) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'products-id',
            getItems: ({ query }) => {
              if (!!query) {
                console.log(getSearchProduts(query))
                return getSearchProduts(query)
              }
            }
          }
        ],
        ...props
      }),
    [props]
  )

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  }) as BaseItem

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  }) as BaseItem

  console.log(autocompleteState)
  const handleProductDetail = (product: ProductItem): void => {
    dispatch(startGetProductById(product.id))
    navigate(`/product/${product.id}`)
  }
  return (
    <form {...formProps} ref={formRef}>
      <Box pos="relative">
        <InputGroup width="auto">
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input size="md" {...inputProps} />
        </InputGroup>
        {autocompleteState.isOpen && (
          <Box
            pos="absolute"
            top={0}
            left={0}
            mt={12}
            bg="white"
            overflow="hidden"
            zIndex={10}
            ref={panelRef}
            {...(autocomplete.getPanelProps() as BaseItem)}
          >
            {autocompleteState?.collections.map(
              (collection: CollectionType, index) => {
                const { items } = collection

                return (
                  <Stack key={index}>
                    {items.length > 0 && (
                      <Box {...autocomplete.getListProps()}>
                        {items.map((item) => (
                          <Link
                            onClick={() => handleProductDetail(item)}
                            key={item.id}
                          >
                            <Stack
                              key={item.id}
                              p={4}
                              _hover={{ background: 'purple.200' }}
                            >
                              <Text textDecor={'none'}>{item.title}</Text>
                            </Stack>
                          </Link>
                        ))}
                      </Box>
                    )}
                  </Stack>
                )
              }
            )}
          </Box>
        )}
      </Box>
    </form>
  )
}
