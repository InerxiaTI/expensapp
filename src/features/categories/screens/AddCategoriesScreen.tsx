import React, { useContext, useState } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view'
import { ButtonV2Component } from '../../../components/buttons/ButtonV2Component'
import expenseBanner from '../../../../assets/expenseBanner.png';
import InputV1Component from '../../../components/inputs/InputV1Component'
import { useNavigation } from '@react-navigation/native'
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent'
import SwitchV1 from '../../../components/switch/SwitchV1'
import { useNewCategory } from '../hooks/useNewCategory'
import { CreateCategoryRequest } from '../../../interfaces/CategoriesInterface';
import { AuthContext } from '../../../context/AuthContext'
import { errorLog, infoLog } from '../../../utils/HandlerError'


const AddCategoriesScreen = () => {
	const navigator = useNavigation();
	const {authState} = useContext(AuthContext);
  const user = authState.user

	const [categoryText, setCategoryText] = useState("")
	const [isEnabled, setIsEnabled] = useState(false);
	const [habilitarBoton, setHabilitarBoton] = useState(false)

	const {isLoading, setIsLoading, saveCategory} = useNewCategory();

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

	const handleOnChangeCategoryText = (text: string) => {
		console.log(text);
		
		setCategoryText(text);
		if(text.trim() !== '') {
			setHabilitarBoton(true)
		} else {
			setHabilitarBoton(false)
		}
	};

	const handleOnSaveCategory = async ()=> {

		const createCategoryRequest: CreateCategoryRequest = {
			esPrivada: isEnabled,
			nombre: categoryText,
			idUsuarioCreador: user!.id
		}

		console.log("createCategory: " + JSON.stringify(createCategoryRequest));
		setIsLoading(true);
		setHabilitarBoton(false)
		try {
			await saveCategory(createCategoryRequest)
			ToastAndroid.show("Categoria creada con exito", ToastAndroid.LONG)

			setIsLoading(false)
		} catch (error) {
			errorLog("Falla al guardar: " + error);
			ToastAndroid.show("No se pudo crear la categoria", ToastAndroid.LONG)
		} finally {
			setIsLoading(false);
			setIsEnabled(false)
			setCategoryText("")
			setHabilitarBoton(false)
		}
		
		
	}


	return (
		<BaseScreenComponent>
			<KeyboardAvoidingScrollView
				containerStyle={styles.container}
				contentContainerStyle={styles.content}
				stickyFooter={
					<ButtonV2Component
						title={'Guardar'}
						onPress={handleOnSaveCategory}
						isLoading={isLoading}
						habilitarBoton={habilitarBoton}

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
          onChangeText={handleOnChangeCategoryText}
          value={categoryText}
          placeholder='Ingrese nombre de la categoria'
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