import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import AuthLayout from './Layout/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Register from './views/Register'
import AdminLayout from './Layout/AdminLayout'
import Orders from './views/Orders'
import Products from './views/Products'

const router = createBrowserRouter([
    {
        path: '/', element: <Layout />,
        children: [
            { index: true, element: <Inicio /> }
        ]
    },
    {
        path: '/auth', element: <AuthLayout />,
        children: [
            { path: '/auth/login', element: <Login /> },
            { path: '/auth/register', element: <Register /> }
        ]
    },
    {
        path: '/admin', element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Orders />
            },
            {
                path: '/admin/products',
                element: <Products />
            }
        ]
    }
])

export default router