import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ToolItemProps {
    onPress: ()=>void;
    icon: string;
    
}

const ToolItemComponent = ({onPress, icon}: ToolItemProps) => {
    return (
        <TouchableOpacity
            style={{
                borderColor: 'red',
                borderWidth: 0,
                height: '100%',
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
        >
            <Icon name={icon} size={25} color='white' />
        </TouchableOpacity>
    )
}

export default ToolItemComponent