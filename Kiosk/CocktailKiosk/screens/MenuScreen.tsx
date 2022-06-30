import { Component, memo } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import SmoothPicker from "react-native-smooth-picker";

import { styles } from "../styles";
import { Box, Divider, FlatList, Heading, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";
import { PureComponent, useState } from "react";
import { ListRenderItem, PressableProps } from "react-native";
import { DrinkChart } from "../DrinkChart";


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
					<Box bgColor={selected ? "red.400" : "gray.300"} borderRadius={16} margin={2} paddingX={2} paddingY={1} height={150}>
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



export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {

	const [selectedIndex, setSelectedIndex] = useState(0);

	const renderDrinkCard: ListRenderItem<recipe> = function({ item, index }) {
		return (
			<DrinkCard drink={item} selected={index === selectedIndex} onPressAction={() => setSelectedIndex(index)}/>
		)
	}

	return (
		<SafeAreaView>
			<HStack height="100%">
				<FlatList
					data={RECIPES}
					extraData={selectedIndex}
					renderItem={renderDrinkCard}
					keyExtractor={(item, index) => item.name + index}
					flex={1}
				/>
				<Divider orientation="vertical"/>
				<Box flex={3}>
					<VStack alignItems="center">
						<Heading>{RECIPES[selectedIndex].name}</Heading>
						<DrinkChart ingredients={RECIPES[selectedIndex].ingredients} height={350} width={250}/>
					</VStack>
				</Box>
			</HStack>
		</SafeAreaView>
		
	);
}
