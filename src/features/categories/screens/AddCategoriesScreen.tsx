import React, { useState } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { Image, StyleSheet, Text, View } from 'react-native'
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view'
import { ButtonV2Component } from '../../../components/buttons/ButtonV2Component'
import expenseBanner from '../../../../assets/expenseBanner.png';
import InputV1Component from '../../../components/inputs/InputV1Component'
import { useNavigation } from '@react-navigation/native'
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent'
import SwitchV1 from '../../../components/switch/SwitchV1'


const AddCategoriesScreen = () => {
	const navigator = useNavigation();


	const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigator.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
				<GenericHeaderComponent title='Agregar Categoria' showArrowBack />
      ),

    });
  }, [navigator]);

	return (
		<BaseScreenComponent>
			<KeyboardAvoidingScrollView
				containerStyle={styles.container}
				contentContainerStyle={styles.content}
				stickyFooter={
					<ButtonV2Component
						title={'Guardar'}
						onPress={()=>{console.log("hola");
						}}
						isLoading={false}
						habilitarBoton={true}

					/>
				}>

				{/* Imagen */}
				<View style={{
					flex: 1,
					width: '100%',
					alignItems: 'center',
					borderWidth: 0,
					borderColor: 'red'
				}}>
					<Image
						source={expenseBanner}
						style={{ width: 100, height: 100 }}
					/>
				</View>

				 {/* Inputs */}

			<View
        style={{
          borderWidth: 0,
          borderColor: 'white',
          paddingHorizontal: 28
        }}
      >

        <InputV1Component
          title='Categoria'
          onChangeText={()=>console.log("ss")
					}
          value={"Servicios publicos"}
          editable={!false}
          placeholder='Ingrese código de lista'
          autoCapitalize='characters'
        />


				<View style={{
					borderColor: 'red',
					borderWidth: 0,
				}}>
					<Text style={styles.textInfoInput}>Privada</Text>
					<View
						style={{
							marginTop:5
						}}
					>
					<SwitchV1 value={isEnabled} onValueChange={toggleSwitch} />
					</View>
				</View>

      </View>

			</KeyboardAvoidingScrollView>
		
		</BaseScreenComponent>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 0,
		borderColor: 'red'
	},
	content: {
		padding: 0,
	},
	textInfoInput: {
		color: '#6B7280',
		fontSize: 24,
		fontWeight: '700',
	}
})


export default AddCategoriesScreen