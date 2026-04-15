<script setup>
import { reactive, onMounted, ref } from 'vue';

import { getCategorias } from '@/services/categoriaService';
import Mapa from '@/components/Mapa.vue';

const categorias = ref([]);

const datosEstablecimiento = reactive({
    nombre: '',
    descripcion: '',
    direccion: '',
    imagen: '',
    telefono: '',
    email: '',
    website: '',
    horario_apertura: '',
    horario_cierre: '',
    latitud: '',
    longitud: '',
    estado: '',
    categoria_id: '',
});

const listarCategorias = async () => {
    try {
        const response = await getCategorias();
        categorias.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    listarCategorias();
});

</script>
<template>
    <!-- ==================== REGISTER SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-md-9">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-user-plus me-2"></i>Create Account</h3>
                            <p>Join us today! Fill in the form below to get started.</p>
                        </div>
                        <div class="auth-card-body">
                            <form id="registerForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="nombre" class="form-label">Nombre del establecimiento *</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-building"></i>
                                            </span>
                                            <input type="text" class="form-control" id="nombre"
                                                placeholder="Nombre del establecimiento"
                                                v-model="datosEstablecimiento.nombre" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="regLastName" class="form-label">Categoria *</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-list-ul"></i>
                                            </span>
                                            <select class="form-select" name="" id=""
                                                v-model="datosEstablecimiento.categoria_id" required>
                                                <option value="">Seleccione una categoria</option>
                                                <option v-for="categoria in categorias" :value="categoria.id"
                                                    :key="categoria.id">
                                                    {{ categoria.nombre }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="direccion" class="form-label">Dirección *</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </span>
                                            <input type="text" class="form-control" id="direccion"
                                                placeholder="Dirección del establecimiento" name="direccion"
                                                v-model="datosEstablecimiento.direccion" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <Mapa />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="email" class="form-label">Correo electrónico *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <input type="email" class="form-control" id="email" name="email" placeholder="correo@ejemplo.com" v-model="datosEstablecimiento.email" required>
                                        </div>
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="telefono" class="form-label">Número de teléfono</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                            <input type="tel" class="form-control" id="telefono" name="telefono" placeholder="(+591) 777 77 777" v-model="datosEstablecimiento.telefono">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_apertura" class="form-label">
                                            Horario de apertura *
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-clock"></i>
                                            </span>
                                            <input type="time" class="form-control" id="horario_apertura" name="horario_apertura" placeholder="00:00" v-model="datosEstablecimiento.horario_apertura" required>
                                        </div>
                                    </div>
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_cierre" class="form-label">
                                            Horario de cierre *
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-clock"></i>
                                            </span>
                                            <input type="time" class="form-control" id="horario_cierre" name="horario_cierre" placeholder="00:00" v-model="datosEstablecimiento.horario_cierre" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="website" class="form-label">Sitio web</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </span>
                                            <input type="text" class="form-control" id="website" placeholder="https://ejemplo.com" name="website" v-model="datosEstablecimiento.website">
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="descripcion" class="form-label">Descripción</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-pencil-alt"></i>
                                            </span>
                                            <textarea name="descripcion" v-model="datosEstablecimiento.descripcion" id="descripcion" rows="4" class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                                    <label class="form-check-label" for="agreeTerms">
                                        Acepto los <a href="#" class="forgot-link">Terminos y Condiciones</a> y <a
                                            href="#" class="forgot-link">Política de Privacidad</a>
                                    </label>
                                </div>
                                <button type="submit" class="btn-auth-submit w-100">
                                    <i class="fas fa-save"></i>
                                    Guardar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>