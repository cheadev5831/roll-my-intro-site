<template>
  <section class="section">
    <div class="container q-mx-auto q-px-md text-center" style="max-width: 600px">
      <h2 class="section-title">연락처</h2>

      <p class="text-body1 q-mb-xl">
        새로운 기회나 협업 제안은 언제든지 환영합니다. 아래 링크로 연락해 주세요!
      </p>

      <!-- 소셜 링크 버튼 -->
      <div class="row justify-center q-gutter-md q-mb-xl">
        <q-btn
          v-for="social in visibleSocials"
          :key="social.label"
          :href="social.url"
          target="_blank"
          :icon="social.icon"
          :label="social.label"
          color="primary"
          outline
          rounded
          no-caps
        />
      </div>

      <!-- 이메일 직접 표시 -->
      <q-chip
        clickable
        icon="email"
        :label="profile.developer.email"
        color="primary"
        text-color="white"
        @click="copyEmail"
      />
      <div v-if="copied" class="text-caption text-positive q-mt-sm">
        이메일이 클립보드에 복사되었습니다!
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import profile from 'src/data/profile';

const copied = ref(false);
const visibleSocials = computed(() => profile.developer.social.filter((s) => s.visible !== false));

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.developer.email);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // 클립보드 API를 지원하지 않는 경우 무시
  }
}
</script>
