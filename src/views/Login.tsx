import { Link } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import Alerta from "../components/AuthLayout/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const [errores, setErrores] = useState<string[]>([]);
    const [loading, setLoading] = useState(false); 

    const { login } = useAuth({
        middleware: 'guest',
        url: '/',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const datos = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        };

        await login({ datos, setErrores, setLoading });
    };

    useEffect(() => {
        if (!loading) return;

        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            
            const timer = setTimeout(() => {
                setLoading(false);
            }, 100); 
            return () => clearTimeout(timer);
        }
    }, [loading]);


    return (
        <>
            <div className="text-4xl font-black">Iniciar Sesión</div>
            <p>Para crear un pedido debes iniciar sesión</p>

            <div className="bg-white shadow-md rounded-md  px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="email">
                            Email:
                        </label>
                        <input type="email" id="email"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Tu Email"
                            ref={emailRef} />
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="password">
                            Password:
                        </label>
                        <input type="password" id="password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Tu Password"
                            ref={passwordRef} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer transition-colors flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Iniciando...
                            </>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </button>
                </form>
            </div>

            <nav className="mt-5 lg:flex lg:justify-between uppercase font-bold">
                <Link to="/auth/register"
                    className="flex gap-1 text-center my-5 group text-slate-500 hover:text-slate-600  text-sm transition-colors">
                    ¿No tienes una cuenta?
                    <p className=" group text-orange-600 group-hover:text-orange-700 transition-colors">
                        Regístrate
                    </p>
                </Link>
                <Link to="/forgot-password"
                    className="flex gap-1 text-center my-5 group text-slate-500 hover:text-slate-600  text-sm transition-colors">
                    Olvidé mi
                    <p className="group text-orange-600 group-hover:text-orange-700 transition-colors">
                        password
                    </p>
                </Link>
            </nav>
        </>
    )
}
