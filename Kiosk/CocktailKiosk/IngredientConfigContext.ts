import { createContext } from "react"
import { ingredient } from "./recipes/recipes"



interface IngredientConfigTypes {
  ingredientA: ingredient | null
  ingredientB: ingredient | null
  ingredientC: ingredient | null
  ingredientD: ingredient | null
  ingredientE: ingredient | null
  ingredientF: ingredient | null
  setIngredientA: (ing: ingredient | null) => void
  setIngredientB: (ing: ingredient | null) => void
  setIngredientC: (ing: ingredient | null) => void
  setIngredientD: (ing: ingredient | null) => void
  setIngredientE: (ing: ingredient | null) => void
  setIngredientF: (ing: ingredient | null) => void
}


export const IngredientConfigContext = createContext<IngredientConfigTypes>({
  ingredientA: null,
  ingredientB: null,
  ingredientC: null,
  ingredientD: null,
  ingredientE: null,
  ingredientF: null,
  setIngredientA: (ing: ingredient | null) => {},
  setIngredientB: (ing: ingredient | null) => {},
  setIngredientC: (ing: ingredient | null) => {},
  setIngredientD: (ing: ingredient | null) => {},
  setIngredientE: (ing: ingredient | null) => {},
  setIngredientF: (ing: ingredient | null) => {}
})
