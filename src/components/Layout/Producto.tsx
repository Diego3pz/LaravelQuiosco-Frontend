import type { Producto } from "../../Types"
import { formatCurrency } from '../../helpers'
import useQuiosco from "../../hooks/useQuiosco";

interface ProductoProps {
    producto: Producto;
}

export default function Producto({ producto }: ProductoProps) {
    const { handleClickModal, handleSetProducto } = useQuiosco();
    const { nombre, precio, imagen } = producto;


    return (
        <div className="border p-3 shadow-white bg-gray-50">
            <img src={`/img/${imagen}.jpg`} alt={`Imagen-${nombre}`}
                className=" w-full" />
            <div className=" p-5">
                <h3 className=" text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(precio)}
                </p>
                <button type="button" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold transition-colors"
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}>
                    Agregar
                </button>
            </div>
        </div>
    )
}
