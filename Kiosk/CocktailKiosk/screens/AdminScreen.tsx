import { View } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";

import { styles } from "../styles";
import { Box, Text, Heading, HStack, Select, VStack, Button, Switch } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, INGREDIENTS, INGREDIENT_LOOKUP } from "../recipes/recipes";
import { useContext, useState } from "react";
import React from "react";
import { IngredientConfigContext } from "../IngredientConfigContext";
import { getYIQ } from "../utils";



interface ControlUnitProps {
	title: string
	ingredientValue: ingredient | null
	ingredientSetter: (ing: ingredient | null) => void
}

const ControlUnit: React.FC<ControlUnitProps> = ({
	title,
	ingredientValue,
	ingredientSetter
}) => {
	const ingredientConfig = useContext(IngredientConfigContext)

	return (
		<VStack borderWidth={1} borderRadius={16} padding={4} space={4} borderColor="warmGray.400">
			<Heading size="md" marginBottom={2} alignSelf="center">{title}</Heading>
			<HStack alignItems="center" space={4}>
				<Select
					width={180}
					placeholder="Configure Ingredient"
					selectedValue={ingredientValue == null ? "EMPTY" : ingredientValue.name}
					onValueChange={itemValue => {ingredientSetter(INGREDIENT_LOOKUP(itemValue))}}
					fontSize="md"
				>
					<Select.Item value="EMPTY" label="[EMPTY]" key="EMPTY"/>
					{Object.values(INGREDIENTS).map(ing =>
						<Select.Item value={ing.name} label={ing.name} key={ing.name}/>
					)}
				</Select>
				<Box
					bgColor={ingredientValue == null ? "transparent" : ingredientValue.color}
					width={8} height={8}
					borderWidth={1} borderRadius={16}
					borderColor={(ingredientValue == null || getYIQ(ingredientValue.color) > 191) ? "warmGray.300" : "transparent"}
					// borderColor="warmGray.300"
				/>
			</HStack>
			<HStack alignItems="center" justifyContent="space-between">
				<Text fontSize="md">Pump</Text>
				<Switch size="lg"/>
			</HStack>
		</VStack>
	)
}





export function AdminScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Admin"> ) {
	const {
		ingredientA, setIngredientA,
		ingredientB, setIngredientB,
		ingredientC, setIngredientC,
		ingredientD, setIngredientD,
		ingredientE, setIngredientE,
		ingredientF, setIngredientF,
	} = useContext(IngredientConfigContext)

	return (
		<SafeAreaView>
			<VStack width="100%" height="100%" justifyContent="space-evenly">
				<HStack justifyContent="space-evenly">
					<ControlUnit title="Slot A" ingredientValue={ingredientA} ingredientSetter={setIngredientA}/>
					<ControlUnit title="Slot B" ingredientValue={ingredientB} ingredientSetter={setIngredientB}/>
					<ControlUnit title="Slot C" ingredientValue={ingredientC} ingredientSetter={setIngredientC}/>
				</HStack>
				<HStack justifyContent="space-evenly">
					<ControlUnit title="Slot D" ingredientValue={ingredientD} ingredientSetter={setIngredientD}/>
					<ControlUnit title="Slot E" ingredientValue={ingredientE} ingredientSetter={setIngredientE}/>
					<ControlUnit title="Slot F" ingredientValue={ingredientF} ingredientSetter={setIngredientF}/>
				</HStack>
			</VStack>
		</SafeAreaView>
	);
}
