import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../components/HeaderHomeComponent'
import ShoppingListCardComponent from '../components/ShoppingListCardComponent'
import BaseScreenComponent from '../components/BaseScreenComponent'

// interface de prueba
export interface BuysList {
  id: number,
  fechaCierre: string,
  estado: string,
  monto: number,
}

const HomeScreen = () => {



  const listasCompras: BuysList[] = [
    { id: 1, fechaCierre: '24 mayo 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 2, fechaCierre: '23 abril 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 3, fechaCierre: '12 junio 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 4, fechaCierre: '6 julio 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 5, fechaCierre: '34 agosto 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 6, fechaCierre: '15 septiembre 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 7, fechaCierre: '24 octubre 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 8, fechaCierre: '24 diciembre 2023', estado: 'PAGADO', monto: 513.233 },
  ]


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
        }}>   Kelly</Text>
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