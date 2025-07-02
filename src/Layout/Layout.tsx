import { Outlet } from "react-router-dom";
import ReactModal from "react-modal"
import Sidebar from "../components/Layout/Sidebar";
import Resumen from "../components/Layout/Resumen";
import useQuiosco from "../hooks/useQuiosco";
import ModalProduct from "../components/Layout/ModalProduct";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

export default function Layout() {
  const { modal } = useQuiosco();
  const { user, error } = useAuth({ middleware: 'auth', url: '/' });

  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>

        <Resumen />
      </div>

      <ReactModal isOpen={modal} style={customStyles}>
        <ModalProduct />
      </ReactModal>

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
