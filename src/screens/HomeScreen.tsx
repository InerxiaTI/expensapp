import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../components/HeaderHomeComponent'
import Cards from '../components/Cards'

const HomeScreen = () => {

  

  const listasCompras = [
    {fechaCierre: '24 mayo 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '23 abril 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '12 junio 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '6 julio 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '34 agosto 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '15 septiembre 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '24 octubre 2023', estado: 'PAGADO', monto: 513.233},
    {fechaCierre: '24 diciembre 2023', estado: 'PAGADO', monto: 513.233},
  ]


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 
      COLORS.backgroudPrimary, 
      marginHorizontal: 10,
      marginTop: 10,
     }}>

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
            renderItem={({item}) => (
              <Cards cardNumber={1} />
              // <Text style={{marginVertical: 50}}>{item.fechaCierre}</Text>
            )} 
          

          />
        </View>


    </SafeAreaView>
  )
}

export default HomeScreen