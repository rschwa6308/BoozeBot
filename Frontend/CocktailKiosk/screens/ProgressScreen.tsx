
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Heading, Text, VStack } from "native-base";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type {RootStackParamList} from "../App";
import { AppContext } from "../AppContext";

import { styles } from "../styles";


export function ProgressScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Progress"> ) {
	const { eta } = route.params

	const { BTManager } = useContext(AppContext)

	const [ timeRemaining, setTimeRemaining ] = useState(eta - 2000)	// take off a few seconds for app delay
	const [ orderFinished, setOrderFinished ] = useState(false)
	const [ orderCanceled, setOrderCanceled ] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			if (timeRemaining >= 1000) {
				setTimeRemaining(timeRemaining - 1000)
			} else {
				setTimeRemaining(0)
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [timeRemaining])

	useEffect(() => {
		BTManager.onNotifyOrderFinished = () => {
			setTimeRemaining(0)
			setOrderFinished(true)

			// return to the menu after a few seconds
			setTimeout(() => navigation.navigate("Menu"), 3000)
		}
	}, [])

	useEffect(() => {
		BTManager.onNotifyOrderCanceled = () => {
			setTimeRemaining(0)
			setOrderCanceled(true)

			// return to the menu after a few seconds
			setTimeout(() => navigation.navigate("Menu"), 3000)
		}
	}, [])

	return (
		<SafeAreaView>
			<Center height="100%">

				{!orderCanceled ?
					!orderFinished ? 
				
					<VStack space={20} alignContent="center" justifyContent="center">
						<Heading fontSize="5xl">Making your drink! Time remaining:</Heading>
						<Text fontSize="5xl" bold>about {Math.round(timeRemaining/1000)} seconds</Text>
					</VStack>

					:

					<Heading fontSize="5xl">Your order has finished. Enjoy!</Heading>
				
				:
				
				<Heading fontSize="5xl">Order canceled.</Heading>
				}
			</Center>
		</SafeAreaView>
	);
}
