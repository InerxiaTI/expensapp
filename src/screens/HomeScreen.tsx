import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../components/HeaderHomeComponent'
import ShoppingListCardComponent from '../components/ShoppingListCardComponent'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { listasCompras } from '../testData/testData'

// interface de prueba
export interface BuysList {
  id: number,
  fechaCierre: string,
  estado: string,
  monto: number,
}

const HomeScreen = () => {

  return (
    <BaseScreenComponent style={{paddingHorizontal: 10}}>

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
            borderWidth: 0,

          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listasCompras}
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