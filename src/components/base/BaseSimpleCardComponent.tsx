import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface BaseSimpleCardProps {
	visibleText: string
	objectToManipulated: any
	children: JSX.Element
}

const BaseSimpleCardComponent = ({visibleText, objectToManipulated, children}:BaseSimpleCardProps) => {

	
	return (
		<TouchableOpacity
			//disabled={disableButtonCard}
			//onPress={() => actionButtom?.length == undefined ? goToAssignPercentageScreen() : actionButtom()}
			style={{
				backgroundColor: '#262626',
				height: 50,
				borderRadius: 8,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 20,
				marginVertical: 5
			}}
		>
			<Text style={{...styles.mainText, borderWidth: 0, borderColor: 'red'}} >{visibleText}</Text>

			{children && (
				<View>
					{children}
				</View>
			)
			}


		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	mainText: {
		color: '#e7e7e7'
	}

});

export default BaseSimpleCardComponent