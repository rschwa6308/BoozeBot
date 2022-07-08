import { Box, Center, Divider, FlatList, Heading, HStack, Pressable, ScrollView, Slider, Text, VStack } from "native-base";

import { DrinkChart } from "./DrinkChart";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";


function IngredientSlider() {
	return (
		<Slider
			size="md"
			colorScheme="gray"
			minValue={0} maxValue={100}
			step={10}
			defaultValue={70}
		>
			<Slider.Track>
				<Slider.FilledTrack />
			</Slider.Track>
			<Slider.Thumb />
		</Slider>
	)
}



export function CustomDrinkEditor(drink: recipe) {
	var totalParts = 0
	drink.ingredients.forEach(item => {
		totalParts += item[1]
	});

	return (
	<HStack space={10}>
		<DrinkChart ingredients={drink.ingredients} height={350} width={225}/>
		<VStack alignItems="center" w="300" space={8}>
			{drink.ingredients.map(ing => <IngredientSlider/>)}
		</VStack>
	</HStack>
	)
}