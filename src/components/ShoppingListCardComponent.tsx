import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ShoppingList } from '../interfaces/ShoppingInterface'
import currencyFormatter from 'currency-formatter'

interface ShoppingListCardProps {
    buysList: ShoppingList
}

const ShoppingListCardComponent = ({ buysList }: ShoppingListCardProps) => {
    const navigator = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigator.navigate('ShoppingDetails')}
        >
            <View style={styles.card}>
                <View style={styles.row1}>
                    <View style={styles.col1}>
                        <Text style={styles.mainText}>Fecha de cierre</Text>
                        <Text style={styles.mainText}>Estado</Text>
                    </View>
                    <View style={styles.col1}>
                        <Text style={styles.secondaryText}>{buysList.fechaFinalizado === null? 'N/A': buysList.fechaFinalizado}</Text>
                        <Text style={[styles.secondaryText]}>{buysList.estado}</Text>
                    </View>

                </View>
                <View style={styles.col2}>
                    <Text style={styles.priceText}>
                        {currencyFormatter.format(buysList.totalCompras, {code: 'COP'})}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 81,
        backgroundColor: '#262626',
        marginTop: 11,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 8,
        borderColor: 'red',
        borderWidth: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainText: {
        color: 'white',
        marginBottom: 10,
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16

    },
    row1: {
        height: '100%',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingEnd: 50,
        borderColor: 'red',
        borderWidth: 0,
    },
    col1: {
        height: '100%',
        flex: 1,

    },
    col2: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 0,
    },
    secondaryText: {
        marginBottom: 10,
        color: '#89898A',
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        fontWeight: '400',
        lineHeight: 16

    },
    priceText: {
        color: '#59D8E0',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 19
    }

});

export default ShoppingListCardComponent