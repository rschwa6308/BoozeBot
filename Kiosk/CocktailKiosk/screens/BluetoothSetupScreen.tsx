import { NativeModules, NativeEventEmitter, Platform, PermissionsAndroid, TouchableHighlight, Button } from "react-native"
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";

import { FlatList, ScrollView, Text, View, VStack } from "native-base";
// import { BLEApp } from "../ble-manager-example";

import BleManager from "react-native-ble-manager/BleManager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export function BluetoothSetupScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "BluetoothSetup"> ) {

	const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

	const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }    
  }

	const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  }

	const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

	const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

	const handleDiscoverPeripheral = (peripheral) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  }

	useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }  
	})

	const testPeripheral = (item) => {
		console.log("Testing " + item + " ...")
	}

	const renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

	return (
		<SafeAreaView style={{flex:1}}>
			<VStack height="100%" space={10}>
				<Button
					title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
					onPress={() => startScan() } 
				/>            

				<Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />

				{(list.length == 0) &&
					<View style={{flex:1, margin: 20}}>
						<Text style={{textAlign: 'center'}}>No peripherals</Text>
					</View>
				}
			
			</VStack>              
			<FlatList
				data={list}
				renderItem={({ item }) => renderItem(item) }
				keyExtractor={item => item.id}
			/>              
		</SafeAreaView>
	);
}

