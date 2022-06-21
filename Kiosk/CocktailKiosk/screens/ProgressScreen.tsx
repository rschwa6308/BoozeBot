import { Text, View, Button } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";


export function ProgressScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Progress"> ) {
	return (
		<View style={styles.container}>
			<Text>Progress Screen</Text>
		</View>
	);
}
