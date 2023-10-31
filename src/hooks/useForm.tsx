import React, { useState } from 'react'

interface FormField {
    [key: string]: any,
    condition?: () => boolean;

}

interface FormFields {
    [key: string]: FormField;
}


export const useForm = (initialState: FormFields) => {

    const [state, setState] = useState<FormFields>(initialState)

    // const onChange = <U extends Object>(value: U, field: keyof U) => {  
    //     setState({
    //         ...state,
    //         [field]: value,

    //     })



    // }

    const onChangeValidate = <U extends Object>(value: U, field: string,
        callback: (u: boolean) => void, conditionParam: () => boolean) => {

        const fieldUnit: FormField = {
            [field]: value,
            condition: () => { return conditionParam(); }
        }

        const updatedState = {
            ...state,
            [field]: fieldUnit
        };
        setState(updatedState)

        for (const key in updatedState) {

            if (updatedState[key]
                && typeof updatedState[key].condition === 'function') {
                if (!updatedState[key].condition()) {
                    callback(false)
                    return
                }
            }
        }

        callback(true)
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const r = emailRegex.test(email);
        return r

    }

    return {
        ...state,
        form: state,
        onChangeValidate,
        isValidEmail

    }
}

