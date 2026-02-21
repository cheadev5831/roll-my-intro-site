<template>
  <q-header elevated>
    <q-toolbar>
      <!-- 로고/이름 -->
      <q-toolbar-title class="text-weight-bold cursor-pointer" @click="scrollToTop">
        {{ profile.developer.nameEn }}
      </q-toolbar-title>

      <!-- 데스크톱 네비게이션 -->
      <div class="gt-sm">
        <q-btn
          v-for="nav in navItems"
          :key="nav.id"
          flat
          :label="nav.label"
          @click="scrollTo(nav.id)"
        />

        <!-- 다크모드 토글 -->
        <q-btn
          flat
          round
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="$q.dark.toggle()"
        />
      </div>

      <!-- 모바일 햄버거 메뉴 -->
      <div class="lt-md">
        <q-btn flat round icon="dark_mode" @click="$q.dark.toggle()" />
        <q-btn flat round icon="menu" @click="drawer = !drawer" />
      </div>
    </q-toolbar>
  </q-header>

  <!-- 모바일 드로어 -->
  <q-drawer v-model="drawer" side="right" overlay behavior="mobile">
    <q-list>
      <q-item
        v-for="nav in navItems"
        :key="nav.id"
        clickable
        v-ripple
        @click="scrollTo(nav.id); drawer = false"
      >
        <q-item-section>{{ nav.label }}</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import profile from 'src/data/profile';

const drawer = ref(false);

const navItems = [
  { id: 'about', label: '소개' },
  { id: 'skills', label: '기술 스택' },
  { id: 'experience', label: '경력' },
  { id: 'projects', label: '프로젝트' },
  { id: 'education', label: '학력' },
  { id: 'contact', label: '연락처' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
