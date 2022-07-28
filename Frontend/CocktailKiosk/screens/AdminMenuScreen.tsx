import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import { Button, Heading, HStack, Spacer, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";





export function AdminMenuScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "AdminMenu"> ) {
  return (
    <VStack space={6} padding={8}>
      <Heading style={{"fontWeight": "bold"}} alignSelf="center" marginBottom={2}>Admin Settings</Heading>
      <TouchableOpacity onPress={() => navigation.navigate("AdminPumps")} style={{"borderWidth": 2, "borderRadius": 8, "padding": 8}}>
        <HStack justifyContent="space-between">
          <Heading> Ingredients &amp; Pumps</Heading>
          <Heading>〉</Heading>
        </HStack>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AdminBluetooth")} style={{"borderWidth": 2, "borderRadius": 8, "padding": 8}}>
        <HStack justifyContent="space-between">
          <Heading> Bluetooth Connectivity</Heading>
          <Heading>〉</Heading>
        </HStack>
      </TouchableOpacity>
    </VStack>
  )
}