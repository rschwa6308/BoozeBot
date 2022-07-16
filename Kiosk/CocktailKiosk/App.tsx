import * as ScreenOrientation from "expo-screen-orientation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { BluetoothSetupScreen } from "./screens/BluetoothSetupScreen";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { ingredient } from "./recipes/recipes";
import { IngredientConfigContext } from "./IngredientConfigContext";
import { StatusBar } from "react-native";
import { theme } from "./theme"
import { BLEApp } from "./ble-manager-example";
// import { BleManager } from "react-native-ble-manager/BleManager"

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";



// Root Stack pages
export type RootStackParamList = {
	Home: undefined
	Menu: undefined
	Progress: undefined
	Admin: undefined
	BluetoothSetup: undefined
}

const RootStack = createNativeStackNavigator();



const customFonts = {
  "Baskerville-Regular": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf"),
  "Baskerville-Italic": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf"),
  "Baskerville-Bold": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf"),
};



export default function App() {

	const [ingredientA, setIngredientA] = useState<ingredient | null>(null)
	const [ingredientB, setIngredientB] = useState<ingredient | null>(null)
	const [ingredientC, setIngredientC] = useState<ingredient | null>(null)
	const [ingredientD, setIngredientD] = useState<ingredient | null>(null)
	const [ingredientE, setIngredientE] = useState<ingredient | null>(null)
	const [ingredientF, setIngredientF] = useState<ingredient | null>(null)

	// const [bluetoothIsEnabled, setBluetoothIsEnabled] = useState<boolean>(false)
	// const [isScanning, setIsScanning] = useState<boolean>(false)

	useEffect(() => {
		// force landscape
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

		// hide status bar
		StatusBar.setHidden(true)
	}, [])

	// load fonts
	let [fontsLoaded] = useFonts(customFonts);

	// TODO: figure out why the heck native-base won't apply the custom font

	if (!fontsLoaded) {
    return <AppLoading />;
  } else {
		return (
			<NativeBaseProvider theme={theme}>
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
								<RootStack.Screen name="BluetoothSetup" component={BluetoothSetupScreen} />
							</RootStack.Navigator>
						</NavigationContainer>
					</IngredientConfigContext.Provider>
				</SafeAreaProvider>
			</NativeBaseProvider>
		);
	}

}

