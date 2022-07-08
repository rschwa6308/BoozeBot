import { Component, memo } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import SmoothPicker from "react-native-smooth-picker";

import { styles } from "../styles";
import { Box, Center, Divider, FlatList, Heading, HStack, Pressable, ScrollView, Slider, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";
import { PureComponent, useState } from "react";
import { ListRenderItem, PressableProps } from "react-native";
import { DrinkChart } from "../CustomComponents/DrinkChart";
import { CustomDrinkEditor } from "../CustomComponents/CustomDrinkEditor";


interface DrinkCardProps {
	drink: recipe,
	selected: boolean,
	onPressAction: PressableProps["onPress"]
}


class DrinkCard extends Component<DrinkCardProps> {
	render() {
		const { drink, selected, onPressAction } = this.props;

		const ingredientsItems = drink.ingredients.map(a =>
			<Text fontSize="sm">- {a[0].name}</Text>
		)

		return (
			<Pressable onPress={onPressAction}>
				{({
					isHovered,
					isFocused,
					isPressed
				}) => 
					<Box
						bgColor={selected ? "warmGray.100" : "warmGray.200"}	// TODO: mess with app bg color
						// borderColor={selected ? "blue.200" : "warmGray.200"}
						// borderWidth={2}
						borderRadius={16}
						marginY={2}
						marginX={4}
						paddingX={2} paddingY={1}
						height={150}
						shadow={selected ? 9 : -3}
					>
						<Text fontSize="xl" alignSelf="center">{drink.name}</Text>
						<VStack space={0}>
							{ingredientsItems}
						</VStack>
					</Box>
				}
			</Pressable>
		)
	}

	shouldComponentUpdate(nextProps: DrinkCardProps) {
		return this.props.selected != nextProps.selected
	}
}



function IngredientSlider() {
	return (
		<Slider defaultValue={70} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10}>
			<Slider.Track>
				<Slider.FilledTrack />
			</Slider.Track>
			<Slider.Thumb />
		</Slider>
	)
}




const deepCopy = (obj: Object) => JSON.parse(JSON.stringify(obj))



export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {

	const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
	const [customDrink, setCustomDrink] = useState(deepCopy(RECIPES[0]))

	const renderDrinkCard: ListRenderItem<recipe> = function({ item, index }) {
		return (
			<DrinkCard drink={item} selected={index === selectedRecipeIndex} onPressAction={() => {
				setSelectedRecipeIndex(index)
				setCustomDrink(deepCopy(RECIPES[index]))
			}}/>
		)
	}

	return (
		<SafeAreaView>
			<HStack height="100%">
				<FlatList
					data={RECIPES}
					extraData={selectedRecipeIndex}
					renderItem={renderDrinkCard}
					keyExtractor={(item, index) => item.name + index}
					flex={1}
				/>
				<Divider orientation="vertical"/>
				<Box flex={3}>
					<VStack alignItems="center" space={4}>
						<Heading>{customDrink.name}</Heading>
						{CustomDrinkEditor(customDrink)}
					</VStack>
				</Box>
			</HStack>
		</SafeAreaView>
		
	);
}
