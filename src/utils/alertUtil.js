import Swal from 'sweetalert2';

export const notificacionToast = (texto, tipo = 'success') => {

    const tipoColor = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-info',
        question: 'bg-question',
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        customClass:{
            timerProgressBar: tipoColor[tipo] || 'bg-success',
        },
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
    
    Toast.fire({
        icon: tipo,
        title: texto,
    });
};