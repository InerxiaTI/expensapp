import React, { useContext, useEffect, useState } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderShoppingDetailComponent from '../components/HeaderShoppingDetailComponent';
import { detalleListaCompras1, detalleListaCompras2, detalleListaCompras3, shoppers, } from '../testData/testData';
import ShoppingCardComponent from '../components/ShoppingCardComponent';
import FloatingActionButton from '../components/FloatingActionButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/HomeStackNavigator';
import { useCollaborators, useShoppingDetail } from '../hooks/useShopping';
import { AuthContext } from '../context/AuthContext';
import { AddExpenseParams, CreateShoppingRequest } from '../interfaces/ShoppingInterface';

interface ShoppingDetailsScreenProps extends StackScreenProps<RootStackParams, 'ShoppingDetails'> { }

const ShoppingDetailsScreen = ({ route, navigation }: ShoppingDetailsScreenProps) => {

  const { authState } = useContext(AuthContext);
  const userLogged = authState.user

  const shoppingList = route.params

  const { getShoppingDetail, isLoading, shoppingDetailList } = useShoppingDetail(shoppingList.id, userLogged!.id);
  const { getCollaborators, collaborators } = useCollaborators(shoppingList.id)

  const [user, setUser] = useState(userLogged?.id);
  const [listasComprasFiltred, setListasComprasFiltred] = useState(detalleListaCompras1);

  const changeList = (userId: number, userName: string) => {
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




  return (
    <BaseScreenComponent>
      {/* Header */}
      <HeaderShoppingDetailComponent title={shoppingList.nombre} code={shoppingList.codigoGenerado} />

      {/* Shoppers */}
      <View
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          paddingVertical: 0,
          marginTop: 50,
        }}
      >

        <FlatList
          data={collaborators}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              onPress={() => { changeList(item.idUsuario, item.nombresUsuario) }}
            >
              <View style={{
                ...styles.shopperCardContainer,
                backgroundColor: user === item.idUsuario ? '#18032E' : COLORS.tabNavigatorPrimaryColor,

              }}>

                <View style={styles.shopperCardTextContainer}>
                  <Icon name='account-cash-outline' size={14} color='white' />
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{item.nombresUsuario}</Text>
                </View>

                {/* <View style={styles.shopperCardTextContainer}>
                  <Icon name='currency-usd' size={12} color='white' />
                  <Text style={styles.montoText}>{item.}</Text>
                </View>

                <View style={styles.shopperCardTextContainer}>
                  <Icon name='currency-usd-off' size={12} color='white' />
                  <Text style={styles.montoText}>{item.}</Text>
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