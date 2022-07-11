import * as ScreenOrientation from "expo-screen-orientation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useState } from "react";
import { ingredient } from "./recipes/recipes";
import { IngredientConfigContext } from "./IngredientConfigContext";


// Root Stack pages
export type RootStackParamList = {
	Home: undefined;
	Menu: undefined;
	Progress: undefined;
	Admin: undefined;
}

const RootStack = createNativeStackNavigator();



export default function App() {
	// force landscape
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

	const [ingredientA, setIngredientA] = useState<ingredient | null>(null)
	const [ingredientB, setIngredientB] = useState<ingredient | null>(null)
	const [ingredientC, setIngredientC] = useState<ingredient | null>(null)
	const [ingredientD, setIngredientD] = useState<ingredient | null>(null)
	const [ingredientE, setIngredientE] = useState<ingredient | null>(null)
	const [ingredientF, setIngredientF] = useState<ingredient | null>(null)

	return (
		<NativeBaseProvider>
			<SafeAreaProvider>
				<IngredientConfigContext.Provider value={{
					ingredientA, setIngredientA,
					ingredientB, setIngredientB,
					ingredientC, setIngredientC,
					ingredientD, setIngredientD,
					ingredientE, setIngredientE,
					ingredientF, setIngredientF,
				}}>
					<NavigationContainer>
						<RootStack.Navigator screenOptions={{ headerShown: false }}>
							<RootStack.Screen name="Home" component={HomeScreen} />
							<RootStack.Screen name="Menu" component={MenuScreen} />
							<RootStack.Screen name="Progress" component={ProgressScreen} />
							<RootStack.Screen name="Admin" component={AdminScreen} />
						</RootStack.Navigator>
					</NavigationContainer>
				</IngredientConfigContext.Provider>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
}
