import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { sliceText } from '../../../utils/textUtil'
import { AuthContext } from '../../../context/AuthContext'
import HeaderContainerComponent from '../../../components/base/HeaderContainerComponent'
import ToolItemComponent from '../../../components/base/ToolItemComponent'
import {infoLog } from '../../../utils/HandlerError';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';
import { CategoryContext } from '../context/CategoryContext';
import { AddCategoryParams } from '../../../interfaces/CategoriesInterface';

interface HeaderCategoryProps {
  title?: string,
  idUsuarioCreador: number,
}


const HeaderCategoryComponent = ({title, idUsuarioCreador}: HeaderCategoryProps) => {

  const navigator = useNavigation();
  const { authState } = useContext(AuthContext);
  const { categoryState} = useContext(CategoryContext);
  //sin uso, porque no se elimina aun
  const { hideConfirmationDialog, showConfirmationDialog, confirmationVisible } = useConfirmDialog()

  const [iconActionButton, setIconActionButton] = useState('cart-arrow-right')
  const [question, setQuestion] = useState("")
  const [description, setDescription] = useState("")
  const [action, setAction] = useState("none")
  const user = authState.user

  const handleEdit = () => {

    const editCategoryParams: AddCategoryParams = {
      editCategoryRequest: categoryState.categoryToEdit
    }
    navigator.navigate('AddCategory', editCategoryParams)

  }

  useEffect(() => {
    infoLog("ID CATEGORY TO EDIT OR DELETE: " + categoryState.idCategoryCardSelected)
  }, [])

  return (
    <>
      <HeaderContainerComponent
        title={sliceText(title!, 25)}
        showArrowBack
      >
        {
          categoryState.idCategoryCardSelected !== 0 ?
            <>
              <ToolItemComponent
                onPress={() => { handleEdit() }}
                icon='pencil'
              />
            </>
            :
            <></>
        }

      </HeaderContainerComponent>
    </>
  )
}

const styles = StyleSheet.create({
  contextMenu: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }

});
export default HeaderCategoryComponent
