const e=JSON.parse('{"key":"v-27fbc690","path":"/knowledgeBase/xiaolinCoding/operatingSystem/precessManagement/3.html","title":"竞争与协作","lang":"zh-CN","frontmatter":{"0":"5","1":".","2":"3","3":" ","4":"多","5":"线","6":"程","7":"冲","8":"突","9":"了","10":"怎","11":"么","12":"办","13":"？","description":"对于共享资源，如果没有上锁，在多线程的环境里，那么就可能会发生翻车现场。 竞争与协作 在单核 CPU 系统里，为了实现多个程序同时运行的假象，操作系统通常以时间片调度的方式，让每个进程每次执行一个时间片，时间片用完了就切换下一个进程运行，由于这个时间片的时间很短，于是就造成了「并发」的现象。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/operatingSystem/precessManagement/3.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"竞争与协作"}],["meta",{"property":"og:description","content":"对于共享资源，如果没有上锁，在多线程的环境里，那么就可能会发生翻车现场。 竞争与协作 在单核 CPU 系统里，为了实现多个程序同时运行的假象，操作系统通常以时间片调度的方式，让每个进程每次执行一个时间片，时间片用完了就切换下一个进程运行，由于这个时间片的时间很短，于是就造成了「并发」的现象。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T01:06:26.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-01T01:06:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"竞争与协作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T01:06:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"互斥的概念","slug":"互斥的概念","link":"#互斥的概念","children":[]},{"level":2,"title":"同步的概念","slug":"同步的概念","link":"#同步的概念","children":[]},{"level":2,"title":"锁","slug":"锁","link":"#锁","children":[]},{"level":2,"title":"信号量","slug":"信号量","link":"#信号量","children":[]},{"level":2,"title":"生产者-消费者问题","slug":"生产者-消费者问题","link":"#生产者-消费者问题","children":[]},{"level":2,"title":"哲学家就餐问题","slug":"哲学家就餐问题","link":"#哲学家就餐问题","children":[]},{"level":2,"title":"读者-写者问题","slug":"读者-写者问题","link":"#读者-写者问题","children":[]}],"git":{"createdTime":1688170921000,"updatedTime":1688173586000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":2}]},"readingTime":{"minutes":22.79,"words":6837},"filePathRelative":"knowledgeBase/xiaolinCoding/operatingSystem/precessManagement/3.md","localizedDate":"2023年7月1日","excerpt":"<p><strong>对于共享资源，如果没有上锁，在多线程的环境里，那么就可能会发生翻车现场。</strong><img src=\\"https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010624771.png\\" alt=\\"img\\" loading=\\"lazy\\"></p>\\n<hr>\\n<h1> 竞争与协作</h1>\\n<p>在单核 CPU 系统里，为了实现多个程序同时运行的假象，操作系统通常以时间片调度的方式，让每个进程每次执行一个时间片，时间片用完了就切换下一个进程运行，由于这个时间片的时间很短，于是就造成了「并发」的现象。</p>","autoDesc":true}');export{e as data};
