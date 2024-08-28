import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
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
