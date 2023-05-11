const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require("unplugin-vue-components/webpack")({
        dirs: ["src/components"],
        extensions: ["vue", "md"],
        dts: "src/components.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ],
  },
});
