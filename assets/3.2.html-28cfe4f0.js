const e=JSON.parse('{"key":"v-749a4882","path":"/knowledgeBase/xiaolinCoding/computerNetworks/TCPChapter/3.2.html","title":"重传机制","lang":"zh-CN","frontmatter":{"0":"4","1":".","2":"2","3":" ","4":"T","5":"C","6":"P","7":" ","8":"重","9":"传","10":"、","11":"滑","12":"动","13":"窗","14":"口","15":"、","16":"流","17":"量","18":"控","19":"制","20":"、","21":"拥","22":"塞","23":"控","24":"制","description":"TCP 巨复杂，它为了保证可靠性，用了巨多的机制来保证，真是个「伟大」的协议，写着写着发现这水太深了。。。 相信大家都知道 TCP 是一个可靠传输的协议，那它是如何保证可靠的呢？ 为了实现可靠性传输，需要考虑很多事情，例如数据的破坏、丢包、重复以及分片顺序混乱等问题。如不能解决这些问题，也就无从谈起可靠传输。 那么，TCP 是通过序列号、确认应答、重发控制、连接管理以及窗口控制等机制实现可靠性传输的。 今天，将重点介绍 TCP 的重传机制、滑动窗口、流量控制、拥塞控制。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/computerNetworks/TCPChapter/3.2.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"重传机制"}],["meta",{"property":"og:description","content":"TCP 巨复杂，它为了保证可靠性，用了巨多的机制来保证，真是个「伟大」的协议，写着写着发现这水太深了。。。 相信大家都知道 TCP 是一个可靠传输的协议，那它是如何保证可靠的呢？ 为了实现可靠性传输，需要考虑很多事情，例如数据的破坏、丢包、重复以及分片顺序混乱等问题。如不能解决这些问题，也就无从谈起可靠传输。 那么，TCP 是通过序列号、确认应答、重发控制、连接管理以及窗口控制等机制实现可靠性传输的。 今天，将重点介绍 TCP 的重传机制、滑动窗口、流量控制、拥塞控制。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T00:22:01.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-01T00:22:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"重传机制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T00:22:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"超时重传","slug":"超时重传","link":"#超时重传","children":[]},{"level":2,"title":"快速重传","slug":"快速重传","link":"#快速重传","children":[]},{"level":2,"title":"SACK 方法","slug":"sack-方法","link":"#sack-方法","children":[]},{"level":2,"title":"Duplicate SACK","slug":"duplicate-sack","link":"#duplicate-sack","children":[]},{"level":2,"title":"操作系统缓冲区与滑动窗口的关系","slug":"操作系统缓冲区与滑动窗口的关系","link":"#操作系统缓冲区与滑动窗口的关系","children":[]},{"level":2,"title":"窗口关闭","slug":"窗口关闭","link":"#窗口关闭","children":[]},{"level":2,"title":"糊涂窗口综合症","slug":"糊涂窗口综合症","link":"#糊涂窗口综合症","children":[]},{"level":2,"title":"慢启动","slug":"慢启动","link":"#慢启动","children":[]},{"level":2,"title":"拥塞避免算法","slug":"拥塞避免算法","link":"#拥塞避免算法","children":[]},{"level":2,"title":"拥塞发生","slug":"拥塞发生","link":"#拥塞发生","children":[]},{"level":2,"title":"快速恢复","slug":"快速恢复","link":"#快速恢复","children":[]}],"git":{"createdTime":1688170921000,"updatedTime":1688170921000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":1}]},"readingTime":{"minutes":33.06,"words":9919},"filePathRelative":"knowledgeBase/xiaolinCoding/computerNetworks/TCPChapter/3.2.md","localizedDate":"2023年7月1日","excerpt":"<p>TCP <strong>巨复杂</strong>，它为了保证可靠性，用了巨多的机制来保证，真是个「伟大」的协议，写着写着发现这水太深了。。。</p>\\n<p>相信大家都知道 TCP 是一个可靠传输的协议，那它是如何保证可靠的呢？</p>\\n<p>为了实现可靠性传输，需要考虑很多事情，例如数据的破坏、丢包、重复以及分片顺序混乱等问题。如不能解决这些问题，也就无从谈起可靠传输。</p>\\n<p>那么，<strong>TCP 是通过序列号、确认应答、重发控制、连接管理以及窗口控制等机制实现可靠性传输的。</strong></p>\\n<p>今天，将重点介绍 TCP 的<strong>重传机制、滑动窗口、流量控制、拥塞控制。</strong></p>","autoDesc":true}');export{e as data};
