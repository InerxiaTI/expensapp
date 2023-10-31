import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export enum ToastPosition {
    Top,
    Bottom,
    Left,
    Right,
}

export enum ToastType {
    INFO,
    WARNING,
    SUCCESS
}


interface Props {
    showToast: boolean;
    message: string;
    position?: ToastPosition;
    type?: ToastType;
    duration?: number;

}

const Toast = ({ showToast, message, position, type = ToastType.INFO, duration = 2500 }: Props): JSX.Element => {
    const positionY = useSharedValue(position === ToastPosition.Top ? -100 : 100);
    const positionX = useSharedValue(position === ToastPosition.Right ? -100 : 100);
    const [typeColor, setTypeColor] = useState('')
    const [iconToast, setIconToast] = useState('check-circle-outline')
    const [showToastState, setShowToastState] = useState(false)
    console.log("inicio: " + showToast);
    

    const getColor = () => {

        switch (type) {
            case ToastType.SUCCESS:
                setTypeColor('rgba(69, 165, 61, 0.95)')
                setIconToast('check-circle-outline')
                break;
            case ToastType.WARNING:
                setTypeColor('rgba(230, 207, 0, 0.95)')
                setIconToast('alert')
                break;
            default:
                setTypeColor('rgba(124, 93, 245, 0.95)')
                setIconToast('information-outline')
                break;
        }
    }


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: withSpring(positionX.value)
            }],
        };
    });


    const hideToast = () => {
        console.log("ocultando...", showToastState);
        setShowToastState(false)

        if (position === ToastPosition.Top) {
            positionY.value = -100;
        }
        if (position === ToastPosition.Bottom) {
            positionY.value = 100;
        }
        if (position === ToastPosition.Right) {
            positionX.value = 999;
        }
        if (position === ToastPosition.Left) {
            positionX.value = -16;
        }
        console.log("visible::", showToastState);

    }

    useEffect(() => {
        setShowToastState(showToast)
        console.log("showToast:---- " + showToast);
        console.log("showToastState alert:---- " + showToastState);

        getColor()
        if (showToastState) {
            if (position === ToastPosition.Top) {
                positionY.value = 0;
            }
            if (position === ToastPosition.Bottom) {
                positionY.value = -16;
            }
            if (position === ToastPosition.Right) {
                positionX.value = 0;
            }
            if (position === ToastPosition.Left) {
                positionX.value = -16;
            }

            if (duration) {
                setTimeout(() => {
                    hideToast()
                }, duration);
            }
        } else {
            hideToast()
        }
    }, [showToast]);

    return (
        showToastState ? (
            <Modal
                transparent={false}
                visible={true}
            //   onRequestClose={hideContextMenu}
            >
                <View style={styles.container}>

                    <Animated.View
                        style={[
                            styles.commonToastStyle,
                            position === ToastPosition.Right ? styles.rightToastStyle : styles.bottomToastStyle,
                            { backgroundColor: typeColor },
                            animatedStyle,
                        ]}
                    >
                        <Icon name={iconToast} size={16} color='white' />
                        <Text style={styles.mainText}>{message}</Text>
                    </Animated.View>
                </View>

            </Modal>

        ) : <></>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 0,
        borderColor: 'red',
        alignItems: 'flex-end',
        position: 'absolute',
        zIndex: 9999999,

    },
    commonToastStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        gap: 5,
        height: 60,
        width: '90%',
        borderTopLeftRadius: 99,
        borderBottomLeftRadius: 99,
        marginTop: 80,
        borderColor: 'red',
        borderWidth: 0,
        right: 0,
        left: 0,
        zIndex: 99999,
    },
    rightToastStyle: {
        left: 0
    },
    bottomToastStyle: {
        backgroundColor: '#FFCCCB',
        bottom: 0,
    },
    mainText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Toast;