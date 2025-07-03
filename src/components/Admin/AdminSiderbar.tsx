import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminSiderbar() {
    const { logout } = useAuth({ middleware: 'auth', url: '/' });

    return (
        <aside className=" md:w-72 h-screen">
            <div className="p-4">
                <img src="/img/logo.svg" alt="imagen_logotipo" className="w-40" />
            </div>
            <nav className=" flex flex-col p-4">
                <Link to={'/admin'} className=" font-bold text-lg">Ordenes</Link>
                <Link to={'/admin/products'} className=" font-bold text-lg">Productos</Link>
            </nav>

            <div className=" my-5 py-5 ">
                <button type="button"
                    className="text-center bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-700 transition-colors"
                    onClick={logout}>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    )
}
