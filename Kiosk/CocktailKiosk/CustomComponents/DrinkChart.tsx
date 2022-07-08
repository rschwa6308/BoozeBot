import { Box, Center, Divider, Text, VStack } from "native-base";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { ingredient } from "../recipes/recipes";

interface DrinkChartProps {
	ingredients: Array<[ingredient, number]>,
}

const GLASS_RADIUS = 25


// https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
function getContrastYIQ(hexcolor: string){
	hexcolor = hexcolor.replace("#", "")
	var r = parseInt(hexcolor.substring(0,2), 16)
	var g = parseInt(hexcolor.substring(2,4), 16)
	var b = parseInt(hexcolor.substring(4,6), 16)
	var yiq = ((r*299) + (g*587) + (b*114)) / 1000
	return (yiq >= 128) ? "black" : "white"
}


export function DrinkChart( props: DrinkChartProps & InterfaceVStackProps ) {
	var layers = []
	for (var i = props.ingredients.length - 1; i >= 0; i--) {
		var item = props.ingredients[i]
		console.log(i, item)
		layers.push(
			<Center flex={item[1]} bgColor={item[0].color} key={item[0].name} borderBottomRadius={i > 0 ? 0 : GLASS_RADIUS}>
				<Text color={getContrastYIQ(item[0].color)}>{item[0].name}</Text>
			</Center>
		)
		// if (i > 0) {
		// 	layers.push(
		// 		<Divider key={item[0].name + "-div"}/>
		// 	)
		// }
	}


	return (
		<VStack {...props} borderWidth={1} borderBottomRadius={GLASS_RADIUS}>
			{layers}
		</VStack>
	)
}