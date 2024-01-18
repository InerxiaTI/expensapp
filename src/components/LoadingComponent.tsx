import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const LoadingComponent = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center' 
			}}
		>
			<ActivityIndicator size={50} color='white' />
		</View>
	)
}

export default LoadingComponent