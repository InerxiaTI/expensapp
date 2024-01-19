import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface BaseSimpleCardProps {
	visibleText: string
	objectToManipulated: any
}

const BaseSimpleCardComponent = ({visibleText, objectToManipulated}:BaseSimpleCardProps) => {

	
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
			<Text style={styles.mainText} >{visibleText}</Text>


		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	mainText: {
		color: '#6B7280'
	}

});

export default BaseSimpleCardComponent