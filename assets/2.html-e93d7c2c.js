const e=JSON.parse('{"key":"v-5f32b719","path":"/knowledgeBase/xiaolinCoding/3.MySQL/4.transactionChapter/2.html","title":"什么是幻读？","lang":"zh-CN","frontmatter":{"0":"2","1":".","2":" ","3":"M","4":"y","5":"S","6":"Q","7":"L","8":" ","9":"可","10":"重","11":"复","12":"读","13":"隔","14":"离","15":"级","16":"别","17":"，","18":"完","19":"全","20":"解","21":"决","22":"幻","23":"读","24":"了","25":"吗","26":"？","description":"MySQL InnoDB 引擎的默认隔离级别虽然是「可重复读」，但是它很大程度上避免幻读现象（并不是完全解决了），解决的方案有两种： 针对快照读（普通 select 语句），是通过 MVCC 方式解决了幻读，因为可重复读隔离级别下，事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，即使中途有其他事务插入了一条数据，是查询不出来这条数据的，所以就很好了避免幻读问题。 针对当前读（select ... for update 等语句），是通过 next-key lock（记录锁+间隙锁）方式解决了幻读，因为当执行 select ... for update 语句的时候，会加上 next-key lock，如果有其他事务在 next-key lock 锁范围内插入了一条记录，那么这个插入语句就会被阻塞，无法成功插入，所以就很好了避免幻读问题。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/3.MySQL/4.transactionChapter/2.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"什么是幻读？"}],["meta",{"property":"og:description","content":"MySQL InnoDB 引擎的默认隔离级别虽然是「可重复读」，但是它很大程度上避免幻读现象（并不是完全解决了），解决的方案有两种： 针对快照读（普通 select 语句），是通过 MVCC 方式解决了幻读，因为可重复读隔离级别下，事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，即使中途有其他事务插入了一条数据，是查询不出来这条数据的，所以就很好了避免幻读问题。 针对当前读（select ... for update 等语句），是通过 next-key lock（记录锁+间隙锁）方式解决了幻读，因为当执行 select ... for update 语句的时候，会加上 next-key lock，如果有其他事务在 next-key lock 锁范围内插入了一条记录，那么这个插入语句就会被阻塞，无法成功插入，所以就很好了避免幻读问题。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-02T14:35:37.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-02T14:35:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是幻读？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-02T14:35:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"第一个发生幻读现象的场景","slug":"第一个发生幻读现象的场景","link":"#第一个发生幻读现象的场景","children":[]},{"level":2,"title":"第二个发生幻读现象的场景","slug":"第二个发生幻读现象的场景","link":"#第二个发生幻读现象的场景","children":[]}],"git":{"createdTime":1688308537000,"updatedTime":1688308537000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":1}]},"readingTime":{"minutes":8.12,"words":2435},"filePathRelative":"knowledgeBase/xiaolinCoding/3.MySQL/4.transactionChapter/2.md","localizedDate":"2023年7月2日","excerpt":"<p>MySQL InnoDB 引擎的默认隔离级别虽然是「可重复读」，但是它很大程度上避免幻读现象（并不是完全解决了），解决的方案有两种：</p>\\n<ul>\\n<li>针对<strong>快照读</strong>（普通 select 语句），是<strong>通过 MVCC 方式解决了幻读</strong>，因为可重复读隔离级别下，事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，即使中途有其他事务插入了一条数据，是查询不出来这条数据的，所以就很好了避免幻读问题。</li>\\n<li>针对<strong>当前读</strong>（select ... for update 等语句），是<strong>通过 next-key lock（记录锁+间隙锁）方式解决了幻读</strong>，因为当执行 select ... for update 语句的时候，会加上 next-key lock，如果有其他事务在 next-key lock 锁范围内插入了一条记录，那么这个插入语句就会被阻塞，无法成功插入，所以就很好了避免幻读问题。</li>\\n</ul>","autoDesc":true}');export{e as data};
