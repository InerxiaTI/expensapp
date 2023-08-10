import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback, StyleSheet, SafeAreaView, Platform, ToastAndroid } from 'react-native'
import { COLORS } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseHeaderComponent from './base/BaseHeaderComponent'
import Clipboard from '@react-native-clipboard/clipboard';



interface HeaderShoppingDetailProps {
  title?: string,
  code: string, 
}


const HeaderShoppingDetailComponent = ({title, code}: HeaderShoppingDetailProps) => {
  const navigator = useNavigation();

  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [textToCopy, setTextToCopy] = useState(code);


  const showContextMenu = () => {
    console.log("mostrando menu");

    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString("Hola! \nEste es el código para que te unas a mi lista de compras:\n"+textToCopy);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT);
    } else {
      // Puedes implementar una notificación similar para otras plataformas
    }
  };


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
            gap: 15
        }}
        >
          <TouchableOpacity
            onPress={() => { navigator.goBack() }}
          >
            <Icon name='arrow-left' size={25} color='white' />

          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green'
            }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#6B7280'
            }}>{title}</Text>
          </View>
        </View>

      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 15
        }}
      >
        <TouchableOpacity
          onPress={showContextMenu}
        >
          <Icon name='dots-vertical' size={25} color='white' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { console.log("B") }}
          style={{
            marginRight: 10

          }}
        >
          <Icon name='cart-check' size={25} color='white' />
        </TouchableOpacity>

      </View>

      <Modal
        transparent={true}
        visible={isContextMenuVisible}
        onRequestClose={hideContextMenu}

      >

        <TouchableWithoutFeedback onPress={hideContextMenu}>
          <View
            style={{
              borderColor: 'red',
              borderWidth: 0,
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              backgroundColor: 'transparent'
            }}
          >

            <View
              style={{
                width: 150,
                backgroundColor: '#262626',
                borderRadius: 8,
                marginEnd: 10,
                marginTop: 10,
                paddingVertical: 15,
                paddingLeft: 10,
                paddingTop: 10,
                gap: 10
              }}
            >
              <TouchableOpacity
                onPress={handleCopyToClipboard}
                style={{
                  flexDirection: 'row',
                  borderColor: 'red',
                  borderWidth: 0,
                  gap: 5
                }}

              >
                <Icon name='content-copy' size={20} color={'white'} />
                <Text style={styles.contextMenu}>{code}</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={hideContextMenu}
                style={{
                  flexDirection: 'row',
                  borderColor: 'red',
                  borderWidth: 0,
                  gap: 5
                }}

              >
                <Icon name='account-group-outline' size={20} color={'white'} />
                <Text style={styles.contextMenu}>Colaboradores</Text>
              </TouchableOpacity>

            </View>

          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
    </BaseHeaderComponent >
  )
}

const styles = StyleSheet.create({
  contextMenu: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }

});
export default HeaderShoppingDetailComponent