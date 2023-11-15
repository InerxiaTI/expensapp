import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'

interface ConfirmDialogProps {
	visible?: boolean,
	onRequestClose: () => void,
	onConfirm: () => void,
	question: string,
	//options: string[]

}

const ConfirmDialogComponent = ({ visible, onRequestClose, onConfirm, question }: ConfirmDialogProps) => {
	return (
		<Modal
			transparent={true}
			animationType="fade"
			visible={visible}
			onRequestClose={onRequestClose}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						backgroundColor: '#262626',
						padding: 20,
						borderRadius: 10,
						elevation: 5,
						width: '90%',
					}}
				>
					<Text style={{ fontSize: 18, marginBottom: 20, color: 'white' }}>
						{question}
					</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<TouchableOpacity onPress={onRequestClose}>
							<Text style={{ color: 'red', fontSize: 16 }}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onConfirm}>
							<Text style={{ color: 'green', fontSize: 16 }}>Aceptar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default ConfirmDialogComponent