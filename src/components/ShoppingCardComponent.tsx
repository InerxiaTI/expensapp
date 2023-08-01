import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Shopping } from '../testData/testData';
import { sliceText } from '../utils/textUtil';

interface ShoppingCardProps {
    shopping: Shopping
}

const ShoppingCardComponent = ({ shopping }: ShoppingCardProps) => {
    return (

        <TouchableOpacity>
            <View style={styles.card}>

                <View style={{
                    flex: 1,
                    borderWidth: 0,
                    borderColor: 'blue',
                    gap: 2,
                    justifyContent: 'center'


                }}>
                    <Text style={{
                        borderWidth: 0,
                        borderColor: 'white',
                        fontSize: 14,
                        color: 'white'
                    }}>{sliceText(shopping.concepto, 23)}</Text>

                    <Text style={{
                        borderWidth: 0,
                        borderColor: 'white',
                        fontSize: 12,
                        color: '#6B7280'
                    }}>{shopping.comprador}</Text>

                    <Text style={{
                        borderWidth: 0,
                        borderColor: 'white',
                        fontSize: 12,
                        color: '#6B7280'
                    }}>24 mayo 2023</Text>
                </View>

                <View 
                    style={{
                        flex: 1,
                        borderWidth: 0,
                        borderColor: 'white',
                        justifyContent: 'center'
                    }}
                >
                    <View style={{
                        borderWidth: 0,
                        borderColor: 'yellow',
                        gap: 10,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#fff'
                                }}
                            >\()/</Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#FC2256'
                            }}>$ {shopping.valorCompra}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#fff'
                                }}
                            >\()/</Text>

                            <Text style={{
                                fontSize: 14,
                                color: '#00861D'
                            }}>$ {shopping.cuantoDeben}</Text>
                        </View>

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
        backgroundColor: '#262626',
        marginTop: 11,
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 8,
        paddingBottom: 5,
        borderRadius: 8,
        borderColor: 'green',
        borderWidth: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default ShoppingCardComponent