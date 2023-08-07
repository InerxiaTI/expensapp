import React from 'react'
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../components/HeaderHomeComponent'
import ShoppingListCardComponent from '../components/ShoppingListCardComponent'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { listasCompras } from '../testData/testData'
import { useShoppingLists } from '../hooks/useShopping'


const HomeScreen = () => {

  const { isLoading, shoppingLists } = useShoppingLists();

  if (isLoading) {
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
      }}>   Pepito</Text>
      {/* Header Home */}
      <HeaderHomeComponent />

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
          borderWidth: 1,

        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shoppingLists}
          keyExtractor={(item, index) => index.toString()} // Agrega esta línea
          renderItem={({ item }) => (
            <ShoppingListCardComponent buysList={item} />
            // <Text style={{marginVertical: 50}}>{item.fechaCierre}</Text>
          )}


        />
      </View>

    </BaseScreenComponent>
  )
}

export default HomeScreen