import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ShoppingList } from '../../../interfaces/ShoppingInterface'
import currencyFormatter from 'currency-formatter'
import { sliceText } from '../../../utils/textUtil'
import { getFormatedDate } from 'react-native-modern-datepicker';


interface ShoppingListCardProps {
    buysList: ShoppingList
}

const ShoppingListCardComponent = ({ buysList }: ShoppingListCardProps) => {
    const navigator = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigator.navigate('ShoppingDetails', buysList)}
        >
            <View style={styles.card}>

                <View
                    style={{
                        borderWidth: 0,
                        borderColor: 'white'
                    }}
                >
                    <View
                        style={{
                            borderWidth: 0,
                            borderColor: 'blue'
                        }}
                    >
                        <Text style={styles.mainText}>{sliceText(buysList.nombre, 25)}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0,
                            borderColor: 'green',
                            flexDirection: 'row',
                            gap: 10,
                            marginTop: 10
                        }}
                    >
                        {
                            buysList.estado !== "PENDIENTE" && buysList.fechaFinalizado !== null?
                                <>
                                    <Text style={styles.secondaryText}>Fecha de finalización:</Text>
                                    <Text style={styles.secondaryText}>{buysList.fechaFinalizado === null ? 'N/A' : getFormatedDate(new Date(buysList.fechaFinalizado), "YYYY-MM-DD")}</Text>
                                </>
                             :<></>
                        }
                       
                    </View>
                    <View
                        style={{
                            borderWidth: 0,
                            borderColor: 'yellow'
                        }}
                    >
                        <Text style={styles.secondaryText}>{buysList.estado}</Text>
                    </View>
                </View>

                <View
                    style={{
                        borderWidth: 0,
                        borderColor: 'red',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={styles.priceText}>{currencyFormatter.format(buysList.totalCompras, { code: 'COP' })}</Text>
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
        color: '#e7e7e7',
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 16

    },
    secondaryText: {
        color: '#89898A',
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        fontWeight: '400',
        lineHeight: 16

    },
    priceText: {
        color: '#CD8EFF',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 19
    }

});

export default ShoppingListCardComponent
