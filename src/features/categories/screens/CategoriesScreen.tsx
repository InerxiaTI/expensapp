import React, { useContext, useEffect } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { AuthContext } from '../../../context/AuthContext';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { CategoriesFilterRequest } from '../../../interfaces/CategoriesInterface';
import { ScrollView, View } from 'react-native';
import FloatingActionButton from '../../../components/FloatingActionButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainStackNavigator';
import CategoryCardComponent from '../components/CategoryCardComponent';
import HeaderCategoryComponent from '../components/HeaderCategoryComponent';
import { CategoryContext } from '../context/CategoryContext';
import { infoLog } from '../../../utils/HandlerError';

interface CategoriesScreenProps extends StackScreenProps<RootStackParams, 'CategoriesList'> { }


const CategoriesScreen = ({ route, navigation }: CategoriesScreenProps) => {

	console.log(JSON.stringify(navigation));
	console.log(JSON.stringify(route));
	

	const { authState } = useContext(AuthContext);
  const userLogged = authState.user

	const {categoryState, setIdCategoryCardSelected} = useContext(CategoryContext);


	const request: CategoriesFilterRequest = {
		idUsuarioCreador: userLogged!.id
	}

	const {categories} = useFetchCategories(request)

	React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
				<HeaderCategoryComponent title='Categorías' idUsuarioCreador={userLogged!.id}/>
      ),

    });
  }, [navigation]);

	useEffect(()=>{
		infoLog("qqqqqqqqqqqqqqqqqqqqqqqqqqq 1 use effect")
		if(categoryState.refreshCategory){
			setIdCategoryCardSelected(0);
		}
	},[categoryState.refreshCategory])

	useEffect(()=>{
		infoLog("ENTRA A CATEGORIAS LISTA---------------------")
		setIdCategoryCardSelected(0);
	}, [])

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
					{
						categories.map((category) => (
							<CategoryCardComponent key={category.id} visibleText={category.nombre} category={category}/>
						))
					}

				</ScrollView>
			</View>

			<FloatingActionButton
				title={'plus'}
				onPress={() => navigation.navigate('AddCategory')}
			/>
			


		</BaseScreenComponent>
	)
}

export default CategoriesScreen