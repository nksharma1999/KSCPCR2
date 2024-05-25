import { toast } from "react-toastify";

export const LoadingToast = (msg = "Processing...") => {
  return toast.loading(msg);
};

export const UpdateToastInfo = (id: any, msg: string, type: any) => {
  toast.update(id, {
    // position: "top-center",
    render: msg,
    type: type,
    isLoading: false,
    autoClose: 1000,
  });
};

export const WarningToast = (msg: string) => {
  toast.warn(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const InfoToast = (msg: string) => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
