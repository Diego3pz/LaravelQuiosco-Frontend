import useQuiosco from "../../hooks/useQuiosco";
import Categories from "./Categories";

export default function Sidebar() {
    const { categorias } = useQuiosco();
    
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img src="img/logo.svg" alt="logo-imagen"
                    className="w-40" />
            </div>

            <div className=" mt-10">
                {categorias.map(categoria => (
                    <Categories key={categoria.id} categories={categoria} />
                ))}
            </div>

            <div className=" my-5 px-5">
                <button type="button"
                className="text-center bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-700 transition-colors">
                    Cancelar Pedido
                </button>
            </div>
        </aside>
    )
}
