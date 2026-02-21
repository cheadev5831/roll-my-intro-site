<template>
  <section class="section" id="projects">
    <div class="container q-mx-auto max-w-xl">
      <!-- 섹션 헤더 -->
      <div class="section-header">
        <h2 class="section-title">프로젝트</h2>
        <p class="section-subtitle">직접 만든 대표 작업물입니다</p>
      </div>

      <!-- 프로젝트 그리드 -->
      <div class="projects-grid">
        <article
          v-for="project in featuredProjects"
          :key="project.name"
          class="project-card"
        >
          <!-- 썸네일 -->
          <div class="project-thumb">
            <q-img
              v-if="project.thumbnail"
              :src="project.thumbnail"
              :alt="project.name"
              class="project-thumb-img"
            />
            <div v-else class="project-thumb-placeholder">
              <div class="thumb-pattern" />
              <q-icon name="code" size="40px" class="thumb-icon" />
              <span class="thumb-label">{{ project.type === 'personal' ? 'Personal' : project.type === 'team' ? 'Team' : 'Work' }}</span>
            </div>

            <!-- 타입 뱃지 오버레이 -->
            <div class="project-type-badge" :class="`type--${project.type}`">
              <q-icon :name="typeIcon(project.type)" size="12px" />
              {{ typeLabel(project.type) }}
            </div>
          </div>

          <!-- 카드 본문 -->
          <div class="project-body">
            <!-- 제목 & 기간 -->
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <span class="project-period">{{ project.period }}</span>
            </div>

            <!-- 요약 -->
            <p class="project-summary">{{ project.summary }}</p>

            <!-- 하이라이트 -->
            <ul v-if="project.highlights?.length" class="project-highlights">
              <li
                v-for="(h, i) in project.highlights?.slice(0, 3)"
                :key="i"
                class="highlight-item"
              >
                {{ h }}
              </li>
            </ul>

            <!-- 기술 스택 -->
            <div class="project-tech">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="tech-chip"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- 카드 푸터: 링크 -->
          <div class="project-footer">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              <q-icon name="code" size="16px" />
              GitHub
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link project-link--live"
            >
              <q-icon name="open_in_new" size="16px" />
              Live Demo
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Project } from 'src/data/profile';
import profile from 'src/data/profile';

const featuredProjects = computed(() => profile.projects.filter((p) => p.featured));

function typeIcon(type: Project['type']): string {
  const map = { personal: 'person', team: 'group', work: 'business_center' };
  return map[type];
}

function typeLabel(type: Project['type']): string {
  const map = { personal: '개인', team: '팀', work: '업무' };
  return map[type];
}
</script>

<style lang="scss" scoped>
// ── 프로젝트 그리드 ───────────────────────────
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  // 태블릿: 2열
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 모바일: 1열
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
}

// ── 프로젝트 카드 ─────────────────────────────
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(79, 70, 229, 0.3);

    .project-thumb-img { transform: scale(1.05); }
    .thumb-icon { transform: scale(1.1); }
  }
}

// ── 썸네일 ────────────────────────────────────
.project-thumb {
  position: relative;
  height: 180px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 599px) {
    height: 160px;
  }
}

.project-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(6, 182, 212, 0.08));
}

.thumb-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(79, 70, 229, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 70, 229, 0.06) 1px, transparent 1px);
  background-size: 30px 30px;
}

.thumb-icon {
  color: rgba(79, 70, 229, 0.4);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.thumb-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(79, 70, 229, 0.5);
  position: relative;
  z-index: 1;
}

.project-type-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 600;
  backdrop-filter: blur(8px);

  &.type--personal {
    background: rgba(59, 130, 246, 0.85);
    color: white;
  }
  &.type--team {
    background: rgba(16, 185, 129, 0.85);
    color: white;
  }
  &.type--work {
    background: rgba(79, 70, 229, 0.85);
    color: white;
  }
}

// ── 카드 본문 ─────────────────────────────────
.project-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.project-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.project-period {
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
  padding-top: 2px;
}

.project-summary {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
}

// ── 하이라이트 ────────────────────────────────
.project-highlights {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.highlight-item {
  position: relative;
  padding-left: 14px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: $secondary;
    font-size: 0.72rem;
    font-weight: 700;
  }
}

// ── 기술 스택 ─────────────────────────────────
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: auto;
}

// ── 카드 푸터 ─────────────────────────────────
.project-footer {
  display: flex;
  gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid var(--border-color);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  background: var(--bg-card);
  transition: all 0.2s ease;

  &:hover {
    color: $primary;
    border-color: rgba(79, 70, 229, 0.4);
    background: rgba(79, 70, 229, 0.05);
  }

  &--live {
    background: rgba(79, 70, 229, 0.06);
    border-color: rgba(79, 70, 229, 0.2);
    color: $primary;

    &:hover {
      background: $primary;
      color: white;
      border-color: $primary;
    }
  }
}
</style>
