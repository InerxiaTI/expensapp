import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import BaseScreenComponent from '../components/BaseScreenComponent'
import BaseHeaderComponent from '../components/base/BaseHeaderComponent'
import expenseBanner from '../../assets/expenseBanner.png';
import { COLORS } from '../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import HeaderAddExpenseComponent from '../components/HeaderAddExpenseComponent';
import { TabBarContext, useTabBarVisibility } from '../context/TabBarContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddExpenseScreen = () => {
    const navigator = useNavigation();

    const [selected, setSelected] = useState("");
    console.log("comprador: " + selected);

    const data = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

    const today = new Date();
    const startDate = getFormatedDate(
        today,
        "YYYY/MM/DD"
    );
    const [startedDate, setStartedDate] = useState(startDate);
    const [selectedStartDate, setSelectedStartDate] = useState(startedDate);

    function handleChangeStartDate(propDate: string) {
        setStartedDate(propDate);
    }

    // cerrar o abrir modal
    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={{
                paddingBottom: 60
            }}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={60}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0,
                                borderColor: 'white',
                                paddingHorizontal: 28
                            }}
                        >

                            {/* Imagen */}
                            <View style={{
                                flex: 1,
                                width: '100%',
                                alignItems: 'center',
                                borderWidth: 0,
                                borderColor: 'red'
                            }}>
                                <Image
                                    source={expenseBanner}
                                    style={{ width: 100, height: 100 }}
                                />
                            </View>

                            {/* inputs */}


                            <View
                                style={{
                                    borderWidth: 0,
                                    borderColor: 'red'
                                }}
                            >
                                <Text style={styles.textInfoInput}>Compra</Text>
                                <View style={styles.searchContainer}>


                                    <TextInput
                                        // ref={inputRef}
                                        // value={textValue}
                                        // onChangeText={setTextValue}
                                        keyboardType='default'
                                        placeholder='Compra'
                                        placeholderTextColor={'lightgrey'}
                                        style={styles.searchTextInput}

                                    // autoFocus={isFocused}
                                    />


                                </View>


                            </View>

                            <View
                                style={{
                                    borderWidth: 0,
                                    borderColor: 'red'
                                }}
                            >
                                <Text style={styles.textInfoInput}>Valor</Text>
                                <View style={styles.searchContainer}>


                                    <TextInput
                                        // ref={inputRef}
                                        // value={textValue}
                                        // onChangeText={setTextValue}
                                        placeholder='Valor compra'
                                        keyboardType='phone-pad'
                                        placeholderTextColor={'lightgrey'}
                                        style={styles.searchTextInput}
                                        keyboardAppearance='light'
                                        autoCorrect={false}
                                        importantForAutofill='no'
                                    // autoFocus={isFocused}
                                    />


                                </View>


                            </View>


                            <View
                                style={{
                                    borderWidth: 0,
                                    borderColor: 'red'
                                }}
                            >
                                <Text style={styles.textInfoInput}>Valor</Text>
                                <View style={styles.searchContainer}>

                                    <TextInput
                                        // ref={inputRef}
                                        // value={textValue}
                                        // onChangeText={setTextValue}
                                        placeholder='Valor compra'
                                        keyboardType='phone-pad'
                                        placeholderTextColor={'lightgrey'}
                                        style={styles.searchTextInput}
                                        keyboardAppearance='light'
                                        autoCorrect={false}
                                        importantForAutofill='no'
                                    // autoFocus={isFocused}
                                    />


                                </View>


                            </View>


                            <View
                                style={{
                                    borderWidth: 0,
                                    borderColor: 'red'
                                }}
                            >
                                <Text style={styles.textInfoInput}>Compra</Text>
                                <View style={styles.searchContainer}>

                                    <TextInput
                                        // ref={inputRef}
                                        // value={textValue}
                                        // onChangeText={setTextValue}
                                        keyboardType='default'
                                        placeholder='LAST Compra'
                                        placeholderTextColor={'lightgrey'}
                                        style={styles.searchTextInput}

                                    // autoFocus={isFocused}
                                    />


                                </View>


                            </View>

                            <View
                                style={{
                                    borderWidth: 0,
                                    borderColor: 'red'
                                }}
                            >
                                <Text style={styles.textInfoInput}>Compra</Text>
                                <View style={styles.searchContainer}>

                                    <TextInput
                                        // ref={inputRef}
                                        // value={textValue}
                                        // onChangeText={setTextValue}
                                        keyboardType='default'
                                        placeholder='LAST Compra'
                                        placeholderTextColor={'lightgrey'}
                                        style={styles.searchTextInput}

                                    // autoFocus={isFocused}
                                    />


                                </View>


                            </View>
                            <View
                                style={{
                                    borderWidth: 0,
                                    borderColor: 'red'
                                }}
                            >
                                <Text style={styles.textInfoInput}>Compra</Text>
                                <View style={styles.searchContainer}>

                                    <TextInput
                                        // ref={inputRef}
                                        // value={textValue}
                                        // onChangeText={setTextValue}
                                        keyboardType='default'
                                        placeholder='3 LAST Compra'
                                        placeholderTextColor={'lightgrey'}
                                        style={styles.searchTextInput}

                                    // autoFocus={isFocused}
                                    />


                                </View>


                            </View>

                            {/* Boton */}
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
                                    >Agregar Gasto</Text>
                                </TouchableOpacity>
                            </View>



                        </View>


                    </TouchableWithoutFeedback>



                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>





    )
}



const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
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
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#201F21",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        borderColor: '#6B7280',
        borderWidth: 0,
        shadowColor: "#6B7280",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 3,
    },

});

export default AddExpenseScreen