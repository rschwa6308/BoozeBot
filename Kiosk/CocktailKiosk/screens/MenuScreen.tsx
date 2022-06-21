import { View, Button } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";
import { Box, Divider, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";


function DrinkCard(name: string, ingredients: Array<string>) {
	const ingredientsItems = ingredients.map(a =>
		<Text fontSize="sm">- {a}</Text>
	)

	return (
		<Box bgColor={"gray.300"} borderRadius={8} margin={2} paddingX={2} paddingY={1}>
			<Text fontSize="xl" alignSelf="center">{name}</Text>
			<VStack space={0}>
				{ingredientsItems}
			</VStack>
		</Box>
	)
}


export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {
	return (
		<SafeAreaView>
			<HStack height="100%">
				<ScrollView flex={1} padding={2}>
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}
					{DrinkCard("Tequila Sunrise", ["tequila", "orange juice", "grenadine"])}

				</ScrollView>
				<Divider orientation="vertical"/>
				<Box flex={3}>
					<Text>Hello, World!</Text>
				</Box>
			</HStack>
		</SafeAreaView>
		
	);
}
