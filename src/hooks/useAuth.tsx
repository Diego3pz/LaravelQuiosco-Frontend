import { isAxiosError } from "axios";
import clienteAxios from "../config/axios";
import { RegisterResponseSchema } from "../Types";
import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

type UseAuthParams = {
    middleware: string;
    url: string;
};


export const useAuth = ({ middleware, url }: UseAuthParams) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN');

    const { data: user, error, mutate, isLoading } = useSWR('/user', () =>
        clienteAxios.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.data)
            .catch(err => {
                throw Error(err?.response?.data?.errors);
            })
    );

    interface LoginData {
        email: string | undefined;
        password: string | undefined;
    }

    interface SetErrores {
        (errores: string[]): void;
    }

    const login = async ({ datos, setErrores, setLoading }: { datos: LoginData; setErrores: SetErrores; setLoading: (loading: boolean) => void }) => {
        try {
            const { data } = await clienteAxios.post('/login', datos);
            const parsed = RegisterResponseSchema.parse(data);
            localStorage.setItem('AUTH_TOKEN', parsed.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setErrores(Object.values(error.response.data.errors));
            }
            setLoading(false);
        }
    };

    const register = async ({ datos, setErrores, setLoading }: { datos: LoginData; setErrores: SetErrores; setLoading: (loading: boolean) => void }) => {
        try {
            const { data } = await clienteAxios.post('/register', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setErrores(Object.values(error.response.data.errors));
            }
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw Error(error.response.data?.errors);
            } else {
                throw error;
            }
        }
    }

    useEffect(() => {
        if (isLoading) return; // Espera a que termine la validación
        if (middleware === 'guest' && user) {
            navigate(url, { replace: true });
        }
        if (middleware === 'auth' && error) {
            navigate('/auth/login', { replace: true });
        }
    }, [user, error, isLoading]);

    return {
        user,
        error,
        login,
        register,
        logout,
    };
};
