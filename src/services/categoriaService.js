import api from './api';

export const getCategorias = async () => {
    const response = await api.get('/categorias');
    return response.data;
};