import { Box, Center, Divider, Text, VStack } from "native-base";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { ingredient } from "../recipes/recipes";
import { getYIQ } from "../utils";

interface DrinkChartProps {
	ingredients: Array<[ingredient, number]>,
}

const GLASS_RADIUS = 30



export function DrinkChart( props: DrinkChartProps & InterfaceVStackProps ) {
	var layers = []
	for (var i = props.ingredients.length - 1; i >= 0; i--) {
		var item = props.ingredients[i]
		// console.log(i, item)
		layers.push(
			<Center
				flex={item[1]}
				bgColor={item[0].color}
				key={item[0].name}
				borderBottomRadius={i > 0 ? 0 : GLASS_RADIUS - 3}
				minHeight={1}
			>
				<Text
					color={(getYIQ(item[0].color) >= 128) ? "black" : "white"}
					style={{"fontWeight": "300", "textTransform": "capitalize"}}
					fontSize={"md"}
				>{item[0].name}</Text>
			</Center>
		)
		// if (i > 0) {
		// 	layers.push(
		// 		<Divider key={item[0].name + "-div"}/>
		// 	)
		// }
	}


	return (
		<VStack
			{...props}
			borderWidth={2}
			borderTopWidth={0}
			borderBottomRadius={GLASS_RADIUS}
			borderColor="warmGray.600"
		>
			<Box height={3}/>
			{layers}
		</VStack>
	)
}