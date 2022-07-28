import { View, Button, Pressable, TouchableOpacity } from "react-native";
import { Box, Center, Flex, IconButton, Icon, InfoIcon, VStack, HStack, Text, Heading } from "native-base";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {RootStackParamList} from "../App";

import { styles } from "../styles";

import { MaterialCommunityIcons, AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// import { EmojiRain } from 'react-native-emoji-rain'
// import MakeItRain from 'react-native-make-it-rain';




export function HomeScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Home"> ) {
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
        colorScheme="blue"
				position="absolute" right={2} top={6}
        onPress={() => navigation.navigate("AdminMenu")}
			/>
      <Center flex={1}>
        <VStack alignItems="center" space={100}>
          <Heading size="3xl" style={{"fontFamily": "Baskerville-Bold"}}>Cocktail Machine</Heading>
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
