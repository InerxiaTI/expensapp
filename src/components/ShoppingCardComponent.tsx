import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { sliceText } from '../utils/textUtil';
import { Shopping } from '../interfaces/ShoppingInterface';
import { infoLog } from '../utils/HandlerError';
import { ShoppingContext } from '../context/ShoppingContext';

interface ShoppingCardProps {
  shopping: Shopping,
  
}

const ShoppingCardComponent = ({ shopping }: ShoppingCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [background, setBackground] = useState('#262626')
  const { setShoppingCardSelected, setIdShoppingCardSelected, shoppingState } = useContext(ShoppingContext);



  const handleLongPress = () => {
    Vibration.vibrate(100); // Vibra durante 100 milisegundos
    setBackground('#d9a2ff')
    setIsPressed(true);
    setShoppingCardSelected(true)
    setIdShoppingCardSelected(shopping.id)
    infoLog("LONGPRESS_1: " + isPressed +" / " +background)

  };

  const handlePressOut = () => {
    console.log("+++++++++++++++++++");
    setIdShoppingCardSelected(0)
    setShoppingCardSelected(false)
    setBackground('#262626')
    setIsPressed(false);
    infoLog("++++++++++++ LONGPRESS_2: " + isPressed +" / " +background)

  };



  return (

    <TouchableOpacity 
      // onPressOut={handlePressOut}
      onPress={handlePressOut}
      onLongPress={handleLongPress} >
      <View style={{
          ...styles.card, 
          backgroundColor: shopping.id === shoppingState.idShoppingCardSelected && isPressed? '#d9a2ff': '#262626'}}>
        <View style={styles.containerShoppingInfo}>
          <View style={styles.containerPerColumn}>
            <MaterialCommunityIcons name='shopping' size={14} color='white' />
            <Text style={{
              ...styles.shoppingText,
              color: 'white'
            }}>{sliceText(shopping.nombreCategoria + ". " + shopping.id, 23)}</Text>

          </View>

          <Text style={styles.textGrey}>{shopping.nombresUsuarioCompra}</Text>

          <View style={styles.containerPerColumn}>
            <Icon name='calendar' size={12} color='white' />
            <Text style={styles.textGrey}>{shopping.fechaCreacion}</Text>

          </View>


        </View>

        <View style={styles.containerShoppingAmount} >
          <View style={styles.containerAmoutIconText}>

            <View style={styles.containerPerColumn}>
              {/* <Icon name='trending-down' size={14} color='white' /> */}
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                $ {shopping.valor}
              </Text>
            </View>

            {/* <View style={styles.containerPerColumn}>
                            <Icon name='trending-up' size={14} color='white' />
                            <Text style={{...styles.shoppingText, color: '#00861D'}}>
                                $ {shopping.cuantoDeben}
                            </Text>
                        </View> */}

          </View>
        </View>

      </View>

    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  card: {
    gap: 5,
    width: '100%',
    height: 81,
    marginTop: 11,
    paddingStart: 16,
    paddingTop: 8,
    paddingBottom: 5,
    borderRadius: 8,
    borderColor: 'green',
    borderWidth: 0,
    flexDirection: 'row',
  },
  containerShoppingInfo: {
    width: '55%',
    borderWidth: 0,
    borderColor: 'blue',
    gap: 2,
    justifyContent: 'center',
  },
  containerShoppingAmount: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'white',
    justifyContent: 'center',
  },
  containerAmoutIconText: {
    borderWidth: 0,
    borderColor: 'yellow',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  containerPerColumn: {
    flexDirection: 'row',
    gap: 5,
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
  }

});

export default ShoppingCardComponent
