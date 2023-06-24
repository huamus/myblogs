import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "知识库",
      icon: "lightbulb",
      prefix: "knowledgeBase/",
      children: [
        "xiaolinCoding/",
        "JavaGuide/"
      ],
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],

  "/knowledge/": "structure",
  "/book/": "structure",
  // "/": [
  //   // 博客主页
  //   // "",
  //   {
  //     text: "图解网络",
  //     icon: "laptop-code",
  //     prefix: "/computerNetworks/",
  //     children: "structure",
  //   },
  //   {
  //     text: "图解操作系统",
  //     icon: "laptop-code",
  //     prefix: "/operatingSystem/",
  //     children: "structure",
  //   },
  //   {
  //     text: "MySQL",
  //     icon: "laptop-code",
  //     prefix: "/MySQL/",
  //     children: "structure",
  //   },
    
  //   {
  //     text: "如何使用",
  //     icon: "laptop-code",
  //     prefix: "demo/",
  //     link: "demo/",
  //     children: "structure",
  //   },
  //   {
  //     text: "文章",
  //     icon: "book",
  //     prefix: "posts/",
  //     children: "structure",
  //   },
  //   "intro",
  //   "slides",
  // ],
});
