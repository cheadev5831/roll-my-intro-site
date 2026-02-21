<template>
  <section class="section section--alt" id="about">
    <div class="container q-mx-auto max-w-lg">
      <!-- 섹션 헤더 -->
      <div class="section-header">
        <h2 class="section-title">소개</h2>
        <p class="section-subtitle">저를 소개합니다</p>
      </div>

      <div class="about-grid">
        <!-- 프로필 이미지 영역 -->
        <div class="about-avatar-wrap">
          <div class="avatar-frame">
            <q-avatar class="avatar-img" size="180px">
              <img
                v-if="profile.developer.avatarUrl"
                :src="profile.developer.avatarUrl"
                :alt="profile.developer.name"
              />
              <q-icon v-else name="person" size="90px" color="primary" />
            </q-avatar>
            <!-- 장식 링 -->
            <div class="avatar-ring" />
          </div>

          <!-- 뱃지 -->
          <div v-if="profile.developer.availableForWork" class="available-badge">
            <span class="available-dot" />
            채용 가능
          </div>

          <!-- 소셜 아이콘 -->
          <div class="about-socials">
            <a
              v-for="social in visibleSocials"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="about-social-link"
            >
              <q-icon :name="social.icon" size="18px" />
              <q-tooltip>{{ social.label }}</q-tooltip>
            </a>
          </div>
        </div>

        <!-- 소개 텍스트 영역 -->
        <div class="about-content">
          <!-- 자기소개 -->
          <div class="bio-text">
            <p
              v-for="(line, i) in profile.developer.bio"
              :key="i"
              class="bio-line"
            >
              {{ line }}
            </p>
          </div>

          <!-- 기본 정보 카드들 -->
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">
                <q-icon name="place" size="18px" />
              </div>
              <div class="info-body">
                <span class="info-label">위치</span>
                <span class="info-value">{{ profile.developer.location }}</span>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <q-icon name="email" size="18px" />
              </div>
              <div class="info-body">
                <span class="info-label">이메일</span>
                <span class="info-value">{{ profile.developer.email }}</span>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <q-icon name="work" size="18px" />
              </div>
              <div class="info-body">
                <span class="info-label">포지션</span>
                <span class="info-value">{{ profile.developer.title }}</span>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="about-cta">
            <q-btn
              class="btn-gradient"
              rounded
              no-caps
              size="sm"
              label="연락하기"
              icon="send"
              @click="scrollTo('contact')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import profile from 'src/data/profile';

const visibleSocials = computed(() =>
  profile.developer.social.filter((s) => s.visible !== false)
);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style lang="scss" scoped>
// ── 그리드 레이아웃 ───────────────────────────
.about-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;

  // 태블릿
  @media (max-width: 1023px) {
    grid-template-columns: 220px 1fr;
    gap: 40px;
  }

  // 모바일
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
}

// ── 아바타 영역 ───────────────────────────────
.about-avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 80px;

  @media (max-width: 599px) {
    position: static;
  }
}

.avatar-frame {
  position: relative;
  display: inline-block;
}

.avatar-img {
  border: 4px solid transparent;
  background:
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    var(--gradient-primary) border-box;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
}

.avatar-ring {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 2px dashed rgba(79, 70, 229, 0.25);
  animation: rotate-ring 20s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}

@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.available-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #059669;

  .body--dark & {
    background: rgba(16, 185, 129, 0.12);
    color: #34D399;
  }
}

.available-dot {
  width: 7px;
  height: 7px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.2); }
}

.about-socials {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.about-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    color: $primary;
    border-color: rgba(79, 70, 229, 0.4);
    background: rgba(79, 70, 229, 0.06);
    transform: translateY(-2px);
  }
}

// ── 소개 콘텐츠 ───────────────────────────────
.about-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.bio-text {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bio-line {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
}

// ── 정보 카드 ─────────────────────────────────
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(79, 70, 229, 0.3);
    box-shadow: var(--shadow-md);
  }
}

.info-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 70, 229, 0.08);
  border-radius: 8px;
  color: $primary;
  flex-shrink: 0;
}

.info-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.info-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.about-cta {
  @media (max-width: 599px) {
    text-align: center;
  }
}
</style>
