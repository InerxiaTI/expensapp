import { User as u } from "../../interfaces/UserInterface";



export class User {
    id: number;
    name: string;
    lastName: string;
    active: boolean;
    email: string;
    password: string;
  
    constructor(
      id: number,
      name: string,
      lastName: string,
      active: boolean,
      email: string,
      password: string
    ) {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.active = active;
      this.email = email;
      this.password = password;
    }

    static fromInterface(userInterface: u): User {
      return new User(
        userInterface.id,
        userInterface.nombres,
        userInterface.apellidos,
        userInterface.activo,
        userInterface.correo,
        userInterface.contrasena
      );
    }
  }
  