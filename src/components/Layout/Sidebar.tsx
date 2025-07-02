import { useAuth } from "../../hooks/useAuth";
import useQuiosco from "../../hooks/useQuiosco";
import Categories from "./Categories";

export default function Sidebar() {
    const { categorias } = useQuiosco();
    const { logout, user } = useAuth({ middleware: 'auth', url: '/' });


    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img src="img/logo.svg" alt="logo-imagen"
                    className="w-40" />
            </div>
            <p className="my-10 text-xl text-center">Hola: {user?.name}</p>
            <div className=" mt-10">
                {categorias.map(categoria => (
                    <Categories key={categoria.id} categories={categoria} />
                ))}
            </div>

            <div className=" my-5 px-5">
                <button type="button"
                    className="text-center bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-700 transition-colors"
                    onClick={logout}>
                    Cancelar Pedido
                </button>
            </div>
        </aside>
    )
}
