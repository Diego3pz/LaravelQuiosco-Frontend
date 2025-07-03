import { Outlet } from "react-router-dom";
import AdminSiderbar from "../components/Admin/AdminSiderbar";
import { useAuth } from "../hooks/useAuth";
import { Bounce, ToastContainer } from "react-toastify";

export default function AdminLayout() {
    useAuth({ middleware: 'admin', url: '/admin' });

    return (
        <>
            <div className="md:flex">
                <AdminSiderbar />
                <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
                    <Outlet />
                </main>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
                transition={Bounce}
            />
        </>
    )
}
