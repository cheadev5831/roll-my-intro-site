<template>
  <section class="hero-section full-height flex flex-center">
    <div class="text-center q-px-md">
      <!-- 이름 -->
      <h1 class="text-h2 text-weight-bold q-mb-sm">
        {{ profile.developer.name }}
      </h1>
      <p class="text-h5 text-grey q-mb-md">
        {{ profile.developer.title }}
      </p>

      <!-- 한 줄 소개 -->
      <p class="text-body1 q-mb-xl" style="max-width: 600px; margin: 0 auto">
        {{ profile.developer.tagline }}
      </p>

      <!-- CTA 버튼 -->
      <div class="q-gutter-sm">
        <q-btn
          v-for="social in visibleSocials"
          :key="social.label"
          :href="social.url"
          target="_blank"
          :icon="social.icon"
          :label="social.label"
          outline
          rounded
          no-caps
        />
      </div>

      <!-- 스크롤 다운 힌트 -->
      <div class="q-mt-xl">
        <q-btn flat round icon="keyboard_arrow_down" @click="scrollToAbout" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import profile from 'src/data/profile';

const visibleSocials = computed(() => profile.developer.social.filter((s) => s.visible !== false));

function scrollToAbout() {
  const el = document.getElementById('about');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
}
</style>
