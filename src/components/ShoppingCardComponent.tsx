import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Shopping } from '../testData/testData';
import { sliceText } from '../utils/textUtil';

interface ShoppingCardProps {
    shopping: Shopping
}

const ShoppingCardComponent = ({ shopping }: ShoppingCardProps) => {

    const changeToolBar = () => {

        console.log("cambiando toolbar");
        
    }

    return (

        <TouchableOpacity onLongPress={changeToolBar}>
            <View style={styles.card}>
                <View style={styles.containerShoppingInfo}>
                    <View style={styles.containerPerColumn}>
                        <MaterialCommunityIcons name='shopping' size={14} color='white' />
                        <Text style={{
                            ...styles.shoppingText,
                            color: 'white'
                        }}>{sliceText(shopping.concepto, 23)}</Text>

                    </View>

                    <Text style={styles.textGrey}>{shopping.comprador}</Text>

                    <View style={styles.containerPerColumn}>
                        <Icon name='calendar' size={12} color='white' />
                        <Text style={styles.textGrey}>24 mayo 2023</Text>

                    </View>


                </View>

                <View style={styles.containerShoppingAmount} >
                    <View style={styles.containerAmoutIconText}>

                        <View style={styles.containerPerColumn}>
                            <Icon name='trending-down' size={14} color='white' />
                            <Text style={{...styles.shoppingText, color: '#FC2256'}}>
                                $ {shopping.valorCompra}
                            </Text>
                        </View>

                        <View style={styles.containerPerColumn}>
                            <Icon name='trending-up' size={14} color='white' />
                            <Text style={{...styles.shoppingText, color: '#00861D'}}>
                                $ {shopping.cuantoDeben}
                            </Text>
                        </View>

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
        backgroundColor: '#262626',
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
        fontWeight: 'bold',
    },
    textGrey: {
        fontSize: 12,
        color: '#6B7280'
    }

});

export default ShoppingCardComponent