import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'


interface ButtonV1Props {
    title?: string,

}

const ButtonV1Component = ({title = 'Button name'}: ButtonV1Props) => {
    return (
        <View
            style={{
                borderWidth: 0,
                borderColor: 'white',
                paddingHorizontal: 28,
                justifyContent: 'flex-end', // Alinea el botón al final
                paddingBottom: 20, // Espacio inferior para el botón


            }}
        >
            <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => console.log("add")}
                style={{
                    backgroundColor: '#18032E',
                    borderRadius: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 3
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: 'white'

                    }}
                >{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonV1Component