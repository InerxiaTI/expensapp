import React, { useContext, useEffect, useState } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderShoppingDetailComponent from '../components/HeaderShoppingDetailComponent';
import ShoppingCardComponent from '../components/ShoppingCardComponent';
import FloatingActionButton from '../components/FloatingActionButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/HomeStackNavigator';
import { useCollaborators } from '../hooks/useShopping';
import { AuthContext } from '../context/AuthContext';
import { AddExpenseParams, CreateShoppingRequest } from '../interfaces/ShoppingInterface';
import { useFetchShoppingListDetail } from '../hooks/shoppingList/useFetchShoppingListDetail';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

interface ShoppingDetailsScreenProps extends StackScreenProps<RootStackParams, 'ShoppingDetails'> { }

const ShoppingDetailsScreen = ({ route, navigation }: ShoppingDetailsScreenProps) => {

  const { authState } = useContext(AuthContext);
  const userLogged = authState.user

  const shoppingList = route.params
  const [user, setUser] = useState(userLogged!.id);


  const {isLoading, shoppingDetailList, getShoppingDetail} = useFetchShoppingListDetail();
  const { collaborators } = useCollaborators(shoppingList.id)


  const changeList = (userId: number) => {
    console.log("#############3 user: " + user);
    setUser(userId)
       
  }

  const [createShopping, setCreateShopping] = useState<CreateShoppingRequest>({
    idListaCompras: shoppingList.id,
    idCategoria: 1,
    idUsuarioCompra: user!,
    idUsuarioRegistro: user!,
  })

  const [addExpenseParams, setAddExpenseParams] = useState<AddExpenseParams>({
    createShoppingRequest: createShopping
  })

  useEffect(() => {
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
    <BaseScreenComponent>
      {/* Header */}
      <HeaderShoppingDetailComponent
        title={shoppingList.nombre}
        code={shoppingList.codigoGenerado}
        idListaCompras={shoppingList.id}
        idUsuarioCreador={shoppingList.usuarioCreador}
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
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{item.nombresUsuario} id: {item.idUsuario}</Text>
                </View>

                {
                  item.esCreador ?
                    <View style={styles.shopperCardTextContainer}>
                      <Icon name='wrench' size={12} color='white' />
                      <Text style={styles.montoText}>Creador</Text>
                    </View>
                    :<></>

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
            <ShoppingCardComponent shopping={item} />
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
    opacity: 0.1,
    color: 'grey',
    fontSize: 35,
    position: 'absolute',
    left: 60,
    top: 35
  }

});

export default ShoppingDetailsScreen