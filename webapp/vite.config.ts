import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression';
import path from "path";
import proxy from './src/config/vite/proxy'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
// const apiUrl = "127.0.0.1:3000";


function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return path.resolve(__dirname, paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [visualizer()] - 添加打包分析工具
  plugins: [vue(), visualizer(),viteCompression()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      '@config': resovePath('./config'),
      "@components": resovePath('./src/components'),
      '@api': resovePath('./src/api'),
    }
  },
  server: {
    // 设置为'0.0.0.0' 所有网卡都会启动服务
    host: "0.0.0.0",
    // 服务端口
    port: 8080,
    // 设置是否为https
    https: false,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    strictPort: false,
    // 设置默认打开页面
    // open:'/index.html'
    // 设置接口代理，下发为/api转发到服务端  现在引用proxy方式进行配置
    // proxy: {
    //   "/api": {
    //     target: apiUrl,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    proxy,
    // 热更新
    hmr: {
      // 设置为false时，编译错误时不弹出屏蔽层
      overlay: true,
    },

    // 为开发服务器配置 CORS。默认启用并允许任何源
    cors: false,
    // 设置origin
    origin: "http://127.0.0.1:8080/",
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  build: {
    // 打包路径
    outDir: "dist",

    // 打包混淆 'terser' | 'esbuild',设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild
    minify: 'terser',

    // gizp 打包优化
    assetsDir: './static',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true,  //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log'],
      }
    },
    brotliSize: false,
  },
});
