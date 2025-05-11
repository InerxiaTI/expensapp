import { View, Text, StyleSheet } from 'react-native';
import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { DetalleCierre } from '../interfaces/DetalleCierreInterface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ButtonV2Component } from './buttons/ButtonV2Component';


interface ClousureCardProps {
	detalleCierre: DetalleCierre
	updateCollaboratorsList?: () => void;
	actionButtom?: () => void
}

const ClousureCardComponent = ({
	detalleCierre,
	updateCollaboratorsList, actionButtom }: ClousureCardProps) => {

	const navigator = useNavigation();

	const { authState } = useContext(AuthContext);
	const userLogged = authState.user
	console.log("userLogged: " + userLogged?.id);

	return (

		<View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Deudor: <Text style={styles.name}>{detalleCierre.nombresDeudor}</Text></Text>
          <Text style={styles.label}>Acreedor: <Text style={styles.name}>{detalleCierre.nombresAcreedor}</Text></Text>
          <Text style={styles.status}>{detalleCierre.aprobado?"Pagado":"Pendiente de pago"}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>$ {detalleCierre.totalDeuda.toLocaleString('es-CO')}</Text>
          {/* <Ionicons name="checkmark-circle" size={24} color="white" /> */}
					{
						detalleCierre.aprobado?
						<Icon name={"check-decagram"} size={25} color='white' />
						:
							userLogged?.id === detalleCierre.usuarioAcreedorId?
							<View
								style={{
									borderColor: 'red',
									borderWidth: 0,
									width: 60,
									height: 40,
									justifyContent: 'center',
									alignContent: 'center',
								}}
							>
								<ButtonV2Component 
									title='Aprobar'
									titleSize={14}
									height={30}
									onPress={()=>actionButtom()}
								/>
							</View>
							:
							<View
								style={{
									borderColor: 'red',
									borderWidth: 0,
									flex: 1,
									height: 40,
									justifyContent: 'center',
									alignContent: 'center',
								}}
							>
								<Text style={styles.label}>{detalleCierre.nombresAcreedor} <Text style={styles.name}>debe aprobar</Text> </Text>
							</View>
					}
					
        </View>
      </View>
    </View>
  );



};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
  name: {
    color: '#6B7280',
    fontWeight: '500',
  },
  status: {
    marginTop: 6,
    color: '#fff',
    fontSize: 14,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ClousureCardComponent
