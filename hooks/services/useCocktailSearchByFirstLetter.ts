import useCocktailApi from '@/hooks/services/useCocktailApi'
import { mapCocktailSearchResultToCocktailItems } from '@/utils/mapper/CocktailApiMapper'
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'

type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' 
| 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' 
| 'y' | 'z'

const useCocktailSearchByFirstLetter = (firstLetter?: Letter) => {
  const {get} = useCocktailApi()
  const firstLetterAsciiCode = 'a'.charCodeAt(0)

  const query = useInfiniteQuery({
    queryKey: ['search', firstLetter],
    queryFn: async ({pageParam}) => {
      const {data} = await get(`search.php?f=${firstLetter || String.fromCharCode(firstLetterAsciiCode + pageParam)}`)
      return mapCocktailSearchResultToCocktailItems(data)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1
    },
    maxPages: 25
  })

  return query
}

export default useCocktailSearchByFirstLetter