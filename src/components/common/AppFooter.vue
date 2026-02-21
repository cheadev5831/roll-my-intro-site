<template>
  <q-footer class="text-center q-py-md">
    <div class="text-caption text-grey">
      © {{ currentYear }} {{ profile.developer.nameEn }}. Made with
      <q-icon name="favorite" size="xs" color="negative" />
      using Vue 3 + Quasar.
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import profile from 'src/data/profile';

const currentYear = new Date().getFullYear();
</script>
