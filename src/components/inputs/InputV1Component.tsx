import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface InputV1Props {
    title?: string,
    placeholder?: string

}

const InputV1Component = ({title = '', placeholder = ''}: InputV1Props) => {
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
                    // ref={inputRef}
                    // value={textValue}
                    // onChangeText={setTextValue}
                    keyboardType='default'
                    placeholder={placeholder}
                    placeholderTextColor={'lightgrey'}
                    style={styles.searchTextInput}
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