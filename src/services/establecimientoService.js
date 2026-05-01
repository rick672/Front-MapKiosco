import api from "./api";

export const registrarEstablecimiento = async (datosEstablecimiento) => {
    try {
        const response = await api.post('/establecimientos', datosEstablecimiento);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};