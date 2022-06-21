import { Text, View, Button } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";


export function HomeScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Home"> ) {
	return (
		<View style={styles.container}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Menu"
				onPress={() => navigation.navigate("Menu")}
			/>
			<Button
				title="Go to Admin"
				onPress={() => navigation.navigate("Admin")}
			/>
		</View>
	);
}
