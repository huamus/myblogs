const e=JSON.parse('{"key":"v-8260e4e2","path":"/knowledgeBase/xiaolinCoding/operatingSystem/9.networkSystem/9.1.html","title":"9.1 什么是零拷贝？","lang":"zh-CN","frontmatter":{"title":"9.1 什么是零拷贝？","description":"磁盘可以说是计算机系统最慢的硬件之一，读写速度相差内存 10 倍以上，所以针对优化磁盘的技术非常的多，比如零拷贝、直接 I/O、异步 I/O 等等。这些优化的目的就是为了提高系统的吞吐量，另外操作系统内核中的磁盘高速缓存区，可以有效的减少磁盘的访问次数。 这次，我们就以「文件传输」作为切入点，来分析 I/O 工作方式，以及如何优化传输文件的性能。 img","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/operatingSystem/9.networkSystem/9.1.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"9.1 什么是零拷贝？"}],["meta",{"property":"og:description","content":"磁盘可以说是计算机系统最慢的硬件之一，读写速度相差内存 10 倍以上，所以针对优化磁盘的技术非常的多，比如零拷贝、直接 I/O、异步 I/O 等等。这些优化的目的就是为了提高系统的吞吐量，另外操作系统内核中的磁盘高速缓存区，可以有效的减少磁盘的访问次数。 这次，我们就以「文件传输」作为切入点，来分析 I/O 工作方式，以及如何优化传输文件的性能。 img"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T14:16:49.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-01T14:16:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"9.1 什么是零拷贝？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T14:16:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"mmap + write","slug":"mmap-write","link":"#mmap-write","children":[]},{"level":2,"title":"sendfile","slug":"sendfile","link":"#sendfile","children":[]},{"level":2,"title":"使用零拷贝技术的项目","slug":"使用零拷贝技术的项目","link":"#使用零拷贝技术的项目","children":[]}],"git":{"createdTime":1688217081000,"updatedTime":1688221009000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":2}]},"readingTime":{"minutes":19.63,"words":5890},"filePathRelative":"knowledgeBase/xiaolinCoding/operatingSystem/9.networkSystem/9.1.md","localizedDate":"2023年7月1日","excerpt":"<p>磁盘可以说是计算机系统最慢的硬件之一，读写速度相差内存 10 倍以上，所以针对优化磁盘的技术非常的多，比如零拷贝、直接 I/O、异步 I/O 等等。这些优化的目的就是为了提高系统的吞吐量，另外操作系统内核中的磁盘高速缓存区，可以有效的减少磁盘的访问次数。</p>\\n<p>这次，我们就以「文件传输」作为切入点，来分析 I/O 工作方式，以及如何优化传输文件的性能。</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010724150.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{e as data};