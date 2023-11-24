import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { TestInterface, testData } from '../services/test.service'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../../theme/Theme'

const ListViewComponent = () => {
	const [itemSelected, setItemSelected] = useState(0);
	const [selected, setSelected] = useState(false);



	const data = testData
	// const translateX = useSharedValue(0);
	const translateX = useDerivedValue(()=>{
		return selected? withTiming(1, { duration: 1000 }): withTiming(0, { duration: 1000 }) 
	}, [itemSelected, selected])


	const handleLongPress = (item: TestInterface) => {
		//reset()

		console.log("LONG PRESS");
		setSelected(true)
	
		setItemSelected(item.id);

		//translateX.value = withTiming(translateX.value-1, { duration: 1000 });
		console.log(`item id: ${item.id} \nitem id selected: ${itemSelected}`);
		

	}

	const reset = ()=>{
		setSelected(false)
		console.log("reset");
		//translateX.value = withTiming(translateX.value-1, { duration: 1000 });
		setItemSelected(0);

	}

	const animatedStyle = useAnimatedStyle(() => {
    
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 1],
        ["#262626", "#d9a2ff"], 'HSV', { useCorrectedHSVInterpolation: false }
      ),
    };
    
  });

	const animatedStyle2 = useAnimatedStyle(() => {
    
    const bgYes = {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 1],
        ["#262626", "#d9a2ff"], 'HSV', { useCorrectedHSVInterpolation: false }
      ),
    };

		const bgNo = {backgroundColor: "#262626"}

		return bgYes

  });
    
   

		const bgNo = {backgroundColor: "#262626"}



	const getColor = (itemId: number)=> {

		console.log(`${itemId} == ${itemSelected}`);
		

		if(itemId == itemSelected){
			return animatedStyle2;
		} else{
			return bgNo
		}

	}



	return (

		<View
			style={{
				flex: 1,
				borderWidth: 1,
				borderColor: 'red',
				paddingVertical: 0,
				paddingHorizontal: 10
			}}
		>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					

					<View style={{borderColor: 'red', borderWidth: 1}} >
						<TouchableOpacity
							onPress={reset}
							delayLongPress={300}
							activeOpacity={0.6}
							onLongPress={() => handleLongPress(item)}
						>
							<Animated.View style={[{...styles.card}, {backgroundColor: itemSelected === item.id ? '#18032E' : COLORS.tabNavigatorPrimaryColor}]}>
							{/* <Animated.View style={[{...styles.card}, itemSelected === item.id ? animatedStyle2: {backgroundColor: "#262626"}]}> */}
								<Text>{JSON.stringify(item) + " | " + JSON.stringify(itemSelected)+ " | " +JSON.stringify(translateX.value)}</Text>
							</Animated.View>
						</TouchableOpacity>

					</View>

				)}
				showsVerticalScrollIndicator={false}

			/>
		</View>

	)
}


const styles = StyleSheet.create({
	card: {
		gap: 5,
		width: '100%',
		height: 81,
		marginTop: 11,
		paddingStart: 16,
		paddingTop: 8,
		paddingBottom: 5,
		borderRadius: 8,
		borderColor: 'green',
		borderWidth: 1,
		flexDirection: 'row',
		// backgroundColor: '#262626'
	}

});
export default ListViewComponent