<template>
  <section class="hero-section" id="hero">
    <!-- 배경 장식 (그라디언트 오브) -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-orb hero-orb--1" />
      <div class="hero-orb hero-orb--2" />
      <div class="hero-orb hero-orb--3" />
      <div class="hero-grid" />
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="hero-content q-mx-auto container">
      <!-- 상단 뱃지 -->
      <div class="hero-badge fade-up">
        <span class="badge-dot" />
        <span>{{ profile.developer.availableForWork ? '채용 가능' : '채용 불가' }}</span>
      </div>

      <!-- 이름 & 직함 -->
      <h1 class="hero-name fade-up fade-up-delay-1">
        <span class="hero-name-ko">{{ profile.developer.name }}</span>
        <span class="hero-name-en">{{ profile.developer.nameEn }}</span>
      </h1>

      <div class="hero-title-wrap fade-up fade-up-delay-2">
        <span class="hero-title">{{ profile.developer.title }}</span>
        <span v-if="profile.developer.subTitle" class="hero-subtitle-tag">
          {{ profile.developer.subTitle }}
        </span>
      </div>

      <!-- 한 줄 소개 -->
      <p class="hero-tagline fade-up fade-up-delay-3">
        {{ profile.developer.tagline }}
      </p>

      <!-- CTA 버튼 그룹 -->
      <div class="hero-actions fade-up fade-up-delay-4">
        <q-btn
          class="btn-gradient hero-cta-primary"
          rounded
          no-caps
          size="md"
          label="프로젝트 보기"
          icon-right="arrow_forward"
          @click="scrollTo('projects')"
        />
        <q-btn
          class="hero-cta-outline"
          rounded
          no-caps
          outline
          size="md"
          label="연락하기"
          icon="email"
          @click="scrollTo('contact')"
        />
      </div>

      <!-- 소셜 링크 -->
      <div class="hero-socials fade-up fade-up-delay-4">
        <a
          v-for="social in visibleSocials"
          :key="social.label"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="social.label"
        >
          <q-icon :name="social.icon" size="20px" />
          <q-tooltip>{{ social.label }}</q-tooltip>
        </a>
      </div>

      <!-- 위치 & 상태 -->
      <div class="hero-meta fade-up fade-up-delay-4">
        <span class="meta-item">
          <q-icon name="place" size="16px" />
          {{ profile.developer.location }}
        </span>
      </div>
    </div>

    <!-- 스크롤 다운 인디케이터 -->
    <button class="scroll-down-btn" @click="scrollTo('about')" aria-label="스크롤 다운">
      <span class="scroll-down-text">Scroll</span>
      <div class="scroll-down-arrow">
        <q-icon name="keyboard_arrow_down" size="24px" />
      </div>
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import profile from 'src/data/profile';

const visibleSocials = computed(() =>
  profile.developer.social.filter((s) => s.visible !== false)
);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  // 스크롤 진입 애니메이션
  const elements = document.querySelectorAll('.fade-up');
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('is-visible');
    }, i * 100);
  });
});
</script>

<style lang="scss" scoped>
// ── 히어로 전체 ───────────────────────────────
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--gradient-hero-bg);
}

// ── 배경 장식 ─────────────────────────────────
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: float 8s ease-in-out infinite;

  &--1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.6), transparent);
    top: -100px;
    right: -100px;
    animation-delay: 0s;
  }
  &--2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.5), transparent);
    bottom: -80px;
    left: -80px;
    animation-delay: -3s;
  }
  &--3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.3), transparent);
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -6s;
  }
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(79, 70, 229, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 70, 229, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-20px) scale(1.05); }
}

// ── 컨텐츠 ───────────────────────────────────
.hero-content {
  position: relative;
  z-index: 1;
  padding: 120px 24px 80px;
  max-width: 900px;

  @media (max-width: 599px) {
    padding: 100px 16px 60px;
    text-align: center;
  }
}

// ── 상태 뱃지 ─────────────────────────────────
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 28px;

  .body--dark & {
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.25);
    color: #34D399;
  }
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
}

@keyframes pulse-dot {
  0%   { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
  70%  { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

// ── 이름 ─────────────────────────────────────
.hero-name {
  margin: 0 0 12px;
  line-height: 1.1;
  display: flex;
  flex-direction: column;
}

.hero-name-ko {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-name-en {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  -webkit-text-fill-color: var(--text-secondary);
  margin-top: 4px;
}

// ── 직함 ─────────────────────────────────────
.hero-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 599px) {
    justify-content: center;
  }
}

.hero-title {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
}

.hero-subtitle-tag {
  display: inline-block;
  padding: 3px 10px;
  background: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: $primary;
  font-family: 'Fira Code', monospace;

  .body--dark & {
    background: rgba(129, 140, 248, 0.1);
    border-color: rgba(129, 140, 248, 0.2);
    color: #818CF8;
  }
}

// ── 태그라인 ─────────────────────────────────
.hero-tagline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 600px;
}

// ── 액션 버튼 ─────────────────────────────────
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;

  @media (max-width: 599px) {
    justify-content: center;
  }
}

.hero-cta-primary {
  min-width: 160px;
  font-weight: 600;
  padding: 10px 24px;
}

.hero-cta-outline {
  min-width: 140px;
  font-weight: 600;
  padding: 10px 24px;
  color: $primary !important;
  border-color: rgba(79, 70, 229, 0.4) !important;
  transition: background 0.2s ease, border-color 0.2s ease !important;

  &:hover {
    background: rgba(79, 70, 229, 0.06) !important;
    border-color: $primary !important;
  }
}

// ── 소셜 링크 ─────────────────────────────────
.hero-socials {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;

  @media (max-width: 599px) {
    justify-content: center;
  }
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    color: $primary;
    border-color: rgba(79, 70, 229, 0.4);
    background: rgba(79, 70, 229, 0.05);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

// ── 메타 정보 ─────────────────────────────────
.hero-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 599px) {
    justify-content: center;
  }
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

// ── 스크롤 다운 ───────────────────────────────
.scroll-down-btn {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  transition: color 0.2s ease;
  padding: 8px;

  &:hover {
    color: $primary;
  }

  @media (max-width: 599px) {
    bottom: 20px;
  }
}

.scroll-down-text {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.scroll-down-arrow {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
</style>
