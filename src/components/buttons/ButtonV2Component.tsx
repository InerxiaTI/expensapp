import React from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'


interface ButtonV2Props {
    title?: string,
    onPress?: () => void, // Prop para recibir la función onPress
    habilitarBoton?: boolean,
    isLoading?: boolean,
    buttonColor?: string
    textColor?: string
    height?: number,
    borderRadius?: number
    titleSize?: number
}

export const ButtonV2Component = ({ 
    title = 'Button name', 
    onPress, 
    habilitarBoton = true,
    isLoading = false, buttonColor = '#7600D3', textColor = '#FFFFFF', height = 50,
    borderRadius = 20, titleSize = 14}: ButtonV2Props) => {
    return (
        <View
            style={{
                borderWidth: 0,
                borderColor: 'white',
                // paddingHorizontal: 28,
                backgroundColor: 'transparent',
            }}
        >
            <TouchableOpacity
                disabled={!habilitarBoton}
                activeOpacity={0.3}
                onPress={onPress}
                style={{
                    backgroundColor: buttonColor,
                    borderRadius: borderRadius,
                    height: height,
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
                                    fontSize: titleSize,
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

