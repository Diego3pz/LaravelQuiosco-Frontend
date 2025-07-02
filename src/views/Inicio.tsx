import useSWR from "swr";
import Producto from "../components/Layout/Producto";
import clienteAxios from "../config/axios";
import useQuiosco from "../hooks/useQuiosco";
import type { Categoria, ProductoPedido } from "../Types";


export default function Inicio() {

  const { categoriaActual } = useQuiosco();

  const fetcher = () => clienteAxios.get('/products').then(res => res.data.data);
  const { data, isLoading } = useSWR('/products', fetcher, {
    refreshInterval: 1000
  });

  if (isLoading || !categoriaActual?.id) {
    return <p className="text-center text-xl">Cargando...</p>;
  }

  const productosFiltrados = (data as ProductoPedido[]).filter(
    (producto) => producto.categories_id === (categoriaActual as Categoria).id
  );

  return (
    <>
      <h1 className=" text-4xl font-black">
        {categoriaActual?.nombre}
      </h1>

      <p className=" text-2xl my-10">
        Elige tu pedido a continuación
      </p>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {productosFiltrados.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  )
}
