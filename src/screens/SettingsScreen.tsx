import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { AuthContext } from '../context/AuthContext';
import { reset } from '../navigation/servicesUtil/NavigationService';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SettingsCardComponent from '../components/SettingsCardComponent';
import { infoLog } from '../utils/HandlerError';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const SettingsScreen = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();


  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    

  }



  return (
    <BaseScreenComponent screen='Settings' statusBarColor='#270C3D'>
      <View
        style={{
          backgroundColor: '#270C3D',
          height: 150
        }}
      >
        <Text>Nombre usuario</Text>
      </View>
      <ScrollView
        style={{
          borderColor: 'yellow',
          borderWidth: 0
        }}
      >
        {/* Card settings */}

        <SettingsCardComponent onPress={()=>{infoLog("Desde settings")}} title={t('settings:categories')} icon='shape'/>
        <SettingsCardComponent onPress={()=>{infoLog("Desde settings")}} title={t('settings:notifications')} icon='shape'/>
        <SettingsCardComponent onPress={()=>{infoLog("Desde settings")}} title={t('settings:privacity')} icon='shape'/>
        <SettingsCardComponent onPress={()=>{infoLog("Desde settings")}} title={t('settings:storage')} icon='shape'/>
        <SettingsCardComponent onPress={()=>{navigator.navigate('Language')}} title={t('settings:lang')} icon='shape'/>
        <SettingsCardComponent onPress={()=>{handleLogOut()}} title={t('settings:logout')} icon='logout'/>

      </ScrollView>


    </BaseScreenComponent>
  )
}

export default SettingsScreen