import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../components/HeaderHomeComponent'
import ShoppingListCardComponent from '../components/ShoppingListCardComponent'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { listasCompras } from '../testData/testData'
import { useShoppingLists } from '../hooks/useShopping'
import { AuthContext } from '../context/AuthContext'


const HomeScreen = () => {
  const {authState} = useContext(AuthContext);
  console.log("auth: ", authState);
  const user = authState.user
  

  



  const { isLoading, shoppingLists, getShoppingLists } = useShoppingLists();

  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState(shoppingLists.slice(0, 2)); // Mostrar los primeros 2

  const handleRefresh = () => {
    setRefreshing(true)
    setData(shoppingLists.slice(0, data.length+2)); // Mostrar los siguientes 2
    setRefreshing(false);

  };

  const actualizarLista = () => {
    getShoppingLists(); // Actualizar datos
  };

  if (isLoading) {
    // if (false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={'white'} size={20} />
      </View>
    )
  }


  return (
    <BaseScreenComponent style={{ paddingHorizontal: 10 }}>

      <Text style={{
        color: '#6B7280',
        fontSize: 18,
        fontWeight: 'normal',
        letterSpacing: 3,
        opacity: 0.7
      }}>Hola,</Text>

      <Text style={{
        color: '#6B7280',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 10
      }}>   {user?.nombres}</Text>
      {/* Header Home */}
      {/* <HeaderHomeComponent /> */}

      {/* FlatList de lista de compras */}
      <Text style={{
        color: '#6B7280',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginVertical: 10
      }}>Listas de compras</Text>

      <View
        style={{
          flex: 1,
          borderColor: 'blue',
          borderWidth: 0,

        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ShoppingListCardComponent buysList={item} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>

    </BaseScreenComponent>
  )
}

export default HomeScreen