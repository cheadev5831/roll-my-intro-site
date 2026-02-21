<template>
  <section class="section">
    <div class="container q-mx-auto q-px-md" style="max-width: 900px">
      <h2 class="section-title">소개</h2>

      <div class="row q-col-gutter-xl items-center">
        <!-- 프로필 이미지 -->
        <div class="col-12 col-md-4 text-center">
          <q-avatar size="200px" class="q-mb-md">
            <img
              v-if="profile.developer.avatarUrl"
              :src="profile.developer.avatarUrl"
              :alt="profile.developer.name"
            />
            <q-icon v-else name="person" size="100px" />
          </q-avatar>

          <!-- 연락 가능 뱃지 -->
          <div v-if="profile.developer.availableForWork" class="q-mt-sm">
            <q-badge color="positive" label="채용 가능" />
          </div>
        </div>

        <!-- 자기소개 텍스트 -->
        <div class="col-12 col-md-8">
          <p v-for="(line, i) in profile.developer.bio" :key="i" class="text-body1 q-mb-md">
            {{ line }}
          </p>

          <!-- 기본 정보 -->
          <q-list dense>
            <q-item>
              <q-item-section avatar>
                <q-icon name="place" />
              </q-item-section>
              <q-item-section>{{ profile.developer.location }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="email" />
              </q-item-section>
              <q-item-section>{{ profile.developer.email }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import profile from 'src/data/profile';
</script>
