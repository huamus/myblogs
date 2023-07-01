const e=JSON.parse('{"key":"v-54c76be8","path":"/knowledgeBase/xiaolinCoding/operatingSystem/5.precessManagement/5.5.html","title":"5.5 什么是悲观锁、乐观锁？","lang":"zh-CN","frontmatter":{"title":"5.5 什么是悲观锁、乐观锁？","description":"在编程世界里，「锁」五花八门，每种锁的加锁开销以及应用场景也可能会不同。 如何用好锁，也是程序员的基本素养之一了。 高并发的场景下，如果选对了合适的锁，则会大大提高系统的性能，否则性能会降低。 所以，知道各种锁的开销，以及应用场景是很有必要的。 接下来，就谈一谈常见的这几种锁： img","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/operatingSystem/5.precessManagement/5.5.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"5.5 什么是悲观锁、乐观锁？"}],["meta",{"property":"og:description","content":"在编程世界里，「锁」五花八门，每种锁的加锁开销以及应用场景也可能会不同。 如何用好锁，也是程序员的基本素养之一了。 高并发的场景下，如果选对了合适的锁，则会大大提高系统的性能，否则性能会降低。 所以，知道各种锁的开销，以及应用场景是很有必要的。 接下来，就谈一谈常见的这几种锁： img"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T14:16:49.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-01T14:16:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"5.5 什么是悲观锁、乐观锁？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T14:16:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"CAS 不是乐观锁吗，为什么基于 CAS 实现的自旋锁是悲观锁？","slug":"cas-不是乐观锁吗-为什么基于-cas-实现的自旋锁是悲观锁","link":"#cas-不是乐观锁吗-为什么基于-cas-实现的自旋锁是悲观锁","children":[]}],"git":{"createdTime":1688217081000,"updatedTime":1688221009000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":2}]},"readingTime":{"minutes":14.17,"words":4251},"filePathRelative":"knowledgeBase/xiaolinCoding/operatingSystem/5.precessManagement/5.5.md","localizedDate":"2023年7月1日","excerpt":"<p>在编程世界里，「锁」五花八门，每种锁的加锁开销以及应用场景也可能会不同。</p>\\n<p>如何用好锁，也是程序员的基本素养之一了。</p>\\n<p>高并发的场景下，如果选对了合适的锁，则会大大提高系统的性能，否则性能会降低。</p>\\n<p>所以，知道各种锁的开销，以及应用场景是很有必要的。</p>\\n<p>接下来，就谈一谈常见的这几种锁：</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010642492.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{e as data};