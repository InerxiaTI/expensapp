import { Pressable, View, Animated, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';


interface SwitchV1Props {
	value: any,
	onValueChange: any
}

const defaultStyles = {
	bgSwitchColor: '#262626',
	ballSwitchColor: '#6B7280',
	borderPressable: 1,
	borderPressableColor: '#6B7280',
};

const activeStyles = {
	bgSwitchColor: '#BB81F4',
	ballSwitchColor: '#201F21',
	borderPressable: 0,
	borderPressableColor: '#6B7280',
};

const SwitchV1 = ({value, onValueChange}:SwitchV1Props) => {

	const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

	useEffect(() => {
		// Update the animated value when the value prop changes
		Animated.timing(animatedValue, {
			toValue: value ? 1 : 0,
			duration: 300, // Adjust the animation duration
			useNativeDriver: false,
		}).start();
	}, [value]);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [4, 28], // Adjust the distance of the switch head
	});

	const toggleSwitch = () => {
		const newValue = !value;
		onValueChange(newValue);
	};


	const currentStyles = value ? activeStyles : defaultStyles;

  return (
    <Pressable onPress={toggleSwitch} 
		style={[
			{borderWidth: currentStyles.borderPressable, borderColor: currentStyles.borderPressableColor},
			styles.pressable
			]}>
			<View
				style={[
					{backgroundColor: currentStyles.bgSwitchColor},
					styles.backgroundSwitch
				]}
			>
        <View style={styles.innerContainer}>
          <Animated.View
            style={{
              transform: [{ translateX }],
            }}>
							<View style={[
								{ backgroundColor: currentStyles.ballSwitchColor }, 
								styles.ballSwitch
							]} />
          </Animated.View>
        </View>
			</View>
    </Pressable>
  );

}

const styles = StyleSheet.create({
	pressable: {
		width: 56,
		height: 32,
		borderRadius: 16,
	},
	backgroundSwitch: {
		borderRadius: 16,
		flex: 1,
	},
	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		position: 'relative',
	},
	ballSwitch: {
		width: 24,
		height: 24,
		borderRadius: 100,
	},
 });

export default SwitchV1