const e=JSON.parse('{"key":"v-6f54c5a6","path":"/knowledgeBase/xiaolinCoding/operatingSystem/memoryManagement/3.html","title":"内存分配的过程是怎样的？","lang":"zh-CN","frontmatter":{"0":"4","1":".","2":"3","3":" ","4":"内","5":"存","6":"满","7":"了","8":"，","9":"会","10":"发","11":"生","12":"什","13":"么","14":"？","description":"面腾讯时，被问了两个内存管理的问题： img img","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/operatingSystem/memoryManagement/3.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"内存分配的过程是怎样的？"}],["meta",{"property":"og:description","content":"面腾讯时，被问了两个内存管理的问题： img img"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T00:22:01.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-01T00:22:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内存分配的过程是怎样的？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T00:22:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"调整文件页和匿名页的回收倾向","slug":"调整文件页和匿名页的回收倾向","link":"#调整文件页和匿名页的回收倾向","children":[]},{"level":2,"title":"尽早触发 kswapd 内核线程异步回收内存","slug":"尽早触发-kswapd-内核线程异步回收内存","link":"#尽早触发-kswapd-内核线程异步回收内存","children":[]},{"level":2,"title":"NUMA 架构下的内存回收策略","slug":"numa-架构下的内存回收策略","link":"#numa-架构下的内存回收策略","children":[]}],"git":{"createdTime":1688170921000,"updatedTime":1688170921000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":1}]},"readingTime":{"minutes":16.81,"words":5044},"filePathRelative":"knowledgeBase/xiaolinCoding/operatingSystem/memoryManagement/3.md","localizedDate":"2023年7月1日","excerpt":"<p>面腾讯时，被问了两个内存管理的问题：</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010613327.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>\\n<figure><img src=\\"https://cdn.nlark.com/yuque/0/2023/png/25684216/1685105377923-bc95c9dc-648b-4e1a-b594-0ab2a655acf9.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{e as data};
