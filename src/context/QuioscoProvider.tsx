import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Categoria, Producto, ProductoPedido } from "../Types";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

interface QuioscoContextType {
    categorias: Categoria[];      // <-- Agrega esto
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
    pedido: [],
    producto: {} as Producto,
    categoriaActual: {} as Categoria,
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
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaActual, setCategoriaActual] = useState({} as Categoria);
    const [producto, setProducto] = useState<Producto>({} as Producto);
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState<ProductoPedido[]>([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const getCategories = async () => {
        try {
            const { data } = await clienteAxios.get("/categories");
            setCategorias(data.data)
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

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
            handleClickCategoria,     // <-- Agrega esto
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