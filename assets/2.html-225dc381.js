const e=JSON.parse('{"key":"v-0e494fca","path":"/knowledgeBase/xiaolinCoding/4.Redis/4.dataPersistenceChapter/2.html","title":"2. AOF 持久化是怎么实现的？","lang":"zh-CN","frontmatter":{"title":"2. AOF 持久化是怎么实现的？","description":"img AOF 日志 试想一下，如果 Redis 每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里，然后重启 Redis 的时候，先去读取这个文件里的命令，并且执行它，这不就相当于恢复了缓存数据了吗？ img","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/4.Redis/4.dataPersistenceChapter/2.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"2. AOF 持久化是怎么实现的？"}],["meta",{"property":"og:description","content":"img AOF 日志 试想一下，如果 Redis 每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里，然后重启 Redis 的时候，先去读取这个文件里的命令，并且执行它，这不就相当于恢复了缓存数据了吗？ img"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-02T14:35:37.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-02T14:35:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2. AOF 持久化是怎么实现的？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-02T14:35:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":3,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1688308537000,"updatedTime":1688308537000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":1}]},"readingTime":{"minutes":15.63,"words":4690},"filePathRelative":"knowledgeBase/xiaolinCoding/4.Redis/4.dataPersistenceChapter/2.md","localizedDate":"2023年7月2日","excerpt":"<figure><img src=\\"https://raw.githubusercontent.com/huamus/picture-bed/main/img202307020750342.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>\\n<h1> AOF 日志</h1>\\n<p>试想一下，如果 Redis 每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里，然后重启 Redis 的时候，先去读取这个文件里的命令，并且执行它，这不就相当于恢复了缓存数据了吗？</p>\\n<figure><img src=\\"https://cdn.nlark.com/yuque/0/2023/png/25684216/1685106148336-2dcd58df-db3b-4ee1-a66f-5706c0bf9e7e.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{e as data};
