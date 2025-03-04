import {
  CocktailSearchDrink,
  CocktailDetail,
  CocktailItem,
  CocktailSearchResult,
  CocktailLookupResult,
} from '@/types/cocktail'
import { parseDate } from '@/utils/dateUtils'
import { capitalizeFirstLetter } from '@/utils/stringUtils'

const INGREDIENT_PREFIX = 'strIngredient'
const MEASURE_PREFIX = 'strMeasure'

export const mapCocktailDrinkToCocktailItem = (drink: CocktailSearchDrink): CocktailItem => {
  const cocktailItem = {} as CocktailItem

  cocktailItem.id = drink.idDrink
  cocktailItem.name = drink.strDrink
  cocktailItem.thumbnail = drink.strDrinkThumb
  return cocktailItem
}

export const mapCocktailDrinkToCocktailDetail = (drink: CocktailSearchDrink): CocktailDetail => {
  const cocktailDetail = mapCocktailDrinkToCocktailItem(drink) as CocktailDetail

  cocktailDetail.alcoholic = drink.strAlcoholic
  cocktailDetail.instructions = drink.strInstructions
    .split(/[.]/)
    .filter((instruction) => instruction.trim())
    .map((instruction) => capitalizeFirstLetter(instruction.trim().replace(/\s+/g, ' ').toLowerCase()))
  // Concatenate measure and ingredient props and map them to a single array
  cocktailDetail.ingredients = Array.from({ length: 15 }, (x, i) => i + 1)
    .map((nb) => {
      const measure = drink[`${MEASURE_PREFIX}${nb}` as keyof CocktailSearchDrink]
      const ingredient = drink[`${INGREDIENT_PREFIX}${nb}` as keyof CocktailSearchDrink]

      return ((measure ? `${measure} ` : '') + (ingredient ? ingredient : '')).trim().replace(/\s+/g, ' ').toLowerCase()
    })
    .filter((ingredient) => ingredient !== '')
  cocktailDetail.ingredientsOnly = Array.from({ length: 15 }, (x, i) => i + 1)
    .map((nb) => {
      const ingredient = drink[`${INGREDIENT_PREFIX}${nb}` as keyof CocktailSearchDrink]

      return ingredient ? ingredient.trim().replace(/\s+/g, ' ').toLowerCase() : ''
    })
    .filter((ingredient) => ingredient !== '')
  cocktailDetail.category = drink.strCategory
  cocktailDetail.dateModified = drink.dateModified ? parseDate(drink.dateModified).toISOString() : null
  return cocktailDetail
}

export const mapCocktailSearchResultToCocktailItems = (result: CocktailSearchResult): CocktailDetail[] => {
  if (!result || !result.drinks || result.drinks === 'no data found') {
    return []
  }
  return result.drinks.map(mapCocktailDrinkToCocktailDetail)
}

export const mapCocktailLookupResultToCocktailDetail = (result: CocktailLookupResult): CocktailDetail => {
  return mapCocktailDrinkToCocktailDetail(result.drinks[0])
}
