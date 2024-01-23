import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface HeaderContainerProps {
	title?: string,
	showArrowBack?: boolean,
	children?: JSX.Element,
}

const HeaderContainerComponent = ({ title = '', showArrowBack = false, children }: HeaderContainerProps) => {
	const navigator = useNavigation();
	const [paddingOnlyText, setPaddingOnlyText] = useState(0)


	useEffect(() => {

		if (!showArrowBack) {
			setPaddingOnlyText(15)
		}

	})


	return (
		<SafeAreaView style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			borderWidth: 0,
			borderColor: 'red',
			width: '100%',
			backgroundColor: '#3c3b3f',
		}}>
			<>
				{/* Header Left */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						borderWidth: 0,
						borderColor: 'green',
						gap: 0,
						height: 50
					}}
				>
					{
						showArrowBack && (
							<TouchableOpacity
								onPress={() => { navigator.goBack() }}
								style={{
									height: '100%',
									paddingLeft: 15,
									justifyContent: 'center',
									alignItems: 'center',
									borderWidth: 0,
									borderColor: 'yellow',
									paddingRight: 10

								}}
							>
								<MaterialCommunityIcons name='arrow-left' size={25} color='white' />

							</TouchableOpacity>
						)
					}

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							borderWidth: 0,
							borderColor: 'white',
							paddingLeft: paddingOnlyText,
						}}>
						<Text style={{
							fontSize: 18,
							fontWeight: '700',
							color: '#fff'
						}}>{title}</Text>
					</View>
				</View>

				{/* Header Right */}
				<View
					style={{
						height: 50,
						borderWidth: 0,
						borderColor: 'blue',
						flexDirection: 'row-reverse',
						gap: 10,
						paddingHorizontal: 1
					}}
				>
					{children}

				</View>
			</>

		</SafeAreaView>

	)
}

export default HeaderContainerComponent