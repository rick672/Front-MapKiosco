<script setup>
import { reactive, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import establecimientosValidationSchema from '@/schemas/establecimientosValidationSchema';

import { getCategorias } from '@/services/categoriaService';
import { registrarEstablecimiento } from '@/services/establecimientoService';

import Mapa from '@/components/Mapa.vue';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { notificacionToast } from '@/utils/alertUtil';


const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const categorias = ref([]);
const pond = ref(null);

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
    estado: 'Activo',
    categoria_id: 0,
});

const listarCategorias = async () => {
    try {
        const response = await getCategorias();
        categorias.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const actualizarCoordenadas = (posicion) => {
    datosEstablecimiento.latitud = posicion.lat;
    datosEstablecimiento.longitud = posicion.lng;   
};

const agregarImagen = (error, file) => {
    if (error) {
        return;
    } 
    datosEstablecimiento.imagen = file.file;
};

const quitarImagen = () => {
    datosEstablecimiento.imagen = null;
};

const procesarFormulario = async () => {
    const formData = new FormData();
    for (const key in datosEstablecimiento) {
        formData.append(key, datosEstablecimiento[key]);
    }
    try {
        const resultado = await registrarEstablecimiento(formData);

        notificacionToast(resultado.message);
        
        console.log(resultado);
    } catch (error) {
        console.error(error);
        alert('Error al registrar el establecimiento');
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
                <div class="col-lg-10 col-md-9 col-12">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-user-plus me-2"></i>Registrar establecimiento</h3>
                            <p>Registra tu establecimiento para que puedas encontrarlo y compartir tu información con otros.</p>
                        </div>
                        <div class="auth-card-body">
                            <Form 
                                id="registerForm"
                                v-slot="{ errors }"
                                :validation-schema="establecimientosValidationSchema"
                                @submit="procesarFormulario"
                            >
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="nombre" class="form-label">Nombre del establecimiento *</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-building"></i>
                                            </span>
                                            <Field type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre del establecimiento" v-model="datosEstablecimiento.nombre" required />
                                        </div>
                                        <ErrorMessage name="nombre" class="text-danger small" />
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="regLastName" class="form-label">Categoria *</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-list-ul"></i>
                                            </span>
                                            <Field as="Select" class="form-select" name="categoria_id" id="" v-model="datosEstablecimiento.categoria_id" required>
                                                <option :value="0">Seleccione una categoria</option>
                                                <option v-for="categoria in categorias" :value="categoria.id"
                                                    :key="categoria.id">
                                                    {{ categoria.nombre }}
                                                </option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="categoria_id" class="text-danger small" />
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="direccion" class="form-label">Dirección *</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </span>
                                            <Field type="text" class="form-control" id="direccion"
                                                placeholder="Dirección del establecimiento" name="direccion"
                                                v-model="datosEstablecimiento.direccion" required />
                                        </div>
                                        <ErrorMessage name="direccion" class="text-danger small" />
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <Mapa @obtener-coordenadas="actualizarCoordenadas" />

                                        <Field type="hidden" name="latitud" v-model="datosEstablecimiento.latitud" />
                                        <Field type="hidden" name="longitud" v-model="datosEstablecimiento.longitud" />

                                        <ErrorMessage name="latitud" class="text-danger small" />
                                        <ErrorMessage name="longitud" class="text-danger small" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="email" class="form-label">Correo electrónico *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <Field type="email" class="form-control" id="email" name="email" placeholder="correo@ejemplo.com" v-model="datosEstablecimiento.email" required />
                                        </div>
                                        <ErrorMessage name="email" class="text-danger small" />
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="telefono" class="form-label">Número de teléfono</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                            <Field type="tel" class="form-control" id="telefono" name="telefono" placeholder="(+591) 777 77 777" v-model="datosEstablecimiento.telefono" />
                                        </div>
                                        <ErrorMessage name="telefono" class="text-danger small" />
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
                                            <Field type="time" class="form-control" id="horario_apertura" name="horario_apertura" placeholder="00:00" v-model="datosEstablecimiento.horario_apertura" required />
                                        </div>
                                        <ErrorMessage name="horario_apertura" class="text-danger small" />
                                    </div>
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_cierre" class="form-label">
                                            Horario de cierre *
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-clock"></i>
                                            </span>
                                            <Field type="time" class="form-control" id="horario_cierre" name="horario_cierre" placeholder="00:00" v-model="datosEstablecimiento.horario_cierre" required />
                                        </div>
                                        <ErrorMessage name="horario_cierre" class="text-danger small" />
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="website" class="form-label">Sitio web</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </span>
                                            <Field type="text" class="form-control" id="website" placeholder="https://ejemplo.com" name="website" v-model="datosEstablecimiento.website" />
                                        </div>
                                        <ErrorMessage name="website" class="text-danger small" />
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="descripcion" class="form-label">Descripción</label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fas fa-pencil-alt"></i>
                                            </span>
                                            <Field as="textarea" name="descripcion" v-model="datosEstablecimiento.descripcion" id="descripcion" rows="4" class="form-control"></Field>
                                        </div>
                                        <ErrorMessage name="descripcion" class="text-danger small" />
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="descripcion" class="form-label">Imagen</label>
                                        <file-pond
                                            name="imagen"
                                            ref="pond"
                                            label-idle="Arrastra tu imagen aquí o haz click para seleccionar una imagen"
                                            v-bind:allow-multiple="false"
                                            max-file-size="2MB"
                                            @addfile="agregarImagen"
                                            @removefile="quitarImagen"
                                            accepted-file-types="image/jpeg, image/png, image/jpg, image/webp, image/avif"
                                        />
                                    </div>
                                </div>
                                <div class="form-check mb-4">
                                    <Field class="form-check-input" type="checkbox" id="agreeTerms" name="terminos_y_condiciones" required :value="true" :class="{ 'is-invalid': errors.terminos_y_condiciones, 'is-valid': !errors.terminos_y_condiciones }" />
                                    <label class="form-check-label" for="agreeTerms">
                                        Acepto los <a href="#" class="forgot-link">Terminos y Condiciones</a> y <a
                                            href="#" class="forgot-link">Política de Privacidad</a>
                                    </label>
                                    <br>
                                    <ErrorMessage name="terminos_y_condiciones" class="text-danger small" />
                                </div>
                                <button type="submit" class="btn-auth-submit w-100">
                                    <i class="fas fa-save"></i>
                                    Guardar
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>