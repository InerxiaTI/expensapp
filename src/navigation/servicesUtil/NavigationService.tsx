
import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { infoLog } from '../../utils/HandlerError'

export const isReadyNavigationRef = React.createRef()
export const navigatorRef = React.createRef()


export const reset = (index: any, name: any, params: any) => {
    infoLog(`Reset inciia ${isReadyNavigationRef.current}`)
    infoLog(`Reset navigator en reset ${JSON.stringify(navigatorRef)}`)
    if (isReadyNavigationRef.current && navigatorRef.current ) {
        infoLog("Reset inicia2")

        try {
            navigatorRef.current.dispatch(
                CommonActions.reset({
                    index,
                    routes: [{name, params}],
                }),
            )
        } catch (error) {
            infoLog("Error en reset")
        }
    }

}

export const getCurrentRoute = () => {
    return navigatorRef?.current?.getRootState()?.routes[0]
}

export const getCurrentScreenName = () => {
    return navigatorRef?.current?.getCurrentRoute()?.name;
    1
}