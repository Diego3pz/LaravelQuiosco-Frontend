import Producto from "../components/Layout/Producto";
import useQuiosco from "../hooks/useQuiosco";


export default function Inicio() {

  const { productos, categoriaActual } = useQuiosco();
  const productosFiltrados = productos.filter(producto => producto.categoria_id === categoriaActual.id);

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
