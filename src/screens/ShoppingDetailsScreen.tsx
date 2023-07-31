import React, { useEffect, useState } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import HeaderShoppingDetailComponent from '../components/HeaderShoppingDetailComponent';
import { listasCompras, listasCompras2, listasCompras3 } from '../testData/testData';
import ShoppingListCardComponent from '../components/ShoppingListCardComponent';

// prueba
interface Shoppers {
  id: number;
  nombre: string;
  dineroGastado: string;
  dineroQueLeDeben: string;
  porcentaje: string
}

const ShoppingDetailsScreen = () => {

  const navigator = useNavigation();

  const shoppers: Shoppers[] = [
    { id: 1, nombre: 'Pepito Perez', dineroGastado: '10.567.900', dineroQueLeDeben: '12.000', porcentaje: '45' },
    { id: 2, nombre: 'Juanito Alimaña', dineroGastado: '200.500', dineroQueLeDeben: '342.200.999', porcentaje: '25' },
    { id: 3, nombre: 'Guillermo Alarcon', dineroGastado: '19.800', dineroQueLeDeben: '3.500', porcentaje: '30' },
  ]

  const [user, setUser] = useState(0);
  const [listasComprasFiltred, setListasComprasFiltred] = useState(listasCompras);

  const changeList = (index: number) => {
    console.log("user: "+index);
    setUser(index)
    
  }

  useEffect(() => {

    switch (user) {
      case 1: {
        setListasComprasFiltred(listasCompras2);
        break
      }
      case 2: {
        setListasComprasFiltred(listasCompras3);
        break
      }
      default: setListasComprasFiltred(listasCompras);

    }

  }, [user])


  return (
    <BaseScreenComponent>
      {/* Header */}
      <HeaderShoppingDetailComponent />

      {/* Shoppers */}
      <View
        style={{
          borderWidth: 0,
          borderColor: 'red',
          paddingVertical: 0,
        }}
      >

        <FlatList
          data={shoppers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (

            <TouchableOpacity
            onPress={() => {changeList(index)}}
            >
              <View style={{
                ...styles.shopperCardContainer, 
                backgroundColor: user === index? '#18032E' : COLORS.tabNavigatorPrimaryColor,
              
              }}>

                <View style={styles.shopperCardTextContainer}>
                  <Icon name='account-cash-outline' size={14} color='white' />
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{item.nombre}</Text>
                </View>

                <View style={styles.shopperCardTextContainer}>
                  <Icon name='currency-usd' size={12} color='white' />
                  <Text style={styles.montoText}>{item.dineroQueLeDeben}</Text>
                </View>

                <View style={styles.shopperCardTextContainer}>
                  <Icon name='currency-usd-off' size={12} color='white' />
                  <Text style={styles.montoText}>{item.dineroGastado}</Text>
                </View>

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
        }}
      >
        <FlatList
          data={listasComprasFiltred}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ShoppingListCardComponent buysList={item} />
          )}
          showsVerticalScrollIndicator={false}

        />


      </View>






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
    left: 85,
    top: 35
  }

});

export default ShoppingDetailsScreen