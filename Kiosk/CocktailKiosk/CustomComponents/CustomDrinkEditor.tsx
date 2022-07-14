import { Box, Center, Divider, FlatList, Heading, HStack, Pressable, ScrollView, Slider, Text, VStack } from "native-base";

import { DrinkChart } from "./DrinkChart";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";


const IngredientSlider: React.FC<{drink: recipe, ing: ingredient}> = ({
	drink,
	ing
}) => {
	return (
		<Slider
			size="md"
			colorScheme="gray"
			minValue={0} maxValue={100}
			step={10}
			defaultValue={70}
			key={JSON.stringify(drink.name).substring(0, 100) + ing.name}
		>
			<Slider.Track>
				<Slider.FilledTrack />
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
			<DrinkChart ingredients={drink.ingredients} height={350} width={225}/>
			<VStack alignItems="center" w="300" space={8}>
				{drink.ingredients.map(([ing, parts]) => <IngredientSlider drink={drink} ing={ing}/>)}
			</VStack>
		</HStack>
		)
}

