import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import currencyFormatter from 'currency-formatter'
import { sliceText } from '../../../utils/textUtil';
import { Shopping, EditShoppingRequest } from '../../../interfaces/ShoppingInterface';
import { infoLog } from '../../../utils/HandlerError';
import { ShoppingContext } from '../../../context/ShoppingContext';
import { getFormatedDate } from 'react-native-modern-datepicker';

interface ShoppingCardProps {
  shopping: Shopping,
  shoppingListState: string

}

const ShoppingCardComponent = ({ shopping, shoppingListState }: ShoppingCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [background, setBackground] = useState('#262626')
  const { setShoppingCardSelected, setIdShoppingCardSelected, shoppingState, setShoppingToEdit, setAddExpenseParams } = useContext(ShoppingContext);


  function parseShoppingToEdit() {
    const shoppingToEdit: EditShoppingRequest = {
      idCompra: shopping.id,
      idCategoria: shopping.idCategoria,
      nombreCategoria: shopping.nombreCategoria,
      idUsuarioCompra: shopping.idUsuarioCompra,
      idUsuarioRegistro: shopping.idUsuarioRegistro,
      fechaCompra: shopping.fechaCompra,
      valor: parseFloat(shopping.valor),
      descripcion: shopping.descripcion
    }
    setShoppingToEdit(shoppingToEdit)


  }

  const handleLongPress = () => {
    parseShoppingToEdit()
    setBackground('#d9a2ff')
    setIsPressed(true);
    setShoppingCardSelected(true)
    setIdShoppingCardSelected(shopping.id)
    infoLog("LONGPRESS_1: " + isPressed + " / " + background)

  };

  const handlePressOut = () => {
    setIdShoppingCardSelected(0)
    setShoppingCardSelected(false)
    setBackground('#262626')
    setIsPressed(false);
    infoLog("++++++++++++ LONGPRESS_2: " + isPressed + " / " + background)

  };


  return (

    <TouchableOpacity
      onPress={handlePressOut}
      onLongPress={shoppingListState === "PENDIENTE" ? handleLongPress : () => { }}
      delayLongPress={300}
    >
      <View style={{
        ...styles.card,
        backgroundColor: shopping.id === shoppingState.idShoppingCardSelected && isPressed 
        ? '#4f4f4f' : '#262626'
      }}>
        <View style={styles.containerShoppingInfo}>

          <View style={styles.containerPerColumn}>
            <MaterialCommunityIcons name='shopping' size={18} color='white' />
            <Text style={{
              ...styles.shoppingText,
              color: 'white'
            }}>{sliceText(shopping.nombreCategoria + ". " + shopping.descripcion, 50)}</Text>

          </View>

          <View style={styles.containerPerColumn2}>
            <View style={styles.containerPerColumn}>
              <MaterialCommunityIcons name='currency-usd' size={18} color='grey' />
              <Text style={styles.textGrey}>{shopping.nombresUsuarioCompra}</Text>
            </View>

            <View >
              {/* <Icon name='trending-down' size={14} color='white' /> */}
              {
                shopping.valor == 0
                ?
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#C03CF9' }}>
                    SIN VALOR
                  </Text>
                :
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                    {currencyFormatter.format(parseFloat(shopping.valor), { code: 'COP', precision: 2 })}
                  </Text>
              }
              
            </View>
          </View>


          <View style={styles.containerPerColumn2}>
            <View style={styles.containerPerColumn}>
              <Icon name='calendar' size={18} color='grey' />
              <Text style={styles.textGrey}>{getFormatedDate(new Date(shopping.fechaCompra), "YYYY-MM-DD")}</Text>
            </View>
            
            {
              shopping.nombresUsuarioRegistro!==shopping.nombresUsuarioCompra
              ?
              <View 
                style={{
                  ...styles.containerPerColumn,                  
              }}>
                <Text style={styles.textGrey2}>Registrado por: {shopping.nombresUsuarioRegistro}</Text>
              </View>
              : 
              <></>
            }
          </View>

        </View>
      </View>

    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 81,
    marginTop: 11,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
    borderColor: 'green',
    borderWidth: 0,
    flexDirection: 'column',
  },
  containerShoppingInfo: {
    borderWidth: 0,
    borderColor: 'blue',
    gap: 2,
    justifyContent: 'center',
  },
  containerPerColumn: {
    flexDirection: 'row',
    gap: 5,
    borderWidth: 0,
    borderColor: 'green'
  },
  containerPerColumn2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: 'green'
  },
  shoppingText: {
    fontSize: 14,
    fontWeight: '400',
  },
  textGrey: {
    fontSize: 14,
    color: '#6B7280'
  },
  textGrey2: {
    fontSize: 14,
    color: '#6B7280',
    opacity: 0.6
  }

});

export default ShoppingCardComponent
