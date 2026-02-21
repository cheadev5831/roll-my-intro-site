<template>
  <q-page>
    <!-- 히어로 섹션 -->
    <HeroSection id="hero" />

    <!-- 소개 섹션 -->
    <AboutSection id="about" />

    <!-- 기술 스택 섹션 -->
    <SkillsSection id="skills" />

    <!-- 경력 섹션 -->
    <ExperienceSection id="experience" />

    <!-- 프로젝트 섹션 -->
    <ProjectsSection id="projects" />

    <!-- 학력 섹션 -->
    <EducationSection id="education" />

    <!-- 연락처 섹션 -->
    <ContactSection id="contact" />
  </q-page>
</template>

<script setup lang="ts">
import HeroSection from 'components/sections/HeroSection.vue';
import AboutSection from 'components/sections/AboutSection.vue';
import SkillsSection from 'components/sections/SkillsSection.vue';
import ExperienceSection from 'components/sections/ExperienceSection.vue';
import ProjectsSection from 'components/sections/ProjectsSection.vue';
import EducationSection from 'components/sections/EducationSection.vue';
import ContactSection from 'components/sections/ContactSection.vue';
</script>
