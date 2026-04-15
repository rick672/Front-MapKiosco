<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const map = ref(null);

const inicializarMapa = async () => {
    if (map.value) {
        map.value.remove();
    }

    map.value = L.map('map-canvas').setView([-34.6037, -58.3816], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map.value);

    const marker = L.marker([-34.6037, -58.3816],{
        draggable: true,
    }).addTo(map.value);

    marker.on('dragend', function(evento) {
        const posicion = evento.target.getLatLng();
        console.log(posicion);
    });

};

onMounted(() => {
    inicializarMapa();
});

</script>

<template>
    <!-- ==================== MAP BANNER ==================== -->
    <section class="map-banner" id="mapBanner">
        <div id="map-canvas">

        </div>
        <button class="map-fullscreen-btn" id="mapToggleBtn" title="Toggle Fullscreen Map">
            <i class="fas fa-expand"></i>
        </button>
    </section>
</template>

<style scoped>
#map-canvas {
    width: 100%;
    min-height: 500px;
}
</style>