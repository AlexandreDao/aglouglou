import useCocktailApi from '@/hooks/services/useCocktailApi'
import { mapCocktailSearchResultToCocktailItems } from '@/utils/mapper/CocktailApiMapper'
import {
  useInfiniteQuery,
} from '@tanstack/react-query'

const firstLetterAsciiCode = 'a'.charCodeAt(0)

const lastLetterAsciiCode = 'z'.charCodeAt(0)

const fetchByFirstLetter = async ({ pageParam = firstLetterAsciiCode }) => {
  const { get } = useCocktailApi()

  try {
    const letter = String.fromCharCode(pageParam);
    const { data } = await get(`search.php?f=${letter}`)

    return { drinks: mapCocktailSearchResultToCocktailItems(data), letter }
  }
  catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

const useCocktailSearchByFirstLetter = () => {
  const query = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: fetchByFirstLetter,
    initialPageParam: firstLetterAsciiCode,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextLetterAsciiCode = lastPageParam + 1

      return nextLetterAsciiCode <= lastLetterAsciiCode ? nextLetterAsciiCode : undefined
    },
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days valid cache
    gcTime: 1000 * 60 * 20, // 20 minutes garbage collected
  })

  return query
}

export default useCocktailSearchByFirstLetter
