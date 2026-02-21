<template>
  <!-- 스크롤 진행률 바 -->
  <div class="scroll-progress" :style="{ width: scrollProgress + '%' }" />

  <q-header class="app-header" :class="{ 'app-header--scrolled': isScrolled }">
    <q-toolbar class="app-toolbar q-mx-auto" style="max-width: 1280px">
      <!-- 로고 -->
      <q-toolbar-title class="logo-wrap" @click="scrollToTop">
        <span class="logo-bracket">&lt;</span>
        <span class="logo-name">{{ profile.developer.nameEn }}</span>
        <span class="logo-bracket">/&gt;</span>
      </q-toolbar-title>

      <!-- 데스크톱 네비게이션 (md+) -->
      <nav class="gt-sm desktop-nav">
        <button
          v-for="nav in navItems"
          :key="nav.id"
          class="nav-btn"
          :class="{ 'nav-btn--active': activeSection === nav.id }"
          @click="scrollTo(nav.id)"
        >
          {{ nav.label }}
        </button>

        <!-- 다크모드 토글 -->
        <q-btn
          flat
          round
          dense
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          class="dark-toggle q-ml-sm"
          @click="$q.dark.toggle()"
        >
          <q-tooltip>{{ $q.dark.isActive ? '라이트 모드' : '다크 모드' }}</q-tooltip>
        </q-btn>
      </nav>

      <!-- 모바일 (lt-md) -->
      <div class="lt-md row items-center q-gutter-xs">
        <q-btn
          flat
          round
          dense
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          class="dark-toggle"
          @click="$q.dark.toggle()"
        />
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="menu-btn"
          @click="drawer = !drawer"
        />
      </div>
    </q-toolbar>
  </q-header>

  <!-- 모바일 드로어 -->
  <q-drawer
    v-model="drawer"
    side="right"
    overlay
    behavior="mobile"
    class="mobile-drawer"
  >
    <!-- 드로어 헤더 -->
    <div class="drawer-header q-pa-lg">
      <div class="text-h6 logo-wrap" @click="scrollToTop; drawer = false">
        <span class="logo-bracket">&lt;</span>
        <span class="logo-name">{{ profile.developer.nameEn }}</span>
        <span class="logo-bracket">/&gt;</span>
      </div>
      <q-btn flat round dense icon="close" @click="drawer = false" />
    </div>

    <q-separator />

    <!-- 드로어 네비게이션 -->
    <q-list class="drawer-list q-pt-sm">
      <q-item
        v-for="(nav, i) in navItems"
        :key="nav.id"
        clickable
        v-ripple
        class="drawer-item"
        :class="{ 'drawer-item--active': activeSection === nav.id }"
        :style="{ animationDelay: i * 0.05 + 's' }"
        @click="scrollTo(nav.id); drawer = false"
      >
        <q-item-section avatar>
          <q-icon :name="nav.icon" size="sm" class="drawer-icon" />
        </q-item-section>
        <q-item-section class="drawer-label">{{ nav.label }}</q-item-section>
        <q-item-section side v-if="activeSection === nav.id">
          <q-icon name="chevron_right" size="xs" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- 드로어 푸터 -->
    <div class="drawer-footer q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-btn
          v-for="social in visibleSocials"
          :key="social.label"
          flat
          round
          dense
          :icon="social.icon"
          :href="social.url"
          target="_blank"
          class="social-icon-btn"
          size="sm"
        >
          <q-tooltip>{{ social.label }}</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import profile from 'src/data/profile';

const drawer = ref(false);
const isScrolled = ref(false);
const scrollProgress = ref(0);
const activeSection = ref('hero');

const navItems = [
  { id: 'about',      label: '소개',      icon: 'person'          },
  { id: 'skills',     label: '기술 스택', icon: 'code'            },
  { id: 'experience', label: '경력',      icon: 'work'            },
  { id: 'projects',   label: '프로젝트',  icon: 'folder_special'  },
  { id: 'education',  label: '학력',      icon: 'school'          },
  { id: 'contact',    label: '연락처',    icon: 'email'           },
];

const visibleSocials = computed(() =>
  profile.developer.social.filter((s) => s.visible !== false)
);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateScroll() {
  const scrollY = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;

  isScrolled.value = scrollY > 40;
  scrollProgress.value = docH > 0 ? Math.min((scrollY / docH) * 100, 100) : 0;

  // 활성 섹션 감지
  const sectionIds = ['hero', ...navItems.map((n) => n.id)];
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i]);
    if (el && el.getBoundingClientRect().top <= 100) {
      activeSection.value = sectionIds[i];
      break;
    }
  }
}

onMounted(() => window.addEventListener('scroll', updateScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', updateScroll));
</script>

<style lang="scss" scoped>
// ── 헤더 ─────────────────────────────────────
.app-header {
  background: transparent !important;
  backdrop-filter: none;
  box-shadow: none !important;
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;

  &--scrolled {
    background: var(--glass-bg) !important;
    backdrop-filter: var(--glass-blur) !important;
    -webkit-backdrop-filter: var(--glass-blur) !important;
    border-bottom: 1px solid var(--glass-border) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08) !important;
  }
}

.app-toolbar {
  height: 64px;
  padding: 0 24px;

  @media (max-width: 599px) {
    padding: 0 16px;
  }
}

// ── 로고 ─────────────────────────────────────
.logo-wrap {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.8; }
}

.logo-bracket {
  color: $primary;
  font-weight: 700;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
}

.logo-name {
  color: var(--text-primary);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 2px;
}

// ── 데스크톱 네비게이션 ───────────────────────
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-btn {
  position: relative;
  background: none;
  border: none;
  padding: 6px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 20px;
    height: 2px;
    background: var(--gradient-primary);
    border-radius: 1px;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: var(--text-primary);
    background: rgba(79, 70, 229, 0.06);
  }

  &--active {
    color: $primary;
    font-weight: 600;

    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
}

.dark-toggle {
  color: var(--text-secondary) !important;
  transition: color 0.2s ease, transform 0.3s ease !important;

  &:hover {
    color: $primary !important;
    transform: rotate(20deg);
  }
}

.menu-btn {
  color: var(--text-secondary) !important;
}

// ── 모바일 드로어 ─────────────────────────────
.mobile-drawer {
  background: var(--bg-page) !important;
  width: 280px !important;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
}

.drawer-list {
  padding: 8px;
}

.drawer-item {
  border-radius: 12px;
  margin-bottom: 2px;
  min-height: 52px;
  transition: background 0.2s ease, color 0.2s ease;

  &--active {
    background: rgba(79, 70, 229, 0.08) !important;

    .drawer-label {
      color: $primary;
      font-weight: 600;
    }
    .drawer-icon {
      color: $primary !important;
    }
  }

  &:hover {
    background: rgba(79, 70, 229, 0.05) !important;
  }
}

.drawer-icon {
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.drawer-label {
  font-size: 0.95rem;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--border-color);
}

.social-icon-btn {
  color: var(--text-secondary) !important;
  transition: color 0.2s ease, transform 0.2s ease !important;

  &:hover {
    color: $primary !important;
    transform: scale(1.15);
  }
}
</style>
