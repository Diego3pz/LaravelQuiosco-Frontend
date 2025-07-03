import useSWR from "swr";
import clienteAxios from "../config/axios";
import { formatCurrency } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";


export default function Orders() {
    const { handleClickCompletarPedido } = useQuiosco();

    const token = localStorage.getItem('AUTH_TOKEN');
    const url = '/orders';
    const fetcher = (url: string) => clienteAxios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const { data, isLoading } = useSWR(url, fetcher, {
        refreshInterval:1000
    });

    if (isLoading) {
        return <p className="text-center text-xl">Cargando...</p>;
    }

    if (data) return (
        <div>
            <h1 className=" text-4xl font-black">
                Ordenes
            </h1>

            <p className=" text-2xl my-10">
                Administra las ordenes desde aquí.
            </p>

            <div className="grid grid-cols-2 gap-5">
                {data.data.data.map((order: any) => (
                    <div key={order.id} className="border-b p-5 bg-white space-y-2">
                        <p className=" text-xl font-bold text-slate-600">Contenido del pedido:</p>
                        {order.products.map((products: any) => (
                            <div key={products.id} className="border-b border-slate-200 last-of-type:border-none py-4">
                                <p>{products.nombre}</p>
                                <p>
                                    Cantidad : {' '}
                                    <span className="font-bold">{products.pivot.cantidad}</span>
                                </p>
                            </div>
                        ))}

                        <p className=" text-lg font-bold text-slate-600">
                            Cliente:{" "}<span className="font-normal">{order.user.name}</span>
                        </p>

                        <p className=" text-lg font-bold text-amber-500">
                            Total a pagar:{" "}<span className="font-normal text-slate-600">{formatCurrency(order.total)}</span>
                        </p>

                        <button type="button"
                            className='bg-indigo-600 hover:bg-indigo-800 cursor-pointer px-5 py-2 text-white uppercase font-bold w-full transition-colors rounded'
                            onClick={() => handleClickCompletarPedido(order.id)}
                        >
                            Confirmar pedido
                        </button>
                    </div>
                ))}
            </div>
        </div >
    )
    return (
        <div>
            <h1 className=" text-4xl font-black">
                Ordenes
            </h1>

            <p className=" text-2xl my-10">
                Administra las ordenes desde aquí.
            </p>

            <p>No hay ordenes disponibles.</p>
        </div>
    );
}
