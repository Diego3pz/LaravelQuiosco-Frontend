import useSWR from "swr"
import clienteAxios from "../config/axios"
import Producto from "../components/Layout/Producto"
import type { Producto as ProductoType } from "../Types"

export default function Products() {
  const token = localStorage.getItem('AUTH_TOKEN')
  const url = '/products'
  const fetcher = (url: string) => clienteAxios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data)

  const { data, isLoading } = useSWR<{ data: ProductoType[] }>(url, fetcher, {
    refreshInterval: 10000
  })
  if (isLoading) return <p className="text-2xl">Cargando...</p>

  console.log(data);


  if (data) return (
    <div>
      <h1 className=" text-4xl font-black">Productos</h1>
      <p className=" text-2xl my-10">
        Maneja la disponibilidad desde aquí.
      </p>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.data.map((producto) => (
          <Producto key={producto.id} producto={producto} botonDisponible={true} />
        ))}
      </div>
    </div>
  )
}
