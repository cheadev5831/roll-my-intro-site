<template>
  <section class="section section--alt" id="education">
    <div class="container q-mx-auto max-w-md">
      <!-- 섹션 헤더 -->
      <div class="section-header">
        <h2 class="section-title">학력 & 자격증</h2>
        <p class="section-subtitle">학업 이력과 취득한 자격증입니다</p>
      </div>

      <div class="edu-layout">
        <!-- 학력 -->
        <div class="edu-group">
          <div class="edu-group-title">
            <div class="group-icon">
              <q-icon name="school" size="18px" />
            </div>
            학력
          </div>

          <div class="edu-list">
            <div
              v-for="edu in profile.educations"
              :key="`${edu.school}-${edu.startYear}`"
              class="edu-card"
            >
              <div class="edu-card-icon">
                <q-icon name="account_balance" size="24px" color="primary" />
              </div>
              <div class="edu-card-body">
                <div class="edu-school">{{ edu.school }}</div>
                <div class="edu-major">
                  {{ edu.major }} · {{ edu.degree }}
                </div>
                <div class="edu-period">
                  {{ edu.startYear }} ~ {{ edu.isAttending ? '재학 중' : edu.endYear }}
                  <q-badge
                    v-if="edu.isAttending"
                    class="q-ml-sm attending-badge"
                    label="재학 중"
                  />
                  <span v-if="edu.note" class="edu-note"> · {{ edu.note }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 자격증 / 수상 -->
        <div class="edu-group">
          <div class="edu-group-title">
            <div class="group-icon group-icon--cert">
              <q-icon name="workspace_premium" size="18px" />
            </div>
            자격증 & 수상
          </div>

          <div class="cert-list">
            <div
              v-for="cert in profile.certificates"
              :key="`${cert.name}-${cert.date}`"
              class="cert-card"
            >
              <div class="cert-icon" :class="`cert-icon--${cert.type}`">
                <q-icon :name="certIcon(cert.type)" size="18px" />
              </div>
              <div class="cert-body">
                <div class="cert-name">{{ cert.name }}</div>
                <div class="cert-issuer">{{ cert.issuer }}</div>
              </div>
              <div class="cert-date">
                {{ cert.date.replace('-', '.') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Certificate } from 'src/data/profile';
import profile from 'src/data/profile';

function certIcon(type: Certificate['type']): string {
  const map = { certificate: 'workspace_premium', award: 'emoji_events', activity: 'groups' };
  return map[type];
}
</script>

<style lang="scss" scoped>
// ── 레이아웃 ─────────────────────────────────
.edu-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

// ── 그룹 헤더 ─────────────────────────────────
.edu-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.edu-group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color);
}

.group-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 70, 229, 0.08);
  border-radius: 8px;
  color: $primary;
  flex-shrink: 0;

  &--cert {
    background: rgba(245, 158, 11, 0.1);
    color: #D97706;
  }
}

// ── 학력 카드 ─────────────────────────────────
.edu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edu-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(79, 70, 229, 0.25);
    box-shadow: var(--shadow-md);
  }
}

.edu-card-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 70, 229, 0.06);
  border-radius: 10px;
  flex-shrink: 0;
}

.edu-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.edu-school {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.edu-major {
  font-size: 0.83rem;
  color: var(--text-secondary);
}

.edu-period {
  font-size: 0.78rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
}

.attending-badge {
  background: rgba(79, 70, 229, 0.8) !important;
  font-size: 0.65rem !important;
  padding: 2px 7px !important;
}

.edu-note {
  color: var(--text-muted);
  font-size: 0.75rem;
}

// ── 자격증 카드 ───────────────────────────────
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cert-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(245, 158, 11, 0.3);
    box-shadow: var(--shadow-md);
  }
}

.cert-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;

  &--certificate {
    background: rgba(245, 158, 11, 0.1);
    color: #D97706;
  }
  &--award {
    background: rgba(239, 68, 68, 0.1);
    color: #DC2626;
  }
  &--activity {
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
  }
}

.cert-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.cert-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cert-issuer {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cert-date {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
