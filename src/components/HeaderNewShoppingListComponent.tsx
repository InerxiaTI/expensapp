import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import BaseHeaderComponent from './base/BaseHeaderComponent'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

interface HeaderNewShoppingListProps {
    title?: string,
    showArrowBack?: boolean,
}

const HeaderNewShoppingListComponent = ({ title = '', showArrowBack = false }: HeaderNewShoppingListProps) => {

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
                    }}
                >
                    {
                        showArrowBack && (
                            <TouchableOpacity
                                onPress={() => { navigator.goBack() }}
                                style={{
                                    paddingRight: 10,
                                    borderWidth: 0,
                                    borderColor: 'blue'

                                }}
                            >
                                <MaterialCommunityIcons name='arrow-left' size={25} color='white' />

                            </TouchableOpacity>
                        )
                    }


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

export default HeaderNewShoppingListComponent