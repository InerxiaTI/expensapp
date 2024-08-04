import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CategoryContext } from '../context/CategoryContext'
import { infoLog } from '../../../utils/HandlerError'
import { Category, EditCategoryRequest } from '../../../interfaces/CategoriesInterface'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

interface BaseSimpleCardProps {
	visibleText: string
	category: Category,
	actionButton?: () => void
}

const CategoryCardComponent = ({visibleText, category, actionButton}:BaseSimpleCardProps) => {
	const [isPressed, setIsPressed] = useState(false);
	const { setIdCategoryCardSelected, setIsCategoryCardSelected, categoryState, setCategoryToEdit} = useContext(CategoryContext);


	const parseCategoryToEdit = () => {
		const categoryToEdit: EditCategoryRequest = {
			idCategoria: category.id,
			nombre: category.nombre,
			esPrivada: category.esPrivada
		}
		setCategoryToEdit(categoryToEdit)
	}
	
  const handleLongPress = () => {
    parseCategoryToEdit()
    //setBackground('#d9a2ff')
    setIsPressed(true);
    setIsCategoryCardSelected(true)
    setIdCategoryCardSelected(category.id)
    infoLog("LONGPRESS_1: " + isPressed + " / ")

  };

  const handlePressOut = () => {
    setIdCategoryCardSelected(0)
    setIsCategoryCardSelected(false)
    //setBackground('#262626')
    setIsPressed(false);
    infoLog("++++++++++++ LONGPRESS_2: " + isPressed + " / ")

  };

	const background = category.id === categoryState.idCategoryCardSelected && isPressed ? '#4f4f4f' : '#262626'

	return (
		<TouchableOpacity
			onPress={()=>actionButton?.length == undefined ? handlePressOut: actionButton()}
			onLongPress={()=>actionButton?.length === undefined ? handleLongPress(): ()=>undefined}
		>
			<View
				style={{
					...styles.mainCard,
					backgroundColor: background
				
				}}
			>
				<Text style={{...styles.mainText, borderWidth: 0, borderColor: 'red'}} >{visibleText}</Text>

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

			</View>


		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	mainCard: {
		flexDirection: 'row',
		height: 50,
		borderRadius: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginVertical: 5,
		borderWidth: 0,
		borderColor: 'red'
	},
	mainText: {
		color: '#e7e7e7'
	}

});

export default CategoryCardComponent