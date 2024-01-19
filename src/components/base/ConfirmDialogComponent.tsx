import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface ConfirmDialogProps {
	visible?: boolean,
	onRequestClose: () => void,
	onConfirm: () => void,
	question: string,
	description?: string
	//options: string[]

}

const ConfirmDialogComponent = ({ visible, onRequestClose, onConfirm, question, description }: ConfirmDialogProps) => {
	return (
		<Modal
			transparent={true}
			animationType="fade"
			visible={visible}
			onRequestClose={onRequestClose}
		>
			<View style={styles.modalView}>
				<View style={styles.modalCard}>
					<Text style={styles.question}>
						{question}
					</Text>
					{ description && <Text style={styles.description}>{description}</Text>}
					<View style={styles.containerButton}>
						<TouchableOpacity onPress={onRequestClose} style={styles.button}>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onConfirm} style={styles.button}>
							<Text style={styles.buttonText}>Aceptar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalCard: {
		backgroundColor: '#3d3d3d',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
		width: '90%',
	},
	question: { 
		fontSize: 16, 
		marginBottom: 20, 
		color: 'white' 
	},
	description: { 
		fontSize: 14, 
		marginBottom: 20, 
		color: '#9E9E9E'
	},
	containerButton:{
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	button: {
		padding: 10,
		borderColor: 'red', 
		borderWidth: 0
	},
	buttonText:{
		color: '#c267ff', 
		fontSize: 14, 
		fontWeight: 'bold'

	}
		
});

export default ConfirmDialogComponent