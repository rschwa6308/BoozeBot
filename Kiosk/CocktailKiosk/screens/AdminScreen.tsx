import { Text, View, Button } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";


export function AdminScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Admin"> ) {
	return (
		<View style={styles.container}>
			<Text>Admin Screen</Text>
		</View>
	);
}
