import { memo } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import SmoothPicker from "react-native-smooth-picker";

import { styles } from "../styles";
import { Box, Divider, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";
import { PureComponent, useState } from "react";


// class DrinkCard extends PureComponent {
// 	render() {
// 		const ingredientsItems = drink.ingredients.map(a =>
// 			<Text fontSize="sm">- {a[0].name}</Text>
// 		)
	
// 		return (
// 			<Box bgColor={selected ? "red.400" : "gray.300"} borderRadius={8} margin={2} paddingX={2} paddingY={1} height={150} key={drink.name}>
// 				<Text fontSize="xl" alignSelf="center">{drink.name}</Text>
// 				<VStack space={0}>
// 					{ingredientsItems}
// 				</VStack>
// 			</Box>
// 		)
// 	}
// }


class DrinkCard extends PureComponent<{drink: recipe, selected: boolean}> {
	render() {
		const { drink, selected } = this.props;

		const ingredientsItems = drink.ingredients.map(a =>
			<Text fontSize="sm">- {a[0].name}</Text>
		)
	
		return (
			<Box bgColor={selected ? "red.400" : "gray.300"} borderRadius={8} margin={2} paddingX={2} paddingY={1} height={150} key={drink.name}>
				<Text fontSize="xl" alignSelf="center">{drink.name}</Text>
				<VStack space={0}>
					{ingredientsItems}
				</VStack>
			</Box>
		)
	}
}


export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {

	const [selectedIndex, setSelectedIndex] = useState(0);

	// const drinkCards = RECIPES.map(r => new DrinkCard(r))

	return (
		<SafeAreaView>
			<HStack height="100%">
				<Box flex={1}>
					<SmoothPicker
						// offsetSelection={100}
						magnet={false}
						scrollAnimation={false}
						snapInterval={150}
						snapToAlignment="center"
						data={RECIPES}
						onSelected={({ item, index }) => {
							setSelectedIndex(index)
							console.log(index)
						}}
						// TODO: fix this!!!
						renderItem={({ item, index }) => (
							// <Text size="2xl" bold={index===selectedIndex}>{index}</Text>
							// drinkCards[index]
							<DrinkCard drink={item} selected={index === selectedIndex}/>
						)}
					/>
				</Box>
				{/* <ScrollView flex={1} padding={2}>
					{RECIPES.map(r => DrinkCard(r))}
				</ScrollView> */}
				<Divider orientation="vertical"/>
				<Box flex={3}>
					<Text>Hello, World!</Text>
				</Box>
			</HStack>
		</SafeAreaView>
		
	);
}
