import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  // 这里要修改成自己的github仓库名字，注意前后要加 /
  base: "/myblogs/",

  lang: "zh-CN",
  title: "huamus",
  description: "vuepress-theme-hope 的博客演示",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
