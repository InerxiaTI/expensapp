import React from 'react'
import BaseHeaderComponent from './BaseHeaderComponent'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

interface HeaderContainerProps {
	title?: string,
	showArrowBack?: boolean,
	children?: JSX.Element,
}

const HeaderContainerComponent = ({ title = '', showArrowBack = false, children }: HeaderContainerProps) => {
	const navigator = useNavigation();


	return (
		<BaseHeaderComponent>
			<>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						borderWidth: 0,
						borderColor: 'green',
						gap: 15,
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
									borderColor: 'yellow'

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
							borderColor: 'white'
						}}>
						<Text style={{
							fontSize: 18,
							fontWeight: '700',
							color: '#6B7280'
						}}>{title}</Text>
					</View>
				</View>

				{/* Header Right */}

				<View
					style={{
						flexDirection: 'row-reverse',
						justifyContent: 'flex-start',
						alignItems: 'center',
						paddingHorizontal: 15
					}}
				>
					{children}

				</View>
			</>

		</BaseHeaderComponent>

	)
}

export default HeaderContainerComponent