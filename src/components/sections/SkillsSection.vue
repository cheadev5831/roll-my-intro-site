<template>
  <section class="section">
    <div class="container q-mx-auto q-px-md" style="max-width: 1000px">
      <h2 class="section-title">기술 스택</h2>

      <div class="row q-col-gutter-lg">
        <div
          v-for="category in profile.skills"
          :key="category.category"
          class="col-12 col-sm-6 col-lg-3"
        >
          <q-card flat bordered>
            <q-card-section>
              <!-- 카테고리 헤더 -->
              <div class="text-h6 q-mb-md">
                <q-icon :name="category.icon" class="q-mr-sm" />
                {{ category.category }}
              </div>

              <!-- 기술 목록 -->
              <div v-for="skill in category.items" :key="skill.name" class="q-mb-sm">
                <div class="row items-center justify-between q-mb-xs">
                  <span class="text-body2">{{ skill.name }}</span>
                  <div class="row q-gutter-xs">
                    <q-icon
                      v-for="n in 5"
                      :key="n"
                      name="circle"
                      size="10px"
                      :color="n <= skill.level ? 'primary' : 'grey-4'"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import profile from 'src/data/profile';
</script>
