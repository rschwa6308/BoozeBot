import { View } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";

import { styles } from "../styles";
import { Box, Text, Heading, HStack, Select, VStack, Button, Switch } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ingredient, INGREDIENTS, INGREDIENT_LOOKUP } from "../recipes/recipes";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { getYIQ } from "../utils";



interface ControlUnitProps {
	title: string
	ingredientValue: ingredient | null
	ingredientSetter: (ing: ingredient | null) => void
	pumpNumber: number
}

const ControlUnit: React.FC<ControlUnitProps> = ({
	title,
	ingredientValue,
	ingredientSetter,
	pumpNumber
}: ControlUnitProps) => {
	const { BTManager } = useContext(AppContext)

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
				<Switch size="lg" onValueChange={(on: boolean) => BTManager.sendMessage({
					message_type: "signal_manual_control",
					message_content: {
						pump_number: pumpNumber,
						state: on
					}
				})}/>
			</HStack>
		</VStack>
	)
}





export function AdminPumpsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "AdminPumps"> ) {
	const {
		ingredientA, setIngredientA,
		ingredientB, setIngredientB,
		ingredientC, setIngredientC,
		ingredientD, setIngredientD,
		ingredientE, setIngredientE,
		ingredientF, setIngredientF,
	} = useContext(AppContext)

	return (
		<SafeAreaView>
			<VStack width="100%" height="100%" justifyContent="space-evenly">
				<HStack justifyContent="space-evenly">
					<ControlUnit title="Slot A" ingredientValue={ingredientA} ingredientSetter={setIngredientA} pumpNumber={1}/>
					<ControlUnit title="Slot B" ingredientValue={ingredientB} ingredientSetter={setIngredientB} pumpNumber={2}/>
					<ControlUnit title="Slot C" ingredientValue={ingredientC} ingredientSetter={setIngredientC} pumpNumber={3}/>
				</HStack>
				<HStack justifyContent="space-evenly">
					<ControlUnit title="Slot D" ingredientValue={ingredientD} ingredientSetter={setIngredientD} pumpNumber={4}/>
					<ControlUnit title="Slot E" ingredientValue={ingredientE} ingredientSetter={setIngredientE} pumpNumber={5}/>
					<ControlUnit title="Slot F" ingredientValue={ingredientF} ingredientSetter={setIngredientF} pumpNumber={6}/>
				</HStack>
			</VStack>
		</SafeAreaView>
	);
}
