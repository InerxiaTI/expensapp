import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface SettingsCardProps {
    title: string,
    icon: string,
    onPress?: () => void
}

const SettingsCardComponent = ({title, icon, onPress}: SettingsCardProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: '#262626',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    }}
  >
    <View
      style={{
        borderColor: 'red',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        gap: 24
      }}
    >
      {/* Icon */}
      <View>
        <Icon name={icon} size={25} color="white"/>

      </View>

      {/* Texto */}
      <View>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            fontStyle: 'normal',
            fontWeight: '400'
          }}
        >{title}</Text>

      </View>
    </View>

    {/* Common icon */}
    <View
      style={{
        marginRight: 12
      }}
    >
        <Icon name="chevron-right" size={25} color="white"/>
    </View>

  </TouchableOpacity>
  )
}

export default SettingsCardComponent