<template>
  <q-layout view="hHh lpR fFf" class="main-layout">
    <!-- 상단 고정 네비게이션 바 -->
    <AppHeader />

    <!-- 메인 콘텐츠 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- 푸터 -->
    <AppFooter />
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from 'components/common/AppHeader.vue';
import AppFooter from 'components/common/AppFooter.vue';
</script>

<style lang="scss" scoped>
.main-layout {
  background: var(--bg-page) !important;
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}
</style>
