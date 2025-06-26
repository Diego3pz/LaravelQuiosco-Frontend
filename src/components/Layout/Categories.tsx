import useQuiosco from '../../hooks/useQuiosco';
import type { Categoria } from '../../Types';

interface CategoriesProps {
    categories: Categoria;
}

export default function Categories({ categories }: CategoriesProps) {
    const { id, nombre, icono } = categories;
    const { handleClickCategoria, categoriaActual } = useQuiosco();

    const isActive = () => categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'

    return (
        <div className={`${isActive()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 transition-colors cursor-pointer`} onClick={() => handleClickCategoria(id)} >
            <img src={`/img/icono_${icono}.svg`} alt="imagen-icono"
                className=" w-12" />
            <p className=" text-lg font-bold cursor-pointer truncate">
                {nombre}
            </p>
        </div>
    )
}
