import { formatCurrency } from "../../helpers";
import useQuiosco from "../../hooks/useQuiosco";
import type { ProductoPedido } from "../../Types";


export default function ResumenProducto({ producto }: { producto: ProductoPedido }) {

    const { handleEditarCantidad, handleEliminarProductoPedido } = useQuiosco();
    const { id, nombre, precio, cantidad, imagen } = producto

    return (
        <div className="shadow space-y-1 p-4 bg-white flex flex-col gap-4">
            <img
                src={`/img/${imagen}.jpg`}
                alt={`Imagen de ${nombre}`}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
                <div className="space-y-2">
                    <p className="text-xl font-bold">{nombre}</p>
                    <p className="text-lg font-bold">Cantidad: {cantidad}</p>
                    <p className="text-lg font-bold text-amber-500">
                        Precio: {formatCurrency(precio)}
                    </p>
                    <p className="text-lg text-gray-700">
                        Subtotal: {formatCurrency(precio * cantidad)}
                    </p>
                </div>
                <div className="flex justify-between gap-2 pt-4">
                    <button
                        type="button"
                        className="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
                        onClick={() => handleEditarCantidad(id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
                        onClick={() => handleEliminarProductoPedido(id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
