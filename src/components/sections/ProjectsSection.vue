<template>
  <section class="section">
    <div class="container q-mx-auto q-px-md" style="max-width: 1100px">
      <h2 class="section-title">프로젝트</h2>

      <div class="row q-col-gutter-lg">
        <div
          v-for="project in featuredProjects"
          :key="project.name"
          class="col-12 col-md-6 col-lg-4"
        >
          <q-card flat bordered class="full-height column">
            <!-- 썸네일 -->
            <q-img
              v-if="project.thumbnail"
              :src="project.thumbnail"
              :alt="project.name"
              height="200px"
            />
            <div v-else class="bg-grey-3 flex flex-center" style="height: 160px">
              <q-icon name="code" size="64px" color="grey-5" />
            </div>

            <q-card-section class="col-grow">
              <!-- 프로젝트명 & 타입 뱃지 -->
              <div class="row items-center q-mb-sm">
                <span class="text-h6 col">{{ project.name }}</span>
                <q-badge :color="typeColor(project.type)" :label="typeLabel(project.type)" />
              </div>

              <p class="text-body2 text-grey q-mb-sm">{{ project.period }}</p>
              <p class="text-body2 q-mb-md">{{ project.summary }}</p>

              <!-- 기술 스택 태그 -->
              <div class="q-gutter-xs q-mb-md">
                <q-badge
                  v-for="tech in project.techStack"
                  :key="tech"
                  color="secondary"
                  outline
                  :label="tech"
                />
              </div>
            </q-card-section>

            <!-- 링크 버튼 -->
            <q-card-actions>
              <q-btn
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                flat
                icon="code"
                label="GitHub"
                no-caps
              />
              <q-btn
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                flat
                icon="open_in_new"
                label="Live"
                no-caps
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Project } from 'src/data/profile';
import profile from 'src/data/profile';

const featuredProjects = computed(() => profile.projects.filter((p) => p.featured));

function typeColor(type: Project['type']): string {
  const map = { personal: 'info', team: 'positive', work: 'primary' };
  return map[type];
}

function typeLabel(type: Project['type']): string {
  const map = { personal: '개인', team: '팀', work: '업무' };
  return map[type];
}
</script>
