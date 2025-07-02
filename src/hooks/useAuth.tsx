import { isAxiosError } from "axios";
import clienteAxios from "../config/axios";
import { RegisterResponseSchema } from "../Types";

type UseAuthParams = {
    middleware: string;
    url: string;
};


export const useAuth = ({ middleware, url }: UseAuthParams) => {
    console.log(`Using middleware: ${middleware} and URL: ${url}`);


    interface LoginData {
        email: string | undefined;
        password: string | undefined;
    }
    interface SetErrores {
        (errores: string[]): void;
    }

    const login = async ({ datos, setErrores }: { datos: LoginData; setErrores: SetErrores }) => {

        try {
            const { data } = await clienteAxios.post<LoginData>('/login', datos);
            const parsed = RegisterResponseSchema.parse(data);
            localStorage.setItem('AUTH_TOKEN', parsed.token)
            setErrores([]);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setErrores(Object.values(error.response.data.errors));
            }
        }
    }

    const register = () => {

    }
    const logout = () => {

    }

    return {
        login, register, logout
    }
}