import React, { useContext } from 'react'
import { Text, } from 'react-native'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { AuthContext } from '../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import SettingsCardComponent from '../components/SettingsCardComponent';
import { infoLog } from '../utils/HandlerError';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';


const SettingsScreen = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();


  const { logOut } = useContext(AuthContext);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigator.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
        <SafeAreaView
          style={{
            borderWidth: 0,
            borderColor: 'red',
            backgroundColor: '#3f007b',
            height: 150
          }}
        >
          <Text>Nombre usuario</Text>
        </SafeAreaView>
      ),

    });
  }, [navigator]);

  const handleLogOut = () => {
    logOut()
  }

  return (
    <BaseScreenComponent screen='Settings' statusBarColor='#3f007b'>
      <ScrollView
        style={{
          borderColor: 'yellow',
          borderWidth: 0
        }}
      >
        {/* Card settings */}

        <SettingsCardComponent onPress={() => { navigator.navigate('Categories') }} title={t('settings:categories')} icon='shape' />
        <SettingsCardComponent onPress={() => { infoLog("Desde settings") }} title={t('settings:notifications')} icon='shape' />
        <SettingsCardComponent onPress={() => { infoLog("Desde settings") }} title={t('settings:privacity')} icon='shape' />
        <SettingsCardComponent onPress={() => { infoLog("Desde settings") }} title={t('settings:storage')} icon='shape' />
        <SettingsCardComponent onPress={() => { navigator.navigate('Language') }} title={t('settings:lang')} icon='shape' />
        <SettingsCardComponent onPress={() => { handleLogOut() }} title={t('settings:logout')} icon='logout' />

      </ScrollView>


    </BaseScreenComponent>
  )
}

export default SettingsScreen