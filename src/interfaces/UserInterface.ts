// Generated by https://quicktype.io

export interface UserLoggedResponse {
    status: number;
    body:   User;
}

export interface User {
    id:         number;
    nombres:    string;
    apellidos:  string;
    activo:     boolean;
    correo:     string;
    contrasena: string;
}