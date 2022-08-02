import { Box, Center, Divider, FlatList, Heading, HStack, Pressable, ScrollView, Slider, Text, VStack } from "native-base";

import { DrinkChart } from "./DrinkChart";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";
import { useEffect, useState } from "react";
import { deepCopy, getYIQ } from "../utils";


const modifyDrink = (drink: recipe, ing: ingredient, newParts: number) => {
	// const clone: recipe = deepCopy(drink)
	const entry = drink.ingredients.find((entry) => entry[0] === ing)
	entry[1] = newParts
	return drink
}


const IngredientSlider: React.FC<{drink: recipe, ing: ingredient, parts: number}> = ({
	drink,
	ing,
	parts
}) => {

	var maxPartsFound = Math.max(...drink.ingredients.map(([drink, parts]) => parts))

	return (
		<Slider
			size="lg"
			colorScheme="gray"
			minValue={0} maxValue={maxPartsFound * 1.5}
			step={0.5}
			defaultValue={parts}
			onChange={(v: number) => {
				modifyDrink(drink, ing, v)
				// console.log(drink)
			}}
		>
			<Slider.Track minHeight={3}>
				<Slider.FilledTrack
					bg={ing.color}
					minHeight={3}
					borderWidth={2}
					borderRadius={8}
					borderColor="warmGray.700"
					// borderColor={(getYIQ(ing.color) > 191) ? "warmGray.300" : "transparent"}
				/>
			</Slider.Track>
			<Slider.Thumb />
		</Slider>
	)
}



export const CustomDrinkEditor: React.FC<{drink: recipe}> = ({
	drink
}) => {
	return (
		<HStack space={16}>
			<DrinkChart drink={drink} height={350} width={225}/>
			<VStack alignItems="center" w="300" space={8} marginTop={8}>
				{drink.ingredients.slice(0).reverse().map(([ing, parts]) =>
					<IngredientSlider drink={drink} ing={ing} parts={parts} key={ing.name} />
				)}
			</VStack>
		</HStack>
		)
}

