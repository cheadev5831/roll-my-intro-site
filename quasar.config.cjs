/* eslint-env node */

/** @type {import('@quasar/app-vite').QuasarConf} */
const { configure } = require('quasar/wrappers');

module.exports = configure(function (/* ctx */) {
  return {
    // 부트 파일 (앱 초기화 시 실행)
    boot: [],

    // 전역 CSS
    css: ['app.scss'],

    // Quasar 추가 아이콘/폰트
    extras: [
      'roboto-font',
      'material-icons',
      'fontawesome-v6',
    ],

    // 빌드 설정
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      // GitHub Pages 배포 시 base path
      publicPath: '/roll-my-intro-site/',

      // SPA 라우터 모드 (GitHub Pages는 hash 권장)
      vueRouterMode: 'hash',
    },

    // 개발 서버 설정
    devServer: {
      open: true,
    },

    // Quasar 플러그인/설정
    framework: {
      config: {
        // 기본 다크모드 설정 ('auto' = 시스템 설정 따름)
        dark: 'auto',
        notify: {
          position: 'top',
        },
      },

      plugins: ['Notify', 'Cookies', 'LocalStorage'],
    },

    // 애니메이션
    animations: 'all',
  };
});
