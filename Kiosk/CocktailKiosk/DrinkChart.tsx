import { Box, Center, Divider, Text, VStack } from "native-base";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { ingredient } from "./recipes/recipes";

interface DrinkChartProps {
  ingredients: Array<[ingredient, number]>,
}

export function DrinkChart( props: DrinkChartProps & InterfaceVStackProps ) {
  var layers = []
  for (var i = props.ingredients.length - 1; i >= 0; i--) {
    var item = props.ingredients[i]
    console.log(i, item)
    layers.push(
      <Center flex={item[1]} bgColor={item[0].color} key={item[0].name} borderBottomRadius={i > 0 ? 0 : 40}>
        <Text>{item[0].name}</Text>
      </Center>
    )
    if (i > 0) {
      layers.push(
        <Divider key={item[0].name + "-div"}/>
      )
    }
  }

  // const layers = Array.from({length: props.ingredients.length - 1}, (_, i) => props.ingredients.length - i - 1).map(index =>
  //   <>
  //     <Center flex={item[1]} bgColor={item[0].color} key={item[0].name}>
  //       <Text>{item[0].name}</Text>
  //     </Center>
  //     <Divider color="black" key={item[0].name + "-div"}/>
  //   </>
  // )

  return (
    <VStack {...props} borderWidth={1} borderBottomRadius={40}>
      {layers}
    </VStack>
  )
}