<template>
  <section class="section">
    <div class="container q-mx-auto q-px-md" style="max-width: 800px">
      <h2 class="section-title">학력</h2>

      <q-list separator>
        <q-item
          v-for="edu in profile.educations"
          :key="`${edu.school}-${edu.startYear}`"
          class="q-py-md"
        >
          <q-item-section avatar>
            <q-icon name="school" size="md" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">{{ edu.school }}</q-item-label>
            <q-item-label caption>{{ edu.major }} · {{ edu.degree }}</q-item-label>
            <q-item-label caption>
              {{ edu.startYear }} ~
              {{ edu.isAttending ? '재학 중' : edu.endYear }}
              <span v-if="edu.note"> · {{ edu.note }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 자격증/수상 -->
      <h3 class="text-h6 q-mt-xl q-mb-md">자격증 / 수상</h3>
      <q-list separator>
        <q-item
          v-for="cert in profile.certificates"
          :key="`${cert.name}-${cert.date}`"
          class="q-py-sm"
        >
          <q-item-section avatar>
            <q-icon :name="certIcon(cert.type)" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ cert.name }}</q-item-label>
            <q-item-label caption>{{ cert.issuer }} · {{ cert.date }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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
