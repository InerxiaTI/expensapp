import React, { useRef } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardType, KeyboardTypeOptions } from 'react-native'

interface InputV1Props {
    title?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void, // Función que maneja el cambio de texto
    value?: string, // Valor del input
    editable?: boolean,
    keyboardType?: KeyboardType | KeyboardTypeOptions ,
    refOwn?:React.Ref<TextInput>,
    autoFocus?: boolean
    autoCorrect?: boolean,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined


}

const InputV1Component = ({
    title = '', 
    placeholder = '', onChangeText, value, editable= true, 
    keyboardType = 'default', autoFocus = false, refOwn,
    autoCorrect = true, autoCapitalize= 'none'}: InputV1Props) => {

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
            <View 
                style={{
                    ...styles.searchContainer,
                    borderWidth: !editable ? 0: 1
                }}
            >
                <TextInput
                    editable={editable}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType} 
                    placeholder={placeholder}
                    placeholderTextColor={'#6B7280'}
                    style={{...styles.searchTextInput, color: !editable? '#6B7280': 'white'}}
                    autoFocus={autoFocus}
                    ref={textInputRef}
                    autoCapitalize={autoCapitalize}
                    // autoCorrect={autoCorrect}
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