import React from 'react'
import HeaderContainerComponent from './base/HeaderContainerComponent'

interface HeaderNewShoppingListProps {
    title?: string,
}

const HeaderNewShoppingListComponent = ({ title = ''}: HeaderNewShoppingListProps) => {

    return (
        <>
            <HeaderContainerComponent title={title} showArrowBack/>
        </>
    )
}

export default HeaderNewShoppingListComponent