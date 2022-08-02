import { Component, memo, useContext, useEffect } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import SmoothPicker from "react-native-smooth-picker";

import { styles } from "../styles";
import { Badge, Box, Button, Center, Divider, FlatList, Heading, HStack, Image, Modal, Pressable, ScrollView, Slider, Text, Toast, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, recipe, RECIPES } from "../recipes/recipes";
import { PureComponent, useState } from "react";
import { ListRenderItem, PressableProps, TouchableOpacity } from "react-native";
import { DrinkChart } from "../CustomComponents/DrinkChart";
import { CustomDrinkEditor } from "../CustomComponents/CustomDrinkEditor";
import { deepCopy } from "../utils";
import { AppContext } from "../AppContext";


interface DrinkCardProps {
	drink: recipe,
	selected: boolean,
	onPressAction: PressableProps["onPress"]
}


const DRINK_SIZES = new Map([
	["small", 75],
	["medium", 150],
	["large", 250]
])


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





export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {
	
	const { BTManager, ingredientA, ingredientB, ingredientC, ingredientD, ingredientE, ingredientF } = useContext(AppContext)

	const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);

	const haveIngredientsFor = (drink: recipe) => {
		const installedIngredientNames = [ingredientA, ingredientB, ingredientC, ingredientD, ingredientE, ingredientF].map(i => i == null ? "EMPTY" : i.name)
		console.log(installedIngredientNames)
		return drink.ingredients.every(([ing, _]) => {
			console.log(ing.name)
			return installedIngredientNames.includes(ing.name)
		})
	}


	const [availableRecipes, setAvailableRecipes] = useState(RECIPES.filter(r => haveIngredientsFor(r)))
	console.log(availableRecipes.length)

	const [customDrink, setCustomDrink] = useState<recipe>(deepCopy(availableRecipes[0]))
	const [size, setSize] = useState<"small" | "medium" | "large">("medium");		// TODO: convert to ENUM type

	const [showModal, setShowModal] = useState(false);



	useEffect(() => {
		BTManager.onRequestOrderStart = () => {
			const ingredient_amounts = [0, 0, 0, 0, 0, 0];

			const total_size: number = DRINK_SIZES.get(size)
			const total_parts: number =  customDrink.ingredients.reduce((partialSum, [_, parts]) => partialSum + parts, 0)

			const missingIngredients: string[] = []

			customDrink.ingredients.forEach(([ing, parts]) => {
				const index = [ingredientA, ingredientB, ingredientC, ingredientD, ingredientE, ingredientF].findIndex((installedIng) => installedIng && ing.name == installedIng.name)

				if (index == -1) {
					missingIngredients.push(ing.name)
				} else {
					ingredient_amounts[index] = total_size * (parts / total_parts)
				}
			})

			// console.log(ingredient_amounts)

			if (missingIngredients.length > 0) {
				if (missingIngredients.length == customDrink.ingredients.length) {
					Toast.show({description: `ERROR: do not have any of the required ingredients installed`})
					return
				} else {
					Toast.show({description: `WARNING: do not currently have ${missingIngredients.join(" or ")} installed. Making drink without...`})
				}
			}

			BTManager.sendMessage({
				message_type: "signal_order_start",
				message_content: {
					ingredient_amounts: ingredient_amounts
				}
			})
		}
	})

	useEffect(() => {
		BTManager.onNotifyOrderStarted = (message_content: {eta: number}) => {
			navigation.navigate("Progress", {eta: message_content.eta})
		}
	})

	const renderDrinkCard: ListRenderItem<recipe> = function({ item, index }) {
		return (
			<DrinkCard drink={item} selected={index === selectedRecipeIndex} onPressAction={() => {
				setSelectedRecipeIndex(index)
				setCustomDrink(deepCopy(availableRecipes[index]))
			}}/>
		)
	}

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}


	return (<>
		<SafeAreaView>
			<HStack height="100%">
				<FlatList
					data={availableRecipes}
					extraData={selectedRecipeIndex}
					renderItem={renderDrinkCard}
					keyExtractor={(item, index) => item.name + index}
					flex={1}
					paddingTop={2}
				/>
				<Divider orientation="vertical"/>
				<Box flex={3}>
					<TouchableOpacity style={{
						position: "absolute", top: 10, right: 8,
						alignItems: "center", justifyContent: "center",
						backgroundColor: "#DDD",
						borderRadius: 12,
						padding: 8,
					}}
						onPress={openModal}
					>
						<Text fontSize="md" style={{"fontWeight": "300"}} color="black"> NEXT  〉</Text>
					</TouchableOpacity>
					<VStack alignItems="center" space={6} paddingTop={2}>
						<Heading size="2xl" style={{"fontFamily": "Baskerville-Italic"}}>{customDrink.name}</Heading>
						<CustomDrinkEditor drink={customDrink}/>
						<HStack space={6} alignItems="center" marginTop={2}>
							<SizeButton
								text="small" subText={`${DRINK_SIZES.get("small")}mL`}
								selected={size=="small"}
								onPressAction={() => setSize("small")}
								recommended={customDrink.recommendedSize == "small"}
							/>
							<SizeButton
								text="medium" subText={`${DRINK_SIZES.get("medium")}mL`}
								selected={size=="medium"}
								onPressAction={() => setSize("medium")}
								recommended={customDrink.recommendedSize == "medium"}
							/>
							<SizeButton
								text="large" subText={`${DRINK_SIZES.get("large")}mL`}
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

		<Modal isOpen={showModal} onClose={closeModal} size="full">
			<Modal.Content maxWidth="825px" minHeight="425px">
				<Modal.CloseButton />
				{/* <Modal.Header>Contact Us</Modal.Header> */}
				<Modal.Body height="400px" marginY={4} marginX={2}>
					<HStack height="100%" justifyContent="space-between">
						<VStack flex={1} justifyContent="space-between">
							<Text fontSize="3xl"><Text fontSize="3xl" bold>1)</Text> Place your glass directly under the nozzle.</Text>
							<Image
								source={require("../assets/renders/glass_in_holder_closeup_annotated.png")}
								alt="place glass reference image"
								size="2xl"
								alignSelf="center"
								borderRadius={16}
							/>
						</VStack>
						<Divider orientation="vertical" height="100%" alignSelf="center" marginX={4}/>
						<VStack flex={1} justifyContent="space-between">
							<Text fontSize="3xl"><Text fontSize="3xl" bold>2)</Text> Press the <Text fontSize="3xl" color="green.600" bold>GREEN</Text> button to start dispensing.</Text>
							<Image
								source={require("../assets/renders/buttons_closeup_annotated.png")}
								alt="place glass reference image"
								size="2xl"
								alignSelf="center"
								borderRadius={16}
							/>
						</VStack>
					</HStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	</>);
}
