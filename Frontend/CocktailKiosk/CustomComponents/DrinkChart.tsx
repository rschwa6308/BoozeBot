import { Box, Button, Center, Divider, Text, VStack } from "native-base";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { useEffect, useState } from "react";
import { ingredient, recipe } from "../recipes/recipes";
import { getYIQ } from "../utils";



const GLASS_RADIUS = 30


// class 


export const DrinkChart: React.FC<{drink: recipe} & InterfaceVStackProps> = ({
	drink,
	...props
}) => {

	
  // force a page update every half second by constantly updating a dummy state variable to a new value
  const [dummy, setDummy] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setDummy(Date.now()), 500);   // grab current time
    return () => {
      clearInterval(interval);
    };
  }, []);

	const presentIngredients = drink.ingredients.filter(([ing, parts]) => parts > 0)

	var layers = []
	for (var i = presentIngredients.length - 1; i >= 0; i--) {
		const [ing, parts] = presentIngredients[i]

		// console.log(i, item)
		layers.push(
			<Center
				flex={parts}
				bgColor={ing.color}
				key={ing.name}
				borderBottomRadius={i > 0 ? 0 : GLASS_RADIUS - 3}
				minHeight={4}
			>
				<Text
					color={(getYIQ(ing.color) >= 128) ? "black" : "white"}
					style={{"fontWeight": "300", "textTransform": "capitalize"}}
					fontSize={"md"}
				>{ing.name}</Text>
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
			key={drink}
		>
			<Box height={3}/>
			{layers}
		</VStack>
	)
}
