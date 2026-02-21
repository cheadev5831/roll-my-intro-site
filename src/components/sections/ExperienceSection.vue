<template>
  <section class="section">
    <div class="container q-mx-auto q-px-md" style="max-width: 800px">
      <h2 class="section-title">경력</h2>

      <q-timeline color="primary">
        <q-timeline-entry
          v-for="exp in profile.experiences"
          :key="`${exp.company}-${exp.startDate}`"
          :title="exp.position"
          :subtitle="formatPeriod(exp)"
        >
          <div>
            <div class="text-weight-bold q-mb-sm">
              {{ exp.company }}
              <q-badge v-if="exp.isCurrent" color="positive" label="현재" class="q-ml-sm" />
            </div>
            <div class="text-caption text-grey q-mb-sm">{{ exp.location }}</div>

            <ul class="q-pl-md q-mb-sm">
              <li v-for="(desc, i) in exp.description" :key="i" class="text-body2 q-mb-xs">
                {{ desc }}
              </li>
            </ul>

            <div class="q-gutter-xs">
              <q-badge
                v-for="tech in exp.techStack"
                :key="tech"
                color="primary"
                outline
                :label="tech"
              />
            </div>
          </div>
        </q-timeline-entry>
      </q-timeline>
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
