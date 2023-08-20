import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Collaborator } from "../interfaces/UserInterface";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


interface CollaboratorCardProps {
    collaborator: Collaborator;
    idUsuarioCreador: number;  

}

const CollaboratorCardComponent = ({ collaborator, idUsuarioCreador }: CollaboratorCardProps) => {

    const { authState } = useContext(AuthContext);
    const userLogged = authState.user
    console.log("idUsuarioCreador: "+ idUsuarioCreador);
    console.log("userLogged: "+ userLogged?.id);

    const [disableButton, setDisableButton] = useState(true);
    const [colorIcon, setColorIcon] = useState('grey');


    const rejectCollaborator = () => {
        console.log("rechazar");
        

    }

    const approveCollaborator = () => {
        console.log("aprobar");
        

    }

    useEffect(() => {

        if(idUsuarioCreador === userLogged?.id){
            setColorIcon('white');
            setDisableButton(false)
        }

    })



    
    

    return (

        <View
            style={{
                backgroundColor: '#262626',
                height: 50,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginVertical: 5
            }}
        >
            <Text style={styles.mainText} >{collaborator.nombresUsuario} {collaborator.apellidosUsuario}</Text>
            {
                collaborator.estado === 'APROBADO' ?
                    <Text style={styles.mainText} >{collaborator.porcentaje}%</Text>
                    :
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=> rejectCollaborator()}
                            disabled={disableButton}
                        >
                            <MaterialCommunityIcons name='cancel' size={30} color={colorIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> approveCollaborator()}
                            disabled={disableButton}
                        >
                            <MaterialCommunityIcons name='check-circle' size={30} color={colorIcon} />
                        </TouchableOpacity>
                    </View>

            }



        </View>


    );
};

const styles = StyleSheet.create({
    mainText: {
        color: '#6B7280'
    }

});

export default CollaboratorCardComponent