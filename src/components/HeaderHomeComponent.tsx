import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const HeaderHomeComponent = () => {
    return (
        <View className="flex-row"
            style={{
                borderColor: 'red',
                borderWidth: 0
            }}
        >

            <View className="flex-1 mr-5">
                <TouchableOpacity onPress={() => console.log("clik gren")}>
                    <View className="w-full h-[184]"
                        style={{
                            backgroundColor: '#BFF9B0',
                            borderRadius: 8
                        }}>

                    </View>
                </TouchableOpacity>

            </View>
            <View className="flex-1 justify-between">
                <TouchableOpacity onPress={() => console.log("clik azul")}>

                    <View className="w-full h-[87]"
                        style={{
                            backgroundColor: '#59D8E0',
                            borderRadius: 8
                        }}>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("clik red")}>

                    <View className="w-full h-[87]"
                        style={{
                            backgroundColor: '#F27D99',
                            borderRadius: 8
                        }}>

                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default HeaderHomeComponent