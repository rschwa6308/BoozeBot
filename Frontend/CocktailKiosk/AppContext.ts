import { createContext } from "react"

import { ingredient } from "./recipes/recipes"
import { BluetoothManager } from "./BluetoothManager"



interface AppContextTypes {
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

  BTManager: BluetoothManager
}


export const AppContext = createContext<AppContextTypes>({
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
  setIngredientF: (ing: ingredient | null) => {},
  
  BTManager: null
})
