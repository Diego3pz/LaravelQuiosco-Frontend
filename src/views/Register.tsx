import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/AuthLayout/Alerta";
import { RegisterResponseSchema } from "../Types";
import { isAxiosError } from "axios";


export default function Register() {
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const passwordConfirmationRef = createRef<HTMLInputElement>();

    const [errores, setErrores] = useState<string[]>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const datos = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value

        }

        try {
            const { data } = await clienteAxios.post('/register', datos);
            const parsed = RegisterResponseSchema.parse(data);
            console.log(parsed.token);

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setErrores(Object.values(error.response.data.errors));
            }
        }
    }

    return (
        <>
            <div className="text-4xl font-black">Crea tu cuenta</div>
            <p>Crea tu cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate>
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="name">
                            Nombre:
                        </label>
                        <input type="text" id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Tu Nombre"
                            ref={nameRef} />
                    </div>

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

                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="password_confirmation">
                            Repetir Password:
                        </label>
                        <input type="password" id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Repetir Password"
                            ref={passwordConfirmationRef} />
                    </div>

                    <input type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer transition-colors" />
                </form>
            </div>

            <nav className="mt-5 lg:flex lg:justify-between uppercase font-bold">
                <Link to="/auth/login"
                    className="flex gap-1 text-center my-5 group text-slate-500 hover:text-slate-600  text-sm transition-colors">
                    ¿Ya tienes una cuenta?
                    <p className=" group text-orange-600 group-hover:text-orange-700 transition-colors">
                        Ingresar
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
