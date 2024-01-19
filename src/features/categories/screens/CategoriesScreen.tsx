import React, { useContext } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent'
import { AuthContext } from '../../../context/AuthContext';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { CategoriesFilterRequest } from '../../../interfaces/CategoriesInterface';
import { ScrollView, Text, View } from 'react-native';
import BaseSimpleCardComponent from '../../../components/base/BaseSimpleCardComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoriesScreen = () => {

	const { authState } = useContext(AuthContext);
  const userLogged = authState.user

	const request: CategoriesFilterRequest = {
		idUsuarioCreador: userLogged!.id
	}

	const {categories} = useFetchCategories(request)


	return (
		<BaseScreenComponent>

			<GenericHeaderComponent title='Categorias' showArrowBack />

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
							<BaseSimpleCardComponent key={category.id} visibleText={category.nombre} objectToManipulated={category}>

								<View
									style={{
										flexDirection: 'row',
										gap: 20
									}}
								>
									<MaterialCommunityIcons 
										name={category.esPrivada?'shield-key':'account-group'} 
										size={20} 
										color={category.esPrivada?'white':'grey'} />

								</View>
							</BaseSimpleCardComponent>
						))
					}

				</ScrollView>
			</View>
			


		</BaseScreenComponent>
	)
}

export default CategoriesScreen