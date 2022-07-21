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
  InternalAutocompleteSource,
  AutocompleteOptions
} from '@algolia/autocomplete-core'
import { useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ProductItem } from '../../types'
import { useNavigate } from 'react-router-dom'
import { startGetProductById } from '../../redux/product/thunks'
import { getSearchProduts } from '../../helpers'

export interface CollectionType {
  source: InternalAutocompleteSource<BaseItem>
  items: ProductItem[]
}

export const Search = (props: Partial<AutocompleteOptions<any>>) => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const { products } = useAppSelector((state) => state.products)
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Search products global',
        onStateChange: ({ state }: any) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'products-id',
            getItems: ({ query }) => {
              if (!!query) {
                return getSearchProduts(products, query)
              }
            }
          }
        ],
        ...props
      }),
    [props]
  )

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  }) as any
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  }) as any

  console.log(autocompleteState)
  const handleProductDetail = (product: ProductItem): void => {
    dispatch(startGetProductById(product.id))
    navigate(`/product/${product.id}`)
  }
  return (
    <form {...formProps} ref={formRef}>
      <Box pos="relative">
        <InputGroup width="auto" bg="white" rounded="lg">
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input size="md" ref={inputRef} {...inputProps} />
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
