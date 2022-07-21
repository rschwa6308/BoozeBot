import * as ScreenOrientation from "expo-screen-orientation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { BluetoothDebugScreen } from "./screens/BluetoothDebugScreen";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { ingredient } from "./recipes/recipes";
import { AppContext } from "./AppContext";
import { StatusBar } from "react-native";
import { theme } from "./theme"
// import { BLEApp } from "./ble-manager-example";
// import { BleManager } from "react-native-ble-manager/BleManager"

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { BluetoothManager } from "./BluetoothManager";



// Root Stack pages
export type RootStackParamList = {
	Home: undefined
	Menu: undefined
	Progress: undefined
	Admin: undefined
	BluetoothDebug: undefined
}

const RootStack = createNativeStackNavigator();



const customFonts = {
  "Baskerville-Regular": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf"),
  "Baskerville-Italic": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf"),
  "Baskerville-Bold": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf"),
  "Baskerville-BoldItalic": require("./assets/fonts/Baskerville_Bold_Italic/Baskerville_Bold_Italic.otf"),
};



export default function App() {

	const [ingredientA, setIngredientA] = useState<ingredient | null>(null)
	const [ingredientB, setIngredientB] = useState<ingredient | null>(null)
	const [ingredientC, setIngredientC] = useState<ingredient | null>(null)
	const [ingredientD, setIngredientD] = useState<ingredient | null>(null)
	const [ingredientE, setIngredientE] = useState<ingredient | null>(null)
	const [ingredientF, setIngredientF] = useState<ingredient | null>(null)

	const [BTManager, _] = useState(new BluetoothManager())

	useEffect(() => {
		// force landscape
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

		// hide status bar
		StatusBar.setHidden(true)

		// initialize bluetooth manager
		BTManager.initialize()
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
					<AppContext.Provider value={{
						ingredientA, setIngredientA,
						ingredientB, setIngredientB,
						ingredientC, setIngredientC,
						ingredientD, setIngredientD,
						ingredientE, setIngredientE,
						ingredientF, setIngredientF,
						BTManager
					}}>
						<NavigationContainer>
							<RootStack.Navigator screenOptions={{ headerShown: false }}>
								<RootStack.Screen name="Home" component={HomeScreen} />
								<RootStack.Screen name="Menu" component={MenuScreen} />
								<RootStack.Screen name="Progress" component={ProgressScreen} />
								<RootStack.Screen name="Admin" component={AdminScreen} />
								<RootStack.Screen name="BluetoothDebug" component={BluetoothDebugScreen} />
							</RootStack.Navigator>
						</NavigationContainer>
					</AppContext.Provider>
				</SafeAreaProvider>
			</NativeBaseProvider>
		);
	}

}

