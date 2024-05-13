import React, { useContext } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent'
import { AuthContext } from '../../../context/AuthContext';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { CategoriesFilterRequest } from '../../../interfaces/CategoriesInterface';
import { ScrollView, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingActionButton from '../../../components/FloatingActionButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainStackNavigator';
import CategoryCardComponent from '../components/CategoryCardComponent';

interface CategoriesScreenProps extends StackScreenProps<RootStackParams, 'CategoriesList'> { }


const CategoriesScreen = ({ route, navigation }: CategoriesScreenProps) => {

	console.log(JSON.stringify(navigation));
	console.log(JSON.stringify(route));
	

	const { authState } = useContext(AuthContext);
  const userLogged = authState.user

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
				<GenericHeaderComponent title='Categorias' showArrowBack />
      ),

    });
  }, [navigation]);

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
				onPress={() => navigation.navigate('AddCategories')}
			/>
			


		</BaseScreenComponent>
	)
}

export default CategoriesScreen