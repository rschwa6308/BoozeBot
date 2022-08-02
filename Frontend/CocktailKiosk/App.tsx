import React, { useContext, useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "./screens/HomeScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { AdminMenuScreen } from "./screens/AdminMenuScreen";
import { AdminPumpsScreen } from "./screens/AdminPumpsScreen";
import { AdminBluetoothScreen } from "./screens/AdminBluetoothScreen";

import { ingredient, INGREDIENT_LOOKUP } from "./recipes/recipes";
import { AppContext } from "./AppContext";
import { StatusBar } from "react-native";
import { theme } from "./theme"

import AsyncStorage from '@react-native-async-storage/async-storage';


import { BluetoothManager, PUMP_CONTROLLER_DEVICE } from "./BluetoothManager";



// Root Stack pages
export type RootStackParamList = {
	Home: undefined
	Menu: undefined
	Progress: {eta: number}
	AdminMenu: undefined
	AdminPumps: undefined
	AdminBluetooth: undefined
}

const RootStack = createNativeStackNavigator();



const customFonts = {
	"Baskerville-Regular": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf"),
	"Baskerville-Italic": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf"),
	"Baskerville-Bold": require("./assets/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf"),
	"Baskerville-BoldItalic": require("./assets/fonts/Baskerville_Bold_Italic/Baskerville_Bold_Italic.otf"),
};



const storeData = async (key: string, value: string) => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (e) {
		console.log("Error while saving data:", e)
	}
}


const getData = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			return value
		} else {
			return undefined
		}
	} catch(e) {
		console.log("Error while reading data:", e)
	}
}



export default function App() {

	const [ingredientA, setIngredientA] = useState<ingredient | null>(null)
	const [ingredientB, setIngredientB] = useState<ingredient | null>(null)
	const [ingredientC, setIngredientC] = useState<ingredient | null>(null)
	const [ingredientD, setIngredientD] = useState<ingredient | null>(null)
	const [ingredientE, setIngredientE] = useState<ingredient | null>(null)
	const [ingredientF, setIngredientF] = useState<ingredient | null>(null)
	
	// reading from persistent storage
	useEffect(() => {
		getData("@ingredientA").then((val) => {
			setIngredientA(val == undefined ? null : INGREDIENT_LOOKUP(val))
			console.log("read value for ingredientA:", val)
		})
		getData("@ingredientB").then((val) => {
			setIngredientB(val == undefined ? null : INGREDIENT_LOOKUP(val))
		})
		getData("@ingredientC").then((val) => {
			setIngredientC(val == undefined ? null : INGREDIENT_LOOKUP(val))
		})
		getData("@ingredientD").then((val) => {
			setIngredientD(val == undefined ? null : INGREDIENT_LOOKUP(val))
		})
		getData("@ingredientE").then((val) => {
			setIngredientE(val == undefined ? null : INGREDIENT_LOOKUP(val))
		})
		getData("@ingredientF").then((val) => {
			setIngredientF(val == undefined ? null : INGREDIENT_LOOKUP(val))
		})
	}, [])

	// writing to persistent storage (event listeners)
	useEffect(() => {
		console.log("ingredientA has changed")
		storeData("@ingredientA", ingredientA == null ? "EMPTY" : ingredientA.name)
	}, [ingredientA])
	useEffect(() => {
		console.log("ingredientB has changed")
		storeData("@ingredientB", ingredientB == null ? "EMPTY" : ingredientB.name)
	}, [ingredientB])
	useEffect(() => {
		console.log("ingredientC has changed")
		storeData("@ingredientC", ingredientC == null ? "EMPTY" : ingredientC.name)
	}, [ingredientC])
	useEffect(() => {
		console.log("ingredientD has changed")
		storeData("@ingredientD", ingredientD == null ? "EMPTY" : ingredientD.name)
	}, [ingredientD])
	useEffect(() => {
		console.log("ingredientE has changed")
		storeData("@ingredientE", ingredientE == null ? "EMPTY" : ingredientE.name)
	}, [ingredientE])
	useEffect(() => {
		console.log("ingredientF has changed")
		storeData("@ingredientF", ingredientF == null ? "EMPTY" : ingredientF.name)
	}, [ingredientF])


	const [BTManager, _] = useState(new BluetoothManager())

	useEffect(() => {
		// force landscape
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

		// hide status bar
		StatusBar.setHidden(true)

		// initialize bluetooth manager
		BTManager.initialize()
	}, [])

	// ensure bluetooth connection every few seconds
	useEffect(() => {
		const interval = setInterval(() => {
			if (!(BTManager.connected || BTManager.connecting)) {
				// console.log("Attempting to connect")
				BTManager.connect(PUMP_CONTROLLER_DEVICE)
			}
		}, 5000);
	}, []);

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
							<RootStack.Navigator
								screenOptions={{ headerShown: false }}
								screenListeners={{
									state: (e) => {
										// Do something with the state
										const new_screen_name = e.data.state.routes[e.data.state.index].name
										console.log("Screen Changed:", new_screen_name);

										BTManager.sendMessage({
											message_type: "notify_UI_state",
											message_content: {
												UI_state: new_screen_name == "Menu" ? "order_confirmed" : "other"
											}
										})
									},
								}}
							>
								<RootStack.Screen name="Home" component={HomeScreen} />
								<RootStack.Screen name="Menu" component={MenuScreen} />
								<RootStack.Screen name="Progress" component={ProgressScreen} />
								<RootStack.Screen name="AdminMenu" component={AdminMenuScreen} />
								<RootStack.Screen name="AdminPumps" component={AdminPumpsScreen} />
								<RootStack.Screen name="AdminBluetooth" component={AdminBluetoothScreen} />
							</RootStack.Navigator>
						</NavigationContainer>
					</AppContext.Provider>
				</SafeAreaProvider>
			</NativeBaseProvider>
		);
	}

}

