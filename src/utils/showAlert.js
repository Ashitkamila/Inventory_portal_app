import Swal from "sweetalert2";

export const showAlert = (iconSymbol, message) => {
  {
    return Swal.fire({
      icon: iconSymbol,
      text: message,
      container: "swal2container",
    });
  }
};
