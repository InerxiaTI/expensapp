import { useState } from "react"
import expenseMateApi from "../infrastructure/api/expenseMateApi"
import { User, UserLoggedResponse, UserLoginRequest } from "../interfaces/UserInterface"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState<User>()
    console.log("2. uselogin");


    const validateUser = async (correo: string, pass: string) => {

        const request: UserLoginRequest = {
            email:correo,
            pass
        }

        console.log("3. request login: " + JSON.stringify(request));


        try {
            console.log("4.");

            const response = await expenseMateApi.post<UserLoggedResponse>(
                '/usuario/login',
                request
            )
            console.log("5.");
            console.log("response: "+JSON.stringify(response.data.body));
            if (response.status === 200 || response.status === 201) {
                console.log("5.1");

                setUserData(response.data.body)
            }
            console.log("5.2");


            return response


        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.info(JSON.stringify(error.response.data)+" ....");
            }
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        userData,
        validateUser
    }


}
