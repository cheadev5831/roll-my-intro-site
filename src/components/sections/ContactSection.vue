<template>
  <section class="section" id="contact">
    <div class="container q-mx-auto max-w-md">
      <!-- 섹션 헤더 -->
      <div class="section-header">
        <h2 class="section-title">연락처</h2>
        <p class="section-subtitle">함께 이야기를 나눠요</p>
      </div>

      <!-- CTA 카드 -->
      <div class="contact-cta-card">
        <!-- 배경 장식 -->
        <div class="cta-bg" aria-hidden="true">
          <div class="cta-orb cta-orb--1" />
          <div class="cta-orb cta-orb--2" />
        </div>

        <div class="cta-content">
          <div class="cta-emoji">👋</div>
          <h3 class="cta-heading">새로운 기회나 협업을 환영합니다</h3>
          <p class="cta-desc">
            궁금한 점이 있거나 함께 일하고 싶다면<br class="lt-sm" />
            아래 채널로 연락해 주세요!
          </p>

          <!-- 소셜 링크 버튼 -->
          <div class="contact-links">
            <a
              v-for="social in visibleSocials"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link-btn"
            >
              <q-icon :name="social.icon" size="20px" />
              <span>{{ social.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 이메일 섹션 -->
      <div class="email-section">
        <div class="email-label">
          <q-icon name="email" size="16px" />
          이메일로 직접 연락하기
        </div>

        <div class="email-card" @click="copyEmail">
          <span class="email-address">{{ profile.developer.email }}</span>
          <div class="email-copy-btn" :class="{ 'copied': copied }">
            <q-icon :name="copied ? 'check' : 'content_copy'" size="18px" />
            <span>{{ copied ? '복사됨!' : '복사' }}</span>
          </div>
        </div>

        <!-- 복사 완료 토스트 -->
        <transition name="fade">
          <div v-if="copied" class="copy-toast">
            <q-icon name="check_circle" size="16px" />
            이메일이 클립보드에 복사되었습니다
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import profile from 'src/data/profile';

const copied = ref(false);
const visibleSocials = computed(() =>
  profile.developer.social.filter((s) => s.visible !== false)
);

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.developer.email);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  } catch {
    // 클립보드 미지원 환경 무시
  }
}
</script>

<style lang="scss" scoped>
// ── CTA 카드 ─────────────────────────────────
.contact-cta-card {
  position: relative;
  background: var(--gradient-primary);
  border-radius: 24px;
  padding: 56px 40px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 32px;
  box-shadow: 0 20px 60px rgba(79, 70, 229, 0.35);

  @media (max-width: 599px) {
    padding: 40px 24px;
    border-radius: 20px;
  }
}

.cta-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;

  &--1 {
    width: 250px;
    height: 250px;
    background: rgba(255, 255, 255, 0.3);
    top: -60px;
    right: -60px;
  }
  &--2 {
    width: 180px;
    height: 180px;
    background: rgba(6, 182, 212, 0.5);
    bottom: -40px;
    left: -40px;
  }
}

.cta-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.cta-emoji {
  font-size: 2.5rem;
  animation: wave 2.5s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  20%       { transform: rotate(20deg); }
  40%       { transform: rotate(-8deg); }
  60%       { transform: rotate(16deg); }
  80%       { transform: rotate(-4deg); }
}

.cta-heading {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 800;
  color: white;
  margin: 0;
  line-height: 1.3;
}

.cta-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin: 0;
}

// ── 소셜 링크 버튼들 ──────────────────────────
.contact-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

.contact-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
}

// ── 이메일 섹션 ───────────────────────────────
.email-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.email-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.email-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(79, 70, 229, 0.4);
    box-shadow: var(--shadow-md);
    background: rgba(79, 70, 229, 0.02);
  }

  @media (max-width: 599px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

.email-address {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.01em;

  @media (max-width: 599px) {
    font-size: 0.9rem;
    word-break: break-all;
  }
}

.email-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 8px;
  background: rgba(79, 70, 229, 0.08);
  border: 1px solid rgba(79, 70, 229, 0.2);
  color: $primary;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &.copied {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
    color: #059669;
  }
}

// ── 복사 토스트 ───────────────────────────────
.copy-toast {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 8px;
  font-size: 0.82rem;
  color: #059669;
  align-self: flex-start;

  .body--dark & {
    color: #34D399;
    background: rgba(16, 185, 129, 0.12);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
