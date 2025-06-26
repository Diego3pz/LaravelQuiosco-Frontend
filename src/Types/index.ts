import { z } from "zod";


// Categorias
export const CategoriaSchema = z.object({
    icono: z.string(),
    nombre: z.string(),
    id: z.number(),
});

export type Categoria = z.infer<typeof CategoriaSchema>;

// Productos
export const ProductoSchema = z.object({
    nombre: z.string(),
    precio: z.number(),
    imagen: z.string(),
    categoria_id: z.number(),
    id: z.number(),
});

export type Producto = z.infer<typeof ProductoSchema>;

export const ProductoPedidoSchema = ProductoSchema.extend({
    cantidad: z.number(),
});

export type ProductoPedido = z.infer<typeof ProductoPedidoSchema>;