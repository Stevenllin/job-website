import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/job-website/',
  server: {
    host: '0.0.0.0',  // 监听所有 IP 地址
    port: 5173,       // 保证端口为 5173
  },
  plugins: [react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // 忽略特定的警告
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        // 其他自定義的處理邏輯
        warn(warning);
      }
    }
  }
})
