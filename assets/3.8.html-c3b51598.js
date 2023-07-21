const e=JSON.parse('{"key":"v-69681e72","path":"/knowledgeBase/xiaolinCoding/1.computerNetworks/3.HTTPChapter/3.8.html","title":"3.8 既然有 HTTP 协议，为什么还要有 RPC？","lang":"zh-CN","frontmatter":{"title":"3.8 既然有 HTTP 协议，为什么还要有 RPC？","author":"huamus","isOriginal":false,"data":"2023-7-22","description":"原文链接：https://xiaolincoding.com/ 作者：小林coding 我想起了我刚工作的时候，第一次接触 RPC 协议，当时就很懵，我 HTTP 协议用的好好的，为什么还要用 RPC 协议？ 从 TCP 聊起 作为一个程序员，假设我们需要在 A 电脑的进程发一段数据到 B 电脑的进程，我们一般会在代码里使用 Socket 进行编程。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/1.computerNetworks/3.HTTPChapter/3.8.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"3.8 既然有 HTTP 协议，为什么还要有 RPC？"}],["meta",{"property":"og:description","content":"原文链接：https://xiaolincoding.com/ 作者：小林coding 我想起了我刚工作的时候，第一次接触 RPC 协议，当时就很懵，我 HTTP 协议用的好好的，为什么还要用 RPC 协议？ 从 TCP 聊起 作为一个程序员，假设我们需要在 A 电脑的进程发一段数据到 B 电脑的进程，我们一般会在代码里使用 Socket 进行编程。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-21T23:30:10.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-21T23:30:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3.8 既然有 HTTP 协议，为什么还要有 RPC？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-21T23:30:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\"}]}"]]},"headers":[{"level":2,"title":"从 TCP 聊起","slug":"从-tcp-聊起","link":"#从-tcp-聊起","children":[]},{"level":2,"title":"使用纯裸 TCP 会有什么问题","slug":"使用纯裸-tcp-会有什么问题","link":"#使用纯裸-tcp-会有什么问题","children":[]},{"level":2,"title":"HTTP 和 RPC","slug":"http-和-rpc","link":"#http-和-rpc","children":[]},{"level":2,"title":"HTTP 和 RPC 有什么区别","slug":"http-和-rpc-有什么区别","link":"#http-和-rpc-有什么区别","children":[{"level":3,"title":"服务发现","slug":"服务发现","link":"#服务发现","children":[]},{"level":3,"title":"底层连接形式","slug":"底层连接形式","link":"#底层连接形式","children":[]},{"level":3,"title":"传输的内容","slug":"传输的内容","link":"#传输的内容","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1688308537000,"updatedTime":1689982210000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":2}]},"readingTime":{"minutes":10.62,"words":3187},"filePathRelative":"knowledgeBase/xiaolinCoding/1.computerNetworks/3.HTTPChapter/3.8.md","localizedDate":"2023年7月2日","excerpt":"<blockquote>\\n<p>原文链接：<a href=\\"https://xiaolincoding.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://xiaolincoding.com/</a></p>\\n<p>作者：小林coding</p>\\n</blockquote>\\n<p>我想起了我刚工作的时候，第一次接触 RPC 协议，当时就很懵，<strong>我 HTTP 协议用的好好的，为什么还要用 RPC 协议？</strong></p>\\n<h2> 从 TCP 聊起</h2>\\n<p>作为一个程序员，假设我们<strong>需要在 A 电脑的进程发一段数据到 B 电脑的进程，我们一般会在代码里使用 Socket 进行编程。</strong></p>","autoDesc":true}');export{e as data};
