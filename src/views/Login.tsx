import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import Alerta from "../components/AuthLayout/Alerta";
import { useAuth } from "../hooks/useAuth";


export default function Login() {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const [errores, setErrores] = useState<string[]>([])

    const { login } = useAuth({
        middleware: 'guest',
        url: '/',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const datos = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }

        login({datos, setErrores})

    }

    console.log(errores);


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


                    <input type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer transition-colors" />
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
