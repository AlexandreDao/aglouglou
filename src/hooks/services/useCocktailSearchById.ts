import cocktailApiSingleton from '@/hooks/services/useCocktailApi'
import { CocktailDetail, CocktailLookupResponse } from '@/types/cocktail'
import { mapCocktailDrinkToCocktailDetail } from '@/utils/mapper/cocktailApiMapper'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

interface SearchByIdParam {
  id?: string | null
  onSuccess?: (res: CocktailDetail) => void
}

const useCocktailSearchById = ({ id, onSuccess }: SearchByIdParam) => {
  const queryKey = useMemo(() => ['searchById', id], [id])
  const queryFn = useCallback(
    async function useQueryFn() {
      const axios = cocktailApiSingleton()

      try {
        const { data } = await axios.get<CocktailLookupResponse>(`lookup.php?i=${id}`)

        if (data.drinks === 'no data found') {
          return null
        }
        const res = mapCocktailDrinkToCocktailDetail(data.drinks[0])
        onSuccess?.(res)
        return res
      } catch (error) {
        console.error(error)
        throw new Error('Unexpected error')
      }
    },
    [id]
  )

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    placeholderData: null,
    staleTime: 2 * 24 * 60 * 60 * 1000, // 2 days valid cache
    gcTime: 1000 * 60 * 20, // 20 minutes garbage collected
  })
}

export default useCocktailSearchById
