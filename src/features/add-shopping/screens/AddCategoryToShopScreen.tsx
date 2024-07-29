import React, { useContext, useEffect } from 'react'
import { RootStackParams } from '../../../navigation/MainStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent';
import { ScrollView, Text, View } from 'react-native';
import BaseScreenComponent from '../../../components/BaseScreenComponent';
import CategoryCardComponent from '../../categories/components/CategoryCardComponent';
import { useFetchCategoriesByCreator } from '../hooks/useFetchCategoriesByCreator';
import { infoLog } from '../../../utils/HandlerError';
import { Category } from '../../../interfaces/CategoriesInterface';
import { AuthContext } from '../../../context/AuthContext';

export interface AddCategoryToShopParams {
	idUsuarioCreador: number,
}

interface AddCategoryToShopProps extends StackScreenProps<RootStackParams, 'AddCategoryToShop'> { }

const AddCategoryToShopScreen = ({ route, navigation }: AddCategoryToShopProps) => {

	const {authState} = useContext(AuthContext);
  const user = authState.user

	const addCategoryToShop: AddCategoryToShopParams = route.params
	const {categories, isLoading} = useFetchCategoriesByCreator(addCategoryToShop.idUsuarioCreador)
	infoLog(JSON.stringify(categories))


	React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
				<GenericHeaderComponent title='Agregar categoría' showArrowBack />

      ),

    });
  }, [navigation]);

	
	const handleCategoryPress = (category: Category) => {
		infoLog("QQQQQQQQQQQQ: " + JSON.stringify(category))
		navigation.navigate('AddExpense', { category });
	};

	const showCategories = ()=> {
		let showCategoriesFilter = categories

		if(user?.id !== addCategoryToShop.idUsuarioCreador ){
			showCategoriesFilter = categories.filter((category) => !category.esPrivada)
		}

		return showCategoriesFilter.map((category) => (
			<CategoryCardComponent 
			key={category.id} 
			visibleText={category.nombre} 
			category={category}
			actionButton={()=>{handleCategoryPress(category)}}
			/>
		))
		
	
	}
	
	return (
		<BaseScreenComponent>

			<View
        style={{
          flex: 1,
          borderWidth: 0,
          borderColor: 'red',
          marginTop: 0,
          paddingHorizontal: 15
        }}
      >
				<ScrollView showsVerticalScrollIndicator={false}>
					{!isLoading && (showCategories())
					}

				</ScrollView>
			</View>

		</BaseScreenComponent>
	)
}

export default AddCategoryToShopScreen