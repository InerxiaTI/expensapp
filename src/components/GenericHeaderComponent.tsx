import React from 'react'
import HeaderContainerComponent from './base/HeaderContainerComponent'

interface GenericHeaderProps {
    title?: string,
    showArrowBack?: boolean
}

export const GenericHeaderComponent = ({ title = '', showArrowBack = false}: GenericHeaderProps) => {

    return (
        <>
            <HeaderContainerComponent title={title} showArrowBack={showArrowBack}/>
        </>
    )
}

