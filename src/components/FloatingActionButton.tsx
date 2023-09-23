import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet, Text, TouchableNativeFeedback, Platform, View, TouchableOpacity } from 'react-native'

interface FabProps {
    title: string
    position?: "br" | "bl"
    onPress?: () => void
}

const FloatingActionButton = ({title, onPress, position = "br"}: FabProps) => {
    const ios = () => {
        return (
            <TouchableOpacity 
                activeOpacity={0.5}
                style={[
                    styles.fabLocation, 
                    (position == "br")?styles.fabRight: styles.fabLeft 
                ]}
                onPress={onPress} >
                <View style={styles.fab}>
                    <MaterialCommunityIcons name='e' size={20} color={'#18032E'} />
                </View>
            </TouchableOpacity>
        )
    } 
    
    const android = () => {
        return (
            <View  style={[
                styles.fabLocation, 
                (position == "br")?styles.fabRight: styles.fabLeft 
            ]}>
                <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.Ripple('#D7B2FD', false, 30)}
                    onPress={onPress} >
                    <View style={styles.fab}>
                        <MaterialCommunityIcons name='cart-plus' color={'white'} style={styles.fabText} />
                    </View>
                </TouchableNativeFeedback>
           </View>
          )
    }

    return Platform.OS === 'ios' ? ios(): android();
}

const styles = StyleSheet.create({
    fabLocation: {
        position: 'absolute',
        bottom: 25,
    },
    fabRight: {
        right: 25
    },
    fabLeft: {
        left: 25
    },
    fabLocationBR: {
        position: 'absolute',
        bottom: 25,
        right: 25
    },
    fab: {
        backgroundColor: '#7600D3',
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
    },
    fabText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default FloatingActionButton