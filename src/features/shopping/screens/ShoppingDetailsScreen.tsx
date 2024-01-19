import React, { useContext, useEffect, useState } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../theme/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderShoppingDetailComponent from '../components/HeaderShoppingDetailComponent';
import ShoppingCardComponent from '../components/ShoppingCardComponent';
import FloatingActionButton from '../../../components/FloatingActionButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainStackNavigator';
import { AuthContext } from '../../../context/AuthContext';
import { AddExpenseParams, CreateShoppingRequest } from '../../../interfaces/ShoppingInterface';
import { useFetchShoppingListDetail } from '../hooks/useFetchShoppingListDetail';
import { useFetchCollaborators } from '../../../hooks/collaborators/useFetchCollaborators';
import { CollaboratorsFilterRequest } from '../../../interfaces/UserInterface';
import { ShoppingContext } from '../../../context/ShoppingContext';
import { infoLog } from '../../../utils/HandlerError';
import { ShoppingV2Context } from '../context/ShoppingV2Context';

interface ShoppingDetailsScreenProps extends StackScreenProps<RootStackParams, 'ShoppingDetails'> { }

const ShoppingDetailsScreen = ({ route, navigation }: ShoppingDetailsScreenProps) => {

  // React.useEffect(() => {
  //   // Use `setOptions` to update the button that we previously specified
  //   // Now the button includes an `onPress` handler to update the count
  //   navigation.setOptions({
  //     headerStyle: {
  //       backgroundColor: 'red'
  //     },
  //     headerShown: true,
  //     header: () => (
  //       <HeaderShoppingDetailComponent
  //         title={shoppingList.nombre}
  //         code={shoppingList.codigoGenerado}
  //         idListaCompras={shoppingList.id}
  //         idUsuarioCreador={shoppingList.idUsuarioCreador}
  //         estado={shoppingList.estado}
  //       />
  //     ),

  //   });
  // }, [navigation]);

  const { authState } = useContext(AuthContext);
  const { shoppingCardState, setIsCardLongPressed, setIsCardPressed } = useContext(ShoppingV2Context);
  const userLogged = authState.user
  const { setShoppingCardSelected, setIdShoppingCardSelected, shoppingState, setRefreshShoppings } = useContext(ShoppingContext);


  const shoppingList = route.params
  const [user, setUser] = useState(userLogged!.id);
  const request: CollaboratorsFilterRequest = {
    idListaCompras: shoppingList.id,
    estados: ['APROBADO']
  }


  const {
    isLoading,
    shoppingDetailList,
    getShoppingDetail } = useFetchShoppingListDetail(shoppingList.id, user!);

  const {
    collaborators,
    isLoading: isLoadingCollaborators } = useFetchCollaborators(request)


  const changeList = (userId: number) => {
    console.log("#############3 user: " + user);
    setUser(userId)
    setShoppingCardSelected(false)
    setIdShoppingCardSelected(0)

  }

  const [createShopping, setCreateShopping] = useState<CreateShoppingRequest>({
    idListaCompras: shoppingList.id,
    idCategoria: 1,
    idUsuarioCompra: user!,
    idUsuarioRegistro: user!,
  })

  const [addExpenseParams, setAddExpenseParams] = useState<AddExpenseParams>({
    createShoppingRequest: createShopping,
    estadoLista: shoppingList.estado,
    idUsuarioCreador: shoppingList.idUsuarioCreador

  })

  useEffect(() => {
    setIdShoppingCardSelected(0)
    setIsCardLongPressed(false)
    setIsCardLongPressed(false)
    
  },[])

  useEffect(() => {
    infoLog("En el useEffect dependiente del refreshShopping")

    if(shoppingState.refreshShoppings){
      infoLog("REFRESCANDO CON REFESH_SHOPPING"+JSON.stringify(shoppingState));
      getShoppingDetail(shoppingList.id, user!) 
      setRefreshShoppings(false)
      setIdShoppingCardSelected(0)
    }

  }, [shoppingState.refreshShoppings])

  useEffect(() => {
    infoLog("ShoppingDetailsScreen 1")
      getShoppingDetail(shoppingList.id, user!)
  }, [user])


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={'white'} size={20} />
      </View>
    )
  }

  return (
    <BaseScreenComponent headerShown={false}>
      {/* Header */}
      <HeaderShoppingDetailComponent
        title={shoppingList.nombre}
        code={shoppingList.codigoGenerado}
        idListaCompras={shoppingList.id}
        idUsuarioCreador={shoppingList.idUsuarioCreador}
        estado={shoppingList.estado}
      />


      {/* Shoppers */}
      <View
        style={{
          borderWidth: 0,
          borderColor: 'blue',
          paddingVertical: 0,
        }}
      >
        {
          isLoadingCollaborators ?
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 81,
              }}
            >
              <ActivityIndicator color={'white'} size={20} />
            </View>
            :
            <FlatList
              data={collaborators}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (

                <TouchableOpacity
                  onPress={() => { changeList(item.idUsuario) }}
                >
                  <View style={{
                    ...styles.shopperCardContainer,
                    backgroundColor: user === item.idUsuario ? '#18032E' : COLORS.tabNavigatorPrimaryColor,

                  }}>

                    <View style={styles.shopperCardTextContainer}>
                      <Icon name='account-cash-outline' size={14} color='white' />
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{item.nombres} id: {item.idUsuario}</Text>
                    </View>

                    {
                      item.esCreador ?
                        <View style={styles.shopperCardTextContainer}>
                          <Icon name='wrench' size={12} color='white' />
                          <Text style={styles.montoText}>Creador</Text>
                        </View>
                        : <></>

                    }



                    {/* <View style={styles.shopperCardTextContainer}>
                  <Icon name='currency-usd-off' size={12} color='white' />
                  <Text style={styles.montoText}>{item.porcentaje}</Text>
                </View> */}

                    <Text style={styles.porcentaje}>{item.porcentaje}%</Text>

                  </View>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
        }


      </View>

      {/* Compras de una lista */}
      <View
        style={{
          flex: 1,
          borderWidth: 0,
          borderColor: 'red',
          paddingVertical: 0,
          paddingHorizontal: 10
        }}
      >
        <FlatList
          data={shoppingDetailList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ShoppingCardComponent shopping={item}/>
          )}
          showsVerticalScrollIndicator={false}

        />


      </View>
      {
        shoppingList.estado !== 'CONFIGURANDO'
          ?
          <FloatingActionButton
            title={'cart-plus'}
            onPress={() => navigation.navigate('AddExpense', addExpenseParams)}
          />
          : <></>
      }

    </BaseScreenComponent>
  )
}

const styles = StyleSheet.create({
  shopperCardContainer: {
    borderWidth: 0,
    borderColor: 'white',
    width: 150,
    height: 81,
    gap: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    borderRadius: 8

  },
  shopperCardTextContainer: {
    borderWidth: 0,
    borderColor: 'yellow',
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 10,
  },
  montoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280'
  },
  porcentaje: {
    opacity: 0.5,
    color: 'grey',
    fontSize: 20,
    position: 'absolute',
    left: 90,
    top: 45
  }

});

export default ShoppingDetailsScreen
