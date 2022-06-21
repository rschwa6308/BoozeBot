import { Text, View, Button } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";


export function MenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Menu"> ) {
	return (
		<View style={styles.container}>
			<Text>Menu Screen</Text>
			<Button
				title="Go to Progress Screen"
				onPress={() => navigation.navigate("Progress")}
			/>
		</View>
	);
}
