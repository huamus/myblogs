const t=JSON.parse('{"key":"v-4af71331","path":"/knowledgeBase/xiaolinCoding/computerNetworks/HTTPChapter/2.1.html","title":"2.1 HTTP 常见面试题","lang":"zh-CN","frontmatter":{"title":"2.1 HTTP 常见面试题","description":"在面试过程中，HTTP 被提问的概率还是比较高的。 小林我搜集了 6 大类 HTTP 面试常问的题目，同时这 6 大类题跟 HTTP 的发展和演变关联性是比较大的，通过问答 + 图解的形式由浅入深的方式帮助大家进一步的学习和理解 HTTP 。 HTTP 基本概念 Get 与 Post HTTP 特性 HTTP 缓存技术 HTTPS 与 HTTP HTTP/1.1、HTTP/2、HTTP/3 演变","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/computerNetworks/HTTPChapter/2.1.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"2.1 HTTP 常见面试题"}],["meta",{"property":"og:description","content":"在面试过程中，HTTP 被提问的概率还是比较高的。 小林我搜集了 6 大类 HTTP 面试常问的题目，同时这 6 大类题跟 HTTP 的发展和演变关联性是比较大的，通过问答 + 图解的形式由浅入深的方式帮助大家进一步的学习和理解 HTTP 。 HTTP 基本概念 Get 与 Post HTTP 特性 HTTP 缓存技术 HTTPS 与 HTTP HTTP/1.1、HTTP/2、HTTP/3 演变"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T02:58:21.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-06-25T02:58:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2.1 HTTP 常见面试题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T02:58:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[{"level":2,"title":"HTTP 是什么？","slug":"http-是什么","link":"#http-是什么","children":[]},{"level":2,"title":"HTTP 常见的状态码有哪些？","slug":"http-常见的状态码有哪些","link":"#http-常见的状态码有哪些","children":[]},{"level":2,"title":"HTTP 常见字段有哪些？","slug":"http-常见字段有哪些","link":"#http-常见字段有哪些","children":[]},{"level":2,"title":"GET 和 POST 有什么区别？","slug":"get-和-post-有什么区别","link":"#get-和-post-有什么区别","children":[]},{"level":2,"title":"GET 和 POST 方法都是安全和幂等的吗？","slug":"get-和-post-方法都是安全和幂等的吗","link":"#get-和-post-方法都是安全和幂等的吗","children":[]},{"level":2,"title":"HTTP 缓存有哪些实现方式？","slug":"http-缓存有哪些实现方式","link":"#http-缓存有哪些实现方式","children":[]},{"level":2,"title":"什么是强制缓存？","slug":"什么是强制缓存","link":"#什么是强制缓存","children":[]},{"level":2,"title":"什么是协商缓存？","slug":"什么是协商缓存","link":"#什么是协商缓存","children":[]},{"level":2,"title":"HTTP/1.1 的优点有哪些？","slug":"http-1-1-的优点有哪些","link":"#http-1-1-的优点有哪些","children":[]},{"level":2,"title":"HTTP/1.1 的缺点有哪些？","slug":"http-1-1-的缺点有哪些","link":"#http-1-1-的缺点有哪些","children":[]},{"level":2,"title":"HTTP/1.1 的性能如何？","slug":"http-1-1-的性能如何","link":"#http-1-1-的性能如何","children":[]},{"level":2,"title":"HTTP 与 HTTPS 有哪些区别？","slug":"http-与-https-有哪些区别","link":"#http-与-https-有哪些区别","children":[]},{"level":2,"title":"HTTPS 解决了 HTTP 的哪些问题？","slug":"https-解决了-http-的哪些问题","link":"#https-解决了-http-的哪些问题","children":[]},{"level":2,"title":"HTTPS 是如何建立连接的？其间交互了什么？","slug":"https-是如何建立连接的-其间交互了什么","link":"#https-是如何建立连接的-其间交互了什么","children":[]},{"level":2,"title":"HTTPS 的应用数据是如何保证完整性的？","slug":"https-的应用数据是如何保证完整性的","link":"#https-的应用数据是如何保证完整性的","children":[]},{"level":2,"title":"HTTPS 一定安全可靠吗？","slug":"https-一定安全可靠吗","link":"#https-一定安全可靠吗","children":[]},{"level":2,"title":"HTTP/1.1 相比 HTTP/1.0 提高了什么性能？","slug":"http-1-1-相比-http-1-0-提高了什么性能","link":"#http-1-1-相比-http-1-0-提高了什么性能","children":[]},{"level":2,"title":"HTTP/2 做了什么优化？","slug":"http-2-做了什么优化","link":"#http-2-做了什么优化","children":[]},{"level":2,"title":"HTTP/3 做了哪些优化？","slug":"http-3-做了哪些优化","link":"#http-3-做了哪些优化","children":[]},{"level":2,"title":"https和http相比，就是传输的内容多了对称加密，可以这么理解吗？","slug":"https和http相比-就是传输的内容多了对称加密-可以这么理解吗","link":"#https和http相比-就是传输的内容多了对称加密-可以这么理解吗","children":[]},{"level":2,"title":"我看文中 TLS 和 SSL 没有做区分，这两个需要区分吗？","slug":"我看文中-tls-和-ssl-没有做区分-这两个需要区分吗","link":"#我看文中-tls-和-ssl-没有做区分-这两个需要区分吗","children":[]},{"level":2,"title":"为啥 ssl 的握手是 4 次？","slug":"为啥-ssl-的握手是-4-次","link":"#为啥-ssl-的握手是-4-次","children":[]}],"git":{"createdTime":1687661901000,"updatedTime":1687661901000,"contributors":[{"name":"huamus","email":"huamus","commits":1}]},"readingTime":{"minutes":58.13,"words":17438},"filePathRelative":"knowledgeBase/xiaolinCoding/computerNetworks/HTTPChapter/2.1.md","localizedDate":"2023年6月25日","excerpt":"<p>在面试过程中，HTTP 被提问的概率还是比较高的。</p>\\n<p>小林我搜集了 6 大类 HTTP 面试常问的题目，同时这 6 大类题跟 <strong>HTTP 的发展和演变</strong>关联性是比较大的，通过<strong>问答 + 图解</strong>的形式<strong>由浅入深</strong>的方式帮助大家进一步的学习和理解 HTTP 。</p>\\n<ol>\\n<li>HTTP 基本概念</li>\\n<li>Get 与 Post</li>\\n<li>HTTP 特性</li>\\n<li>HTTP 缓存技术</li>\\n<li>HTTPS 与 HTTP</li>\\n<li>HTTP/1.1、HTTP/2、HTTP/3 演变</li>\\n</ol>","autoDesc":true}');export{t as data};
