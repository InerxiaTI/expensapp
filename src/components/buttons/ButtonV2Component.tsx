import React from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'


interface ButtonV2Props {
    title?: string,
    onPress?: () => void, // Prop para recibir la función onPress
    habilitarBoton?: boolean,
    isLoading?: boolean,
    buttonColor?: string
    textColor?: string
}

export const ButtonV2Component = ({ 
    title = 'Button name', 
    onPress, 
    habilitarBoton = true,
    isLoading = false, buttonColor = '#7600D3', textColor = '#FFFFFF'}: ButtonV2Props) => {
    return (
        <View
            style={{
                borderWidth: 0,
                borderColor: 'white',
                // paddingHorizontal: 28,
                justifyContent: 'flex-end', // Alinea el botón al final
                paddingBottom: 5, // Espacio inferior para el botón
                backgroundColor: 'transparent',
            }}
        >
            <TouchableOpacity
                disabled={!habilitarBoton}
                activeOpacity={0.3}
                onPress={onPress}
                style={{
                    backgroundColor: buttonColor,
                    borderRadius: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 3,
                    opacity: habilitarBoton ? 1 : 0.4
                }}
            >

                {
                    isLoading ? (
                        <ActivityIndicator color={'white'} size={20} />
                    ) :
                        (
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '700',
                                    color: textColor

                                }}
                            >{title}</Text>
                        )
                }
            </TouchableOpacity>
        </View>
    )
}

