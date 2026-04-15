<script setup>
import { onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navegacion from '@/components/layouts/Navegacion.vue';
import Footer from './components/layouts/Footer.vue';

const route = useRoute();

const runAnimation = async () => {
    await nextTick();

    document.querySelectorAll('.anim').forEach(el => {
        el.classList.remove('anim-visible');
        void el.offsetWidth;
        el.classList.add('anim-visible');
    });
};

onMounted(() => {
    runAnimation(); // 🔥 primera carga

    watch(() => route.path, () => {
        runAnimation(); // 🔥 navegación
    });
});
</script>

<template>
    <Navegacion />
    <RouterView />
    <Footer />
</template>

<style scoped></style>
