<template>
  <section class="section" id="skills">
    <div class="container q-mx-auto max-w-xl">
      <!-- 섹션 헤더 -->
      <div class="section-header">
        <h2 class="section-title">기술 스택</h2>
        <p class="section-subtitle">사용하는 기술들을 소개합니다</p>
      </div>

      <!-- 카테고리 탭 필터 (모바일 대응) -->
      <div class="skill-tabs">
        <button
          class="skill-tab"
          :class="{ 'skill-tab--active': activeCategory === 'ALL' }"
          @click="activeCategory = 'ALL'"
        >
          전체
        </button>
        <button
          v-for="cat in profile.skills"
          :key="cat.category"
          class="skill-tab"
          :class="{ 'skill-tab--active': activeCategory === cat.category }"
          @click="activeCategory = cat.category"
        >
          <q-icon :name="cat.icon" size="14px" class="q-mr-xs" />
          {{ cat.category }}
        </button>
      </div>

      <!-- 스킬 카테고리 그리드 -->
      <div class="skills-grid">
        <div
          v-for="category in filteredSkills"
          :key="category.category"
          class="skill-card"
        >
          <!-- 카테고리 헤더 -->
          <div class="skill-card-header">
            <div class="skill-cat-icon">
              <q-icon :name="category.icon" size="22px" />
            </div>
            <span class="skill-cat-name">{{ category.category }}</span>
            <span class="skill-cat-count">{{ category.items.length }}개</span>
          </div>

          <!-- 기술 목록 -->
          <div class="skill-list">
            <div
              v-for="skill in category.items"
              :key="skill.name"
              class="skill-item"
            >
              <div class="skill-item-top">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-dots">
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="skill-dot"
                    :class="n <= skill.level ? 'skill-dot--filled' : 'skill-dot--empty'"
                  />
                </div>
              </div>
              <!-- 숙련도 바 -->
              <div class="skill-bar-track">
                <div
                  class="skill-bar-fill"
                  :style="{ width: (skill.level / 5 * 100) + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import profile from 'src/data/profile';

const activeCategory = ref<string>('ALL');

const filteredSkills = computed(() =>
  activeCategory.value === 'ALL'
    ? profile.skills
    : profile.skills.filter((c) => c.category === activeCategory.value)
);
</script>

<style lang="scss" scoped>
// ── 탭 필터 ──────────────────────────────────
.skill-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
}

.skill-tab {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 100px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    border-color: rgba(79, 70, 229, 0.3);
    color: $primary;
    background: rgba(79, 70, 229, 0.05);
  }

  &--active {
    background: $primary !important;
    border-color: $primary !important;
    color: white !important;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.35) !important;
  }
}

// ── 카드 그리드 ───────────────────────────────
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  // 데스크톱: 4열
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  // 모바일: 1열
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
}

// ── 스킬 카드 ─────────────────────────────────
.skill-card {
  @include card-hover(-4px, 0.25);
  border-radius: 16px;
  padding: 22px;
}

.skill-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
}

.skill-cat-icon {
  @include icon-box-primary(38px, 10px);
}

.skill-cat-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
}

.skill-cat-count {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-section-alt);
  padding: 2px 7px;
  border-radius: 100px;
}

// ── 스킬 아이템 ───────────────────────────────
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.skill-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.skill-name {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-dots {
  display: flex;
  gap: 3px;
  flex-shrink: 0;
}

.skill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transition: background 0.2s ease;

  &--filled {
    background: $primary;
    box-shadow: 0 0 4px rgba(79, 70, 229, 0.4);
  }

  &--empty {
    background: var(--border-color);
  }
}

// 숙련도 바
.skill-bar-track {
  height: 3px;
  background: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>
