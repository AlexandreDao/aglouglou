import useCocktailApi from '@/hooks/services/useCocktailApi'
import { mapCocktailSearchResultToCocktailItems } from '@/utils/mapper/cocktailApiMapper'
import { useQuery } from '@tanstack/react-query'

const useCocktailSearchByName = (searchQuery: string) => {
  const queryKey = ['searchByName', searchQuery]

  return useQuery({
    queryKey,
    queryFn: async function useQueryFn() {
      const { get } = useCocktailApi()

      if (!searchQuery.trim()) {
        return { drinks: [] }
      }
      try {
        const { data } = await get(`search.php?s=${searchQuery}`)

        return { drinks: mapCocktailSearchResultToCocktailItems(data) }
      } catch (error) {
        console.error(error)
        throw new Error('Unexpected error')
      }
    },
    staleTime: 2 * 24 * 60 * 60 * 1000, // 2 days valid cache
    gcTime: 1000 * 60 * 5, // 5 minutes garbage collected
  })
}

export default useCocktailSearchByName
