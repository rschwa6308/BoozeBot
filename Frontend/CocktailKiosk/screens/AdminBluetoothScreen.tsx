import { useEffect, Component, useContext, useCallback } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, HStack, ScrollView, Text, Toast, VStack, Button } from "native-base"

import { useState } from "react";
import { AppContext } from "../AppContext";
import { device } from "../BluetoothManager";
import { RefreshControl, TouchableOpacity } from "react-native";



const stringify = (obj: Object) => JSON.stringify(obj, null, 2)





export function AdminBluetoothScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "AdminBluetooth"> ) {
  const { BTManager } = useContext(AppContext)

  const [refreshing, setRefreshing] = useState(false);

  // force a page update every second by constantly updating a dummy state variable to a new value
  const [dummy, setDummy] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setDummy(Date.now()), 1000);   // grab current time
    return () => {
      clearInterval(interval);
    };
  }, []);

	return (
		<SafeAreaView>
      <VStack padding={2} space={10}>
			  <Heading alignSelf="center">Bluetooth Status</Heading>
        <HStack>
          <Text fontSize="xl" style={{"fontWeight": "bold"}} width={225}>Connection Status:</Text>
          <Text fontSize="xl">{BTManager.connected ? "✔️ CONNECTED ✔️" : "❌ NOT CONNECTED ❌"}</Text>            
        </HStack>
        <HStack>
          <Text fontSize="xl" style={{"fontWeight": "bold"}} width={225}>Connected Device:</Text>
          <Text fontSize="xl">{BTManager.device == null ? "NONE\n" : `\"${BTManager.device.name}\"\n${BTManager.device.id}`}</Text>            
        </HStack>

        <HStack>
          <Text fontSize="xl" style={{"fontWeight": "bold"}} width={225}>Available Devices:</Text>
          <ScrollView
            height={200}
            maxWidth={500}
            borderWidth={0}
            bgColor="warmGray.300"
            padding={4}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={useCallback(() => {
                  setRefreshing(true)
                  BTManager.refreshAvailableDevices().then(() => setRefreshing(false))
                }, [])}
              />
            }
          >
            {BTManager.availableDevices().map((dev: device) => 
              <TouchableOpacity style={{"backgroundColor": "#FFFFFF", "borderRadius": 8, "padding": 8}} key={dev.id} onPress={() => BTManager.connect(dev)}>
                  <HStack justifyContent="space-between">
                    <Text fontSize="xl">{dev.name}</Text>
                    <Text fontSize="xl" color="muted.400">{dev == BTManager.connectionStatus().device ? "Connected" : "Not Connected"}</Text>
                </HStack>
              </TouchableOpacity>
            )}
            <Text alignSelf="center" fontSize="4xl" color="white">. . .</Text>
          </ScrollView>
        </HStack>
        <Button onPress={() => BTManager.sendMessage({
          message_type: "signal_order_start",
          message_content: {
            ingredient_amounts: [10, 0, 15, 0, 0, 0]
          }
        })}>
          <Text>Send Test Message</Text>
        </Button>
      </VStack>
		</SafeAreaView>
	);
}
