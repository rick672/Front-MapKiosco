import * as yup from 'yup';

const establecimientosValidationSchema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    descripcion: yup.string().required('Introduzca una descripción').min(10, 'La descripción debe tener al menos 10 caracteres'),
    direccion: yup.string().required('Introduzca una dirección'),
    // imagen: yup.mixed().required('Seleccione una imagen'),
    telefono: yup.number().typeError('El número de teléfono debe ser un número'),
    email: yup.string().email('El correo electrónico no es válido'),
    website: yup.string().url('El sitio web no es válido'),
    horario_apertura: yup.string().required('Introduzca un horario de apertura'),
    horario_cierre: yup.string().required('Introduzca un horario de cierre'),
    latitud: yup.number().required('Introduzca una latitud en el mapa'),
    longitud: yup.number().required('Introduzca una longitud en el mapa'),
    categoria_id: yup.number().required('Seleccione una categoria').min(1, 'La categoria es obligatoria'),
    terminos_y_condiciones: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones').required('Debes aceptar los términos y condiciones'),
});

export default establecimientosValidationSchema;