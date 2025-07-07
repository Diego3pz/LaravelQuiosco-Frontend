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
    categories_id: z.number(),
    id: z.number(),
});

export type Producto = z.infer<typeof ProductoSchema>;

export const ProductoPedidoSchema = ProductoSchema.extend({
    cantidad: z.number(),
});

export type ProductoPedido = z.infer<typeof ProductoPedidoSchema>;

// User

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
});

export const RegisterResponseSchema = z.object({
    token: z.string(),
    user: UserSchema,
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export const ErrorResponseSchema = z.object({
    message: z.string(),
    errors: z.record(z.array(z.string())),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export type OrderProductPivot = {
    cantidad: number;
};

export type OrderProduct = {
    id: number;
    nombre: string;
    pivot: OrderProductPivot;
};

export type OrderUser = {
    id: number;
    name: string;
    email: string;
};

export type Order = {
    id: number;
    total: number;
    user: OrderUser;
    products: OrderProduct[];
};

// Para la respuesta paginada de la API
export type OrdersApiResponse = {
    data: Order[];
    // Puedes agregar más campos si tu paginación los incluye (links, meta, etc.)
};