import useCocktailApi from '@/hooks/services/useCocktailApi'
import { CocktailSearchResult } from '@/types/cocktail'
import { mapCocktailSearchResultToCocktailItems } from '@/utils/mapper/cocktailApiMapper'
import { useInfiniteQuery } from '@tanstack/react-query'

const firstLetterAsciiCode = 'a'.charCodeAt(0)

const lastLetterAsciiCode = 'z'.charCodeAt(0)

const useFetchByFirstLetter = async ({ pageParam = firstLetterAsciiCode }) => {
  const axios = useCocktailApi()

  try {
    const letter = String.fromCharCode(pageParam)
    const { data } = await axios.get<CocktailSearchResult>(`search.php?f=${letter}`)

    return { drinks: mapCocktailSearchResultToCocktailItems(data), letter }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

const queryKey = ['searchByFirstLetter']

const useCocktailSearchByFirstLetter = () => {
  return useInfiniteQuery({
    queryKey,
    queryFn: useFetchByFirstLetter,
    initialPageParam: firstLetterAsciiCode,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      const nextLetterAsciiCode = lastPageParam + 1

      return nextLetterAsciiCode <= lastLetterAsciiCode ? nextLetterAsciiCode : undefined
    },
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days valid cache
    gcTime: 1000 * 60 * 20, // 20 minutes garbage collected
  })
}

export default useCocktailSearchByFirstLetter
