import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Categoria, Producto, ProductoPedido } from "../Types";
import { categorias as categoriasDB } from "../data/categories";
import { productos as productosDB } from "../data/products";
import { toast } from "react-toastify";

interface QuioscoContextType {
    categorias: Categoria[];
    productos: Producto[];
    producto: Producto;
    pedido: ProductoPedido[];
    categoriaActual: Categoria;
    total: number;
    handleSetProducto: (producto: Producto) => void;
    handleClickCategoria: (id: number) => void;
    handleClickModal: () => void;
    handleAgregarPedido: (producto: ProductoPedido) => void;
    handleEditarCantidad: (id: number) => void;
    handleEliminarProductoPedido: (id: number) => void;
    modal: boolean;
}

interface QuioscoProviderProps {
    children: ReactNode;
}

const QuioscoContext = createContext<QuioscoContextType>({
    categorias: [],
    productos: [],
    pedido: [],
    producto: {} as Producto,
    categoriaActual: categoriasDB[0],
    modal: false,
    total: 0,
    handleSetProducto: () => { },
    handleClickCategoria: () => { },
    handleEditarCantidad: () => { },
    handleClickModal: () => { },
    handleAgregarPedido: () => { },
    handleEliminarProductoPedido: () => { }
});

const QuioscoProvider = ({ children }: QuioscoProviderProps) => {
    const [categorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [producto, setProducto] = useState<Producto>({} as Producto);
    const [productos] = useState(productosDB);
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState<ProductoPedido[]>([]);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = (id: number) => {
        const categoria = categorias.filter(cat => cat.id === id)[0];
        setCategoriaActual(categoria);
    };

    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleSetProducto = (producto: Producto) => {
        setProducto(producto);
    }

    const handleAgregarPedido = (producto: ProductoPedido) => {
        if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map((pedidoState) => pedidoState.id === producto.id ? producto : pedidoState);
            setPedido(pedidoActualizado);
            toast.info(`Pedido actualizado`)
        } else {
            setPedido([...pedido, producto]);
            toast.success(`Agregado al pedido`)
        }
    };

    const handleEditarCantidad = (id: number) => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = (id: number) => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    return (
        <QuioscoContext.Provider value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            productos,
            producto,
            handleSetProducto,
            modal,
            pedido,
            total,
            handleClickModal,
            handleAgregarPedido,
            handleEditarCantidad,
            handleEliminarProductoPedido
        }}>
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider };
export default QuioscoContext;