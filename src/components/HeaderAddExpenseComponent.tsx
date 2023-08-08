import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseHeaderComponent from './base/BaseHeaderComponent'
import { useNavigation } from '@react-navigation/native'

interface HeaderAddExpenseProps {
    title?: string
}

const HeaderAddExpenseComponent = ({title = ''}: HeaderAddExpenseProps) => {
    const navigator = useNavigation();

    return (
        <BaseHeaderComponent>
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0,
                        borderColor: 'white',
                        paddingHorizontal: 15,
                        gap: 15

                    }}
                >
                    <TouchableOpacity
                        onPress={() => { navigator.goBack() }}
                        style={{
                            borderWidth: 0,
                            borderColor: 'blue'

                        }}
                    >
                        <MaterialCommunityIcons name='arrow-left' size={25} color='white' />

                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0,
                            borderColor: 'green'
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white'
                        }}>{title}</Text>
                    </View>
                </View>
            </>
        </BaseHeaderComponent>
    )
}

export default HeaderAddExpenseComponent