<script setup lang="ts">
import { ref } from 'vue';
import PhaserGame from './game/PhaserGame.vue';

const phaserRef = ref();

</script>

<template>
    <PhaserGame ref="phaserRef" />
</template>
