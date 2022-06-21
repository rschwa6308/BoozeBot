import * as ScreenOrientation from "expo-screen-orientation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


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

	return (
		<NativeBaseProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<RootStack.Navigator screenOptions={{ headerShown: false }}>
						<RootStack.Screen name="Home" component={HomeScreen} />
						<RootStack.Screen name="Menu" component={MenuScreen} />
						<RootStack.Screen name="Progress" component={ProgressScreen} />
						<RootStack.Screen name="Admin" component={AdminScreen} />
					</RootStack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
}
