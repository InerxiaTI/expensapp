import React from 'react'
import HeaderContainerComponent from './base/HeaderContainerComponent'

interface GenericHeaderProps {
	title?: string,
	showArrowBack?: boolean,
	children?: JSX.Element,

}

export const GenericHeaderComponent = ({ title = '', showArrowBack = false, children }: GenericHeaderProps) => {

	return (
		<>
			<HeaderContainerComponent title={title} showArrowBack={showArrowBack}>
				{children}
			</HeaderContainerComponent>
		</>
	)
}

