<template>
  <section class="section section--alt" id="experience">
    <div class="container q-mx-auto max-w-md">
      <!-- 섹션 헤더 -->
      <div class="section-header">
        <h2 class="section-title">경력</h2>
        <p class="section-subtitle">걸어온 커리어 여정</p>
      </div>

      <!-- 타임라인 -->
      <div class="timeline">
        <div
          v-for="(exp, index) in profile.experiences"
          :key="`${exp.company}-${exp.startDate}`"
          class="timeline-item"
          :class="{ 'timeline-item--current': exp.isCurrent }"
        >
          <!-- 타임라인 마커 -->
          <div class="timeline-marker">
            <div class="timeline-dot" :class="{ 'timeline-dot--current': exp.isCurrent }">
              <q-icon name="work" size="14px" />
            </div>
            <div v-if="index < profile.experiences.length - 1" class="timeline-line" />
          </div>

          <!-- 카드 -->
          <div class="exp-card">
            <!-- 카드 헤더 -->
            <div class="exp-card-header">
              <div class="exp-header-left">
                <div class="exp-period">
                  <q-icon name="schedule" size="12px" class="q-mr-xs" />
                  {{ formatPeriod(exp) }}
                </div>
                <div class="exp-company">
                  {{ exp.company }}
                  <q-badge
                    v-if="exp.isCurrent"
                    class="current-badge q-ml-sm"
                    label="현재"
                  />
                </div>
                <div class="exp-position">{{ exp.position }}</div>
                <div class="exp-location">
                  <q-icon name="place" size="12px" class="q-mr-xs" />
                  {{ exp.location }}
                </div>
              </div>
            </div>

            <!-- 업무 내용 -->
            <ul class="exp-description">
              <li
                v-for="(desc, i) in exp.description"
                :key="i"
                class="exp-desc-item"
              >
                {{ desc }}
              </li>
            </ul>

            <!-- 기술 스택 태그 -->
            <div class="exp-tech-stack">
              <span
                v-for="tech in exp.techStack"
                :key="tech"
                class="tech-chip"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Experience } from 'src/data/profile';
import profile from 'src/data/profile';

function formatPeriod(exp: Experience): string {
  const start = exp.startDate.replace('-', '.');
  const end = exp.isCurrent ? '현재' : exp.endDate?.replace('-', '.') ?? '';
  return `${start} ~ ${end}`;
}
</script>

<style lang="scss" scoped>
// ── 타임라인 컨테이너 ─────────────────────────
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 20px;
  position: relative;

  @media (max-width: 599px) {
    grid-template-columns: 32px 1fr;
    gap: 14px;
  }
}

// ── 타임라인 마커 ─────────────────────────────
.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 22px;
}

.timeline-dot {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-muted);
  flex-shrink: 0;
  z-index: 1;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);

  &--current {
    background: var(--gradient-primary);
    border-color: transparent;
    color: white;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
  }

  @media (max-width: 599px) {
    width: 32px;
    height: 32px;
  }
}

.timeline-line {
  width: 2px;
  flex: 1;
  min-height: 32px;
  background: linear-gradient(to bottom, var(--border-color), transparent);
  margin: 8px 0;
  border-radius: 1px;
}

// ── 경력 카드 ─────────────────────────────────
.exp-card {
  @include card-hover(-2px, 0.25);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 599px) {
    padding: 18px;
  }
}

// ── 카드 헤더 ─────────────────────────────────
.exp-card-header {
  margin-bottom: 18px;
}

.exp-period {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: $primary;
  background: rgba(79, 70, 229, 0.08);
  padding: 3px 10px;
  border-radius: 100px;
  margin-bottom: 10px;
  letter-spacing: 0.02em;

  .body--dark & {
    color: #818CF8;
    background: rgba(129, 140, 248, 0.1);
  }
}

.exp-company {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
}

.current-badge {
  background: linear-gradient(135deg, #10B981, #059669) !important;
  font-size: 0.68rem !important;
  padding: 3px 8px !important;
  border-radius: 100px !important;
}

.exp-position {
  font-size: 0.9rem;
  font-weight: 600;
  color: $secondary;
  margin-bottom: 4px;
}

.exp-location {
  font-size: 0.78rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

// ── 업무 내용 ─────────────────────────────────
.exp-description {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exp-desc-item {
  position: relative;
  padding-left: 18px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: $primary;
    font-size: 0.8rem;
  }
}

// ── 기술 스택 ─────────────────────────────────
.exp-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
