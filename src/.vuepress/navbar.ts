import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/demo/",
  {
    text: "知识库",
    prefix: "/knowledgeBase/",
    children: ["JavaCompanion/", "xiaolinCoding/"],
  },
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
    ],
  },
]);
