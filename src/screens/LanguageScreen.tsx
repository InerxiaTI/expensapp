import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackTypeParamList } from '../../../App';
import { t } from 'i18next';
import { DefaultTheme } from '@react-navigation/native';
import i18n from '../localization/i18n';
const languages = [ // Language List
    { code: 'en', label: t('language:english') },
    { code: 'es', label: t('language:spanish') },
];

const LanguageScreen = () => {
    const {t} = useTranslation();
    const [lang, changeLang] = useState('en');
    const selectedLanguageCode = i18n.language;


    return (
        <View>
            <Text style={styles.language}> {t('settings:categories')}</Text>
            {languages.map((currentLang, i) => {
                console.log("current: " + JSON.stringify(currentLang));
                console.log("selected: " + JSON.stringify(selectedLanguageCode));
                
                const selectedLanguage = currentLang.code === selectedLanguageCode;
                return (
                    <Text
                        key={i}
                        onPress={() => {
                            changeLang(currentLang.code);
                            i18n.changeLanguage(currentLang.code); // it will change the language through out the app.
                        }}
                        style={{
                            color: 'white',
                            padding: 10,
                            fontSize: 18,
                            fontWeight: selectedLanguage ? 'bold' : 'normal',
                        }}>
                        {currentLang.label}
                    </Text>
                );
            })}
        </View>
    );
};
export default LanguageScreen;


const styles = StyleSheet.create({
    language: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center',
    },
});