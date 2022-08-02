import { View, Button, Pressable, TouchableOpacity } from "react-native";
import { Box, Center, Flex, IconButton, Icon, InfoIcon, VStack, HStack, Text, Heading } from "native-base";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";

import { MaterialCommunityIcons, AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

// import { EmojiRain } from 'react-native-emoji-rain'
// import MakeItRain from 'react-native-make-it-rain';




export function HomeScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Home"> ) {

  const { BTManager } = useContext(AppContext)

  // ensure pump controller has correct UI state every few seconds (in case nav event doesn't trigger)
	useEffect(() => {
    const interval = setInterval(() => {
      const screenName = navigation.getState().routes[navigation.getState().index].name;
  
      BTManager.sendMessage({
        message_type: "notify_UI_state",
        message_content: {
          UI_state: screenName == "Menu" ? "order_confirmed" : "other"
        }
      })
    }, 5000)

    return () => clearInterval(interval)
	}, [])

	return (
		<SafeAreaView style={{flex: 1}}>
      {/* <EmojiRain emoji="🍸" count={300}/> */}
      {/* <MakeItRain
          numItems={80}
          itemDimensions={{width: 40, height: 20}}
          itemComponent={<Text>🍸</Text>}
          itemTintStrength={0.8}
        /> */}
			<IconButton
				icon={<Icon as={MaterialCommunityIcons} name="cog" size={45}/>}
				borderRadius="full"
				size="lg"
        // colorScheme="blue"
				position="absolute" right={2} top={2}
        onPress={() => navigation.navigate("AdminMenu")}
        _icon={{
          color: "#CC9F76"
        }}
			/>
      <Center flex={1}>
        <VStack alignItems="center" space={90}>
          <Heading size="4xl" style={{"fontFamily": "Baskerville-Bold"}} color="warmGray.800">BoozeBot MKI</Heading>
          <TouchableOpacity style={styles.bigButton} onPress={() => navigation.navigate("Menu")}>
            <HStack alignItems="center" space={6}>
              <Heading size="4xl" color="white">START!</Heading>
              <Icon as={MaterialCommunityIcons} name="glass-cocktail" size={79} color="white"/>
            </HStack>
          </TouchableOpacity>
        </VStack>
      </Center>
			
		</SafeAreaView>
		
	);
}
