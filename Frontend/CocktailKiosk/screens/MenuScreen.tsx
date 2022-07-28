import { Component, memo } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import SmoothPicker from "react-native-smooth-picker";

import { styles } from "../styles";
import { Badge, Box, Center, Divider, FlatList, Heading, HStack, Pressable, ScrollView, Slider, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";
import { PureComponent, useState } from "react";
import { ListRenderItem, PressableProps, TouchableOpacity } from "react-native";
import { DrinkChart } from "../CustomComponents/DrinkChart";
import { CustomDrinkEditor } from "../CustomComponents/CustomDrinkEditor";
import { deepCopy } from "../utils";


interface DrinkCardProps {
	drink: recipe,
	selected: boolean,
	onPressAction: PressableProps["onPress"]
}


class DrinkCard extends Component<DrinkCardProps> {
	render() {
		const { drink, selected, onPressAction } = this.props;

		const ingredientsItems = drink.ingredients.map(a =>
			<Text
				fontFamily="body"
				fontSize="sm"
				color={selected ? "warmGray.900" : "warmGray.700"}
				// style={{"fontWeight": "300"}}
				key={a[0].name}
			>- {a[0].name}</Text>
		)

		return (
			<Pressable onPress={onPressAction} key={JSON.stringify(drink).substring(0, 100)}>
					<Box
						bgColor={selected ? "warmGray.100" : "warmGray.200"}	// TODO: mess with app bg color
						// borderColor={selected ? "primary.300" : "transparent"}
						// borderWidth={3}
						borderRadius={16}
						marginY={2}
						marginX={4}
						paddingX={2} paddingY={1}
						height={140}
						shadow={selected ? 9 : -5}
					>
						<Text
							style={{"fontFamily": "Baskerville-Italic"}}
							fontSize="xl"
							alignSelf="center"
							color={selected ? "warmGray.900" : "warmGray.700"}
							italic={true}
						>{drink.name}</Text>
						<VStack space={0}>
							{ingredientsItems}
						</VStack>
					</Box>
			</Pressable>
		)
	}

	shouldComponentUpdate(nextProps: DrinkCardProps) {
		return this.props.selected != nextProps.selected
	}
}



class SizeButton extends Component<{text: string, subText: string, selected: boolean, onPressAction: CallableFunction, recommended: boolean}> {
	render() {
		const { text, subText, selected, onPressAction, recommended } = this.props
		return (
			<Pressable
				bgColor={selected ? "warmGray.100" : "warmGray.200"}
				shadow={selected ? 3 : -5}
				width={150} height={45}
				alignItems="center" justifyContent="center"
				borderRadius={16}
				onPress={() => {
					onPressAction()
					this.forceUpdate()	// TODO: fix bug where shadow disappears 
				}}
			>
				{recommended ? <Badge variant="subtle" colorScheme="info" rounded="full" position="absolute" right={-6} top={-6}>★</Badge> : null}
				<Text fontSize="md" style={{"fontWeight": "300"}} color="black">{text}</Text>
				<Text fontSize="xs" style={{"fontWeight": "300"}} color="warmGray.500">{subText}</Text>
			</Pressable>
		)
	}

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.selected != nextProps.selected
	// }
}


// const SizeButton: React.FC<{text: string, subText: string, selected: boolean, onPressAction: PressableProps["onPress"], recommended: boolean}> = ({
// 	text,
// 	subText,
// 	selected,
// 	onPressAction,
// 	recommended
// }) => {
// 	return (
// 		<Pressable
// 			bgColor={selected ? "warmGray.100" : "warmGray.200"}
// 			shadow={selected ? 3 : -5}
// 			width={150} height={45}
// 			alignItems="center" justifyContent="center"
// 			borderRadius={16}
// 			onPress={onPressAction}
// 		>
// 			{recommended ? <Badge variant="subtle" colorScheme="info" rounded="full" position="absolute" right={-6} top={-6}>★</Badge> : null}
// 			<Text fontSize="md" style={{"fontWeight": "300"}} color="black">{text}</Text>
// 			<Text fontSize="xs" style={{"fontWeight": "300"}} color="warmGray.500">{subText}</Text>
// 		</Pressable>
// 	)
// }




export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {

	const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
	const [customDrink, setCustomDrink] = useState<recipe>(deepCopy(RECIPES[0]))
	const [size, setSize] = useState("medium");

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
					paddingTop={2}
				/>
				<Divider orientation="vertical"/>
				<Box flex={3}>
					<VStack alignItems="center" space={6} paddingTop={2}>
						<Heading size="2xl" style={{"fontFamily": "Baskerville-Italic"}}>{customDrink.name}</Heading>
						<CustomDrinkEditor drink={customDrink}/>
						<HStack space={6} alignItems="center" marginTop={2}>
							<SizeButton
								text="small" subText="75mL"
								selected={size=="small"}
								onPressAction={() => setSize("small")}
								recommended={customDrink.recommendedSize == "small"}
							/>
							<SizeButton
								text="medium" subText="150mL"
								selected={size=="medium"}
								onPressAction={() => setSize("medium")}
								recommended={customDrink.recommendedSize == "medium"}
							/>
							<SizeButton
								text="large" subText="250mL"
								selected={size=="large"}
								onPressAction={() => setSize("large")} 
								recommended={customDrink.recommendedSize == "large"}
							/>
						</HStack>
						{customDrink.recommendedSize != null ?
							<HStack position="absolute" left={1} bottom={-6} alignItems="center">
								<Badge variant="subtle" colorScheme="info" rounded="full">★</Badge>
								<Text fontSize="xs" style={{"fontWeight": "300"}} color="warmGray.500"> = recommended</Text>
							</HStack>
						 : null}
					</VStack>
				</Box>
			</HStack>
		</SafeAreaView>
		
	);
}
