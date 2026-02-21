<template>
  <q-layout view="hHh lpR fFf">
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
