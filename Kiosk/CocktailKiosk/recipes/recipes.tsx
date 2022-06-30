// Sources:
// - https://www.informationisbeautiful.net/visualizations/cocktails-interactive/


export type ingredient = {
  name: string,
  color: string | null
}

export type recipe = {
  name: string,
  ingredients: Array<[ingredient, number]>
}


export const INGREDIENTS = {
  vodka: {
    name: "vodka",
    color: "#c4d4e0"
  },
  white_rum: {
    name: "white rum",
    color: null
  },
  dark_rum: {
    name: "dark rum",
    color: null
  },
  gin: {
    name: "gin",
    color: null
  },
  tequila: {
    name: "tequila",
    color: null
  },
  whiskey: {
    name: "whiskey",
    color: null
  },
  triple_sec: {
    name: "triple sec",
    color: "#F5AC26"
  },
  simple_syrup: {
    name: "simple syrup",
    color: "#ffffff"
  },
  lime_juice: {
    name: "lime juice",
    color: "#c6dba3"
  },
  lemon_juice: {
    name: "lemon juice",
    color: null
  },
  bitters: {
    name: "bitters",
    color: null
  },
  orange_juice: {
    name: "orange juice",
    color: "#ffa500"
  },
  pineapple_juice: {
    name: "pineapple juice",
    color: null
  },
  grenadine: {
    name: "grenadine",
    color: null
  },
  cranberry_juice: {
    name: "cranberry juice",
    color: "#ba4242"
  },
  club_soda: {
    name: "club soda",
    color: null
  },
  milk: {
    name: "milk",
    color: "#fdfff5"
  },
  ginger_ale: {
    name: "ginger ale",
    color: null
  },
  ginger_beer: {
    name: "ginger beer",
    color: null
  },
  cola: {
    name: "cola",
    color: null
  }
}


// NOTE: for DrinkChart rendering, recipe ingredients listed in order from bottom up

export const RECIPES: Array<recipe> = [
  {
    name: "Cosmopolitan",
    ingredients: [
      [INGREDIENTS.vodka, 4],
      [INGREDIENTS.cranberry_juice, 3],
      [INGREDIENTS.lime_juice, 1.5],
      [INGREDIENTS.triple_sec, 1.5]
    ]
  },
  {
    name: "Kamikaze",
    ingredients: [
      [INGREDIENTS.vodka, 1],
      [INGREDIENTS.lime_juice, 1],
      [INGREDIENTS.triple_sec, 1]
    ]
  },
  {
    name: "Lemon Drop",
    ingredients: [
      [INGREDIENTS.vodka, 2.5],
      [INGREDIENTS.triple_sec, 2],
      [INGREDIENTS.lemon_juice, 1.5]
    ]
  },
  {
    name: "Screwdriver",
    ingredients: [
      [INGREDIENTS.vodka, 1],
      [INGREDIENTS.orange_juice, 2]
    ]
  },
  {
    name: "Moscow Mule",
    ingredients: [
      [INGREDIENTS.ginger_beer, 12],
      [INGREDIENTS.vodka, 4.5],
      [INGREDIENTS.lime_juice, 0.5]
    ]
  },
  {
    name: "Margarita",
    ingredients: [
      [INGREDIENTS.tequila, 3.5],
      [INGREDIENTS.triple_sec, 2],
      [INGREDIENTS.lime_juice, 1.5]
    ]
  },
  {
    name: "Tequila Sunrise",
    ingredients: [
      [INGREDIENTS.orange_juice, 6],
      [INGREDIENTS.tequila, 3],
      [INGREDIENTS.grenadine, 1]
    ]
  },
  {
    name: "Dark 'N' Stormy",
    ingredients: [
      [INGREDIENTS.ginger_beer, 5],
      [INGREDIENTS.dark_rum, 3]
    ]
  },
  {
    name: "Cuba Libre",
    ingredients: [
      [INGREDIENTS.cola, 6],
      [INGREDIENTS.white_rum, 2.5],
      [INGREDIENTS.lime_juice, 0.5]
    ]
  },
  {
    name: "Bacardi",
    ingredients: [
      [INGREDIENTS.white_rum, 4.5],
      [INGREDIENTS.lime_juice, 2],
      [INGREDIENTS.grenadine, 1]
    ]
  },
  {
    name: "Daiquiri",
    ingredients: [
      [INGREDIENTS.white_rum, 4.5],
      [INGREDIENTS.lime_juice, 2.5],
      [INGREDIENTS.simple_syrup, 1.5]
    ]
  },
  {
    name: "White Lady",
    ingredients: [
      [INGREDIENTS.gin, 2],
      [INGREDIENTS.triple_sec, 1.5],
      [INGREDIENTS.lemon_juice, 1]
    ]
  },
  {
    name: "Gin Fizz",
    ingredients: [
      [INGREDIENTS.gin, 4.5],
      [INGREDIENTS.lemon_juice, 3],
      [INGREDIENTS.simple_syrup, 1],
      [INGREDIENTS.club_soda, 8]
    ]
  },
  {
    name: "John Collins",
    ingredients: [
      [INGREDIENTS.club_soda, 4],
      [INGREDIENTS.gin, 3],
      [INGREDIENTS.lemon_juice, 2],
      [INGREDIENTS.simple_syrup, 1]
    ]
  },
  {
    name: "Rum & Coke",
    ingredients: [
      [INGREDIENTS.white_rum, 2],
      [INGREDIENTS.cola, 5]
    ]
  },
  {
    name: "Rum & Coke",
    ingredients: [
      [INGREDIENTS.dark_rum, 2],
      [INGREDIENTS.cola, 5]
    ]
  },
  {
    name: "Vodka Soda",
    ingredients: [
      [INGREDIENTS.vodka, 1],
      [INGREDIENTS.club_soda, 2]
    ]
  },
  {
    name: "Old Fashioned",
    ingredients: [
      [INGREDIENTS.whiskey, 8],
      [INGREDIENTS.simple_syrup, 1],
      [INGREDIENTS.bitters, 0.5]
    ]
  }
]
