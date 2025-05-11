import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ToolItemProps {
    onPress: ()=>void;
    icon: string;
    name?: string
    
}

const ToolItemComponent = ({onPress, icon, name}: ToolItemProps) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                borderColor: 'red',
                borderWidth: 0,
                height: '100%',
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
        >
            {
                name && (<Text>{name}</Text>)
            }
            <Icon name={icon} size={25} color='white' />
        </TouchableOpacity>
    )
}

export default ToolItemComponent