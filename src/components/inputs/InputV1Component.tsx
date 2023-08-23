import React, { useRef } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardType } from 'react-native'

interface InputV1Props {
    title?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void, // Función que maneja el cambio de texto
    value?: string, // Valor del input
    editable?: boolean,
    keyboardType?: KeyboardType,
    refOwn?:React.Ref<TextInput>,
    autoFocus?: boolean

}

const InputV1Component = ({
    title = '', 
    placeholder = '', onChangeText, value, editable= true, 
    keyboardType = 'default', autoFocus = false, refOwn,}: InputV1Props) => {

    const textInputRef = useRef(null);
    React.useImperativeHandle(refOwn, () => textInputRef.current!);

    return (
        <View
            style={{
                borderWidth: 0,
                borderColor: 'red'
            }}
        >
            <Text style={styles.textInfoInput}>{title}</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    editable={editable}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType} 
                    placeholder={placeholder}
                    placeholderTextColor={'#6B7280'}
                    style={styles.searchTextInput}
                    autoFocus={autoFocus}
                    ref={textInputRef}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#6B7280',
        backgroundColor: '#201F21'

    },
    searchTextInput: {
        flex: 1,
        paddingLeft: 15,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 1,
        fontWeight: '500',
        color: 'white',
        height: 50,
        borderWidth: 0,
        borderColor: 'red',
    },
    textInfoInput: {
        color: '#6B7280',
        fontSize: 24,
        fontWeight: '700',
    },
});

export default InputV1Component