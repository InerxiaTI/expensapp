import React, { useState } from 'react'
import { Button, Image, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

const AddExpenseScreen = () => {
    const navigator = useNavigation();

    const [selected, setSelected] = React.useState("");
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
        <BaseScreenComponent>
            {/* Header */}
            <HeaderAddExpenseComponent title='Agregar gasto' />

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: 'red',
                    marginTop: 50,
                }}
                enabled behavior={'padding'}
            >

                <ScrollView

                >
                    {/* Imagen */}
                    <View style={{
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
                            borderColor: 'white',
                            paddingHorizontal: 28
                        }}
                    >

                        <View
                            style={{
                                borderWidth: 0,
                                borderColor: 'blue'
                            }}
                        >

                            <Text style={styles.textInfoInput}>Fecha de compra</Text>
                            <View style={styles.searchContainer}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        paddingLeft: 15,
                                        height: 50,
                                        justifyContent: 'center',
                                        borderWidth: 0,
                                        borderColor: 'red',
                                    }}
                                    onPress={handleOnPressStartDate}
                                >
                                    <Text style={{
                                        fontSize: 14,
                                        lineHeight: 20,
                                        letterSpacing: 1,
                                        fontWeight: '500',
                                        color: 'lightgrey',
                                    }}>{selectedStartDate}</Text>
                                </TouchableOpacity>

                            </View>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={openStartDatePicker}
                            >

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <DatePicker
                                            style={{
                                                borderColor: 'red',
                                                borderWidth: 0
                                            }}
                                            mode="calendar"
                                            maximumDate={startDate}
                                            current={selectedStartDate}
                                            selected={selectedStartDate}
                                            onDateChange={handleChangeStartDate}
                                            onSelectedChange={(date) => setSelectedStartDate(date)}
                                            options={{
                                                backgroundColor: "#201F21",
                                                textHeaderColor: "#59D8E0",
                                                textDefaultColor: "#FFFFFF",
                                                selectedTextColor: "#000",
                                                mainColor: "#59D8E0",
                                                textSecondaryColor: "#FFFFFF",
                                                borderColor: "rgba(32, 31, 33, 0.1)",
                                            }}
                                        />

                                        <TouchableOpacity
                                            style={{
                                                padding: 0,
                                                borderColor: "red",
                                                borderWidth: 0,
                                                width: 100,
                                                height: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onPress={handleOnPressStartDate}>
                                            <Text style={{ color: "white" }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </Modal>


                        </View>


                        <View
                            style={{
                                borderWidth: 0,
                                borderColor: 'red'
                            }}
                        >
                            <Text style={styles.textInfoInput}>Comprador</Text>
                            <SelectList
                                setSelected={(val: string) => setSelected(val)}
                                searchPlaceholder={'Comprador'}
                                placeholder={'Comprador'}
                                data={data}
                                search={false}
                                arrowicon={<MaterialCommunityIcons name='chevron-down' size={20} color='white' />}
                                dropdownStyles={{
                                    backgroundColor: 'transparent',
                                    borderColor: '#6B7280'
                                }}
                                boxStyles={{
                                    marginTop: 5,
                                    marginBottom: 16,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 50,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: '#6B7280',
                                    backgroundColor: '#201F21',
                                }}
                                dropdownTextStyles={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    letterSpacing: 1,
                                    fontWeight: '500',
                                    color: 'white',
                                }}
                                inputStyles={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    letterSpacing: 1,
                                    fontWeight: '500',
                                    color: 'white',
                                }}
                                save="value"
                            />


                        </View>
                        <View
                            style={{
                                borderWidth: 0,
                                borderColor: 'red'
                            }}
                        >
                            <Text style={styles.textInfoInput}>Compra</Text>
                            <View style={styles.searchContainer}>
                                {/* <TouchableOpacity
                            onPress={() => console.log("d")}
                            style={styles.searchOpacity}
                        >
                            <Icon
                                name='arrow-back'
                                size={20}
                                color={'white'}
                            />
                        </TouchableOpacity> */}

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
                                {/* <TouchableOpacity
                            onPress={() => console.log("d")}
                            style={styles.searchOpacity}
                        >
                            <Icon
                                name='arrow-back'
                                size={20}
                                color={'white'}
                            />
                        </TouchableOpacity> */}

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
                            <Text style={styles.textInfoInput}>Tipo de compra</Text>
                            <SelectList
                                setSelected={(val: string) => setSelected(val)}
                                searchPlaceholder={'Tipo de compra'}
                                placeholder={'Tipo de compra'}
                                data={data}
                                search={false}
                                arrowicon={<MaterialCommunityIcons name='chevron-down' size={20} color='white' />}
                                dropdownStyles={{
                                    backgroundColor: 'transparent',
                                    borderColor: '#6B7280'
                                }}
                                boxStyles={{
                                    marginTop: 5,
                                    marginBottom: 16,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 50,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: '#6B7280',
                                    backgroundColor: '#201F21',
                                }}
                                dropdownTextStyles={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    letterSpacing: 1,
                                    fontWeight: '500',
                                    color: 'white',
                                }}
                                inputStyles={{
                                    fontSize: 14,
                                    lineHeight: 20,
                                    letterSpacing: 1,
                                    fontWeight: '500',
                                    color: 'white',
                                }}
                                save="value"
                            />


                        </View>


                    </View>

                    {/* Boton */}
                    <View
                        style={{
                            borderWidth: 0,
                            borderColor: 'white',
                            paddingHorizontal: 28
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
                </ScrollView>


            </KeyboardAvoidingView>


        </BaseScreenComponent>
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