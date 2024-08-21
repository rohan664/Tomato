import { toast} from "react-toastify";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

function successToast(toastContent) {
    toast.success(toastContent, toastOptions)
}

function errorToast(toastContent) {
    toast.error(toastContent, toastOptions)
}

export { successToast, errorToast } 
