<template>
  <q-footer class="app-footer">
    <div class="footer-inner q-mx-auto">
      <!-- Back to Top 버튼 -->
      <button class="back-to-top" @click="scrollToTop" aria-label="맨 위로">
        <q-icon name="keyboard_arrow_up" size="18px" />
        <span>TOP</span>
      </button>

      <div class="footer-divider" />

      <!-- 하단 텍스트 -->
      <div class="footer-content">
        <span class="footer-copy">
          © {{ currentYear }}
          <strong>{{ profile.developer.nameEn }}</strong>
        </span>

        <span class="footer-built">
          Built with
          <span class="footer-tech">Vue 3</span>
          <span class="footer-tech">Quasar</span>
          <q-icon name="favorite" size="13px" class="footer-heart" />
        </span>
      </div>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import profile from 'src/data/profile';

const currentYear = new Date().getFullYear();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style lang="scss" scoped>
.app-footer {
  background: var(--bg-section-alt) !important;
  border-top: 1px solid var(--border-color);
  padding: 0 !important;
}

.footer-inner {
  max-width: 1280px;
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 599px) {
    padding: 24px 16px 20px;
    gap: 16px;
  }
}

// ── Back to Top ────────────────────────────────
.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 18px;
  border-radius: 100px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:hover {
    color: $primary;
    border-color: rgba(79, 70, 229, 0.3);
    background: rgba(79, 70, 229, 0.05);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.footer-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

// ── 푸터 컨텐츠 ───────────────────────────────
.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: 0.82rem;
  color: var(--text-muted);

  strong {
    color: var(--text-secondary);
    font-weight: 600;
  }
}

.footer-built {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.footer-tech {
  display: inline-block;
  padding: 2px 7px;
  background: rgba(79, 70, 229, 0.07);
  border: 1px solid rgba(79, 70, 229, 0.15);
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
  color: $primary;

  .body--dark & {
    background: rgba(129, 140, 248, 0.08);
    border-color: rgba(129, 140, 248, 0.15);
    color: #818CF8;
  }
}

.footer-heart {
  color: #EF4444 !important;
  animation: heartbeat 1.8s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.25); }
}
</style>
