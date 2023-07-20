const e=JSON.parse('{"key":"v-6954123c","path":"/knowledgeBase/technicalArticleExtract/Spring/SpringIOCContainerSourceCodeAnalysis.html","title":"Spring IOC 容器源码分析","lang":"zh-CN","frontmatter":{"title":"Spring IOC 容器源码分析","author":"javadoop","isOriginal":false,"data":"2023-7-20","description":"原文链接：https://www.javadoop.com/post/design-pattern 作者：Javadoop Spring 最重要的概念是 IOC 和 AOP，本篇文章其实就是要带领大家来分析下 Spring 的 IOC 容器。既然大家平时都要用到 Spring，怎么可以不好好了解 Spring 呢？阅读本文并不能让你成为 Spring 专家，不过一定有助于大家理解 Spring 的很多概念，帮助大家排查应用中和 Spring 相关的一些问题。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/technicalArticleExtract/Spring/SpringIOCContainerSourceCodeAnalysis.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"Spring IOC 容器源码分析"}],["meta",{"property":"og:description","content":"原文链接：https://www.javadoop.com/post/design-pattern 作者：Javadoop Spring 最重要的概念是 IOC 和 AOP，本篇文章其实就是要带领大家来分析下 Spring 的 IOC 容器。既然大家平时都要用到 Spring，怎么可以不好好了解 Spring 呢？阅读本文并不能让你成为 Spring 专家，不过一定有助于大家理解 Spring 的很多概念，帮助大家排查应用中和 Spring 相关的一些问题。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-20T14:40:01.000Z"}],["meta",{"property":"article:author","content":"javadoop"}],["meta",{"property":"article:modified_time","content":"2023-07-20T14:40:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring IOC 容器源码分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-20T14:40:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"javadoop\\"}]}"]]},"headers":[{"level":2,"title":"引言","slug":"引言","link":"#引言","children":[]},{"level":2,"title":"BeanFactory 简介","slug":"beanfactory-简介","link":"#beanfactory-简介","children":[]},{"level":2,"title":"启动过程分析","slug":"启动过程分析","link":"#启动过程分析","children":[{"level":3,"title":"创建 Bean 容器前的准备工作","slug":"创建-bean-容器前的准备工作","link":"#创建-bean-容器前的准备工作","children":[]},{"level":3,"title":"创建 Bean 容器，加载并注册 Bean","slug":"创建-bean-容器-加载并注册-bean","link":"#创建-bean-容器-加载并注册-bean","children":[]},{"level":3,"title":"Bean 容器实例化完成后","slug":"bean-容器实例化完成后","link":"#bean-容器实例化完成后","children":[]},{"level":3,"title":"准备 Bean 容器: prepareBeanFactory","slug":"准备-bean-容器-preparebeanfactory","link":"#准备-bean-容器-preparebeanfactory","children":[]},{"level":3,"title":"初始化所有的 singleton beans","slug":"初始化所有的-singleton-beans","link":"#初始化所有的-singleton-beans","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"id 和 name","slug":"id-和-name","link":"#id-和-name","children":[]},{"level":3,"title":"配置是否允许 Bean 覆盖、是否允许循环依赖","slug":"配置是否允许-bean-覆盖、是否允许循环依赖","link":"#配置是否允许-bean-覆盖、是否允许循环依赖","children":[]},{"level":3,"title":"profile","slug":"profile","link":"#profile","children":[]},{"level":3,"title":"工厂模式生成 Bean","slug":"工厂模式生成-bean","link":"#工厂模式生成-bean","children":[]},{"level":3,"title":"FactoryBean","slug":"factorybean","link":"#factorybean","children":[]},{"level":3,"title":"初始化 Bean 的回调","slug":"初始化-bean-的回调","link":"#初始化-bean-的回调","children":[]},{"level":3,"title":"销毁 Bean 的回调","slug":"销毁-bean-的回调","link":"#销毁-bean-的回调","children":[]},{"level":3,"title":"ConversionService","slug":"conversionservice","link":"#conversionservice","children":[]},{"level":3,"title":"Bean 继承","slug":"bean-继承","link":"#bean-继承","children":[]},{"level":3,"title":"方法注入","slug":"方法注入","link":"#方法注入","children":[]},{"level":3,"title":"BeanPostProcessor","slug":"beanpostprocessor","link":"#beanpostprocessor","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1689864001000,"updatedTime":1689864001000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":1}]},"readingTime":{"minutes":61.75,"words":18525},"filePathRelative":"knowledgeBase/technicalArticleExtract/Spring/SpringIOCContainerSourceCodeAnalysis.md","localizedDate":"2023年7月20日","excerpt":"<blockquote>\\n<p>原文链接：<a href=\\"https://www.javadoop.com/post/design-pattern\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.javadoop.com/post/design-pattern</a></p>\\n<p>作者：Javadoop</p>\\n</blockquote>\\n<p>Spring 最重要的概念是 IOC 和 AOP，本篇文章其实就是要带领大家来分析下 Spring 的 IOC 容器。既然大家平时都要用到 Spring，怎么可以不好好了解 Spring 呢？阅读本文并不能让你成为 Spring 专家，不过一定有助于大家理解 Spring 的很多概念，帮助大家排查应用中和 Spring 相关的一些问题。</p>","autoDesc":true}');export{e as data};
