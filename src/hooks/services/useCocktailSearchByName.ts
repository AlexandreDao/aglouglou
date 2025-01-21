import useCocktailApi from '@/hooks/services/useCocktailApi'
import { CocktailDetail } from '@/types/cocktail'
import { mapCocktailSearchResultToCocktailItems } from '@/utils/mapper/cocktailApiMapper'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

const EMPTY_DRINKS = { drinks: [] as CocktailDetail[] }

const useCocktailSearchByName = (searchQuery: string) => {
  const queryKey = useMemo(() => ['searchByName', searchQuery], [searchQuery])
  const queryFn = useCallback(
    async function useQueryFn() {
      const { get } = useCocktailApi()

      try {
        const { data } = await get(`search.php?s=${searchQuery}`)

        return { drinks: mapCocktailSearchResultToCocktailItems(data) }
      } catch (error) {
        console.error(error)
        throw new Error('Unexpected error')
      }
    },
    [searchQuery]
  )

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!searchQuery.trim(),
    placeholderData: EMPTY_DRINKS,
    staleTime: 2 * 24 * 60 * 60 * 1000, // 2 days valid cache
    gcTime: 1000 * 60 * 5, // 5 minutes garbage collected
  })
}

export default useCocktailSearchByName
