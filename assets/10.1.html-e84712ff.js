const t=JSON.parse('{"key":"v-7690ca03","path":"/knowledgeBase/xiaolinCoding/operatingSystem/10.LinuxCommand/10.1.html","title":"性能指标有哪些？","lang":"zh-CN","frontmatter":{"0":"1","1":"0","2":".","3":"1","4":" ","5":"如","6":"何","7":"查","8":"看","9":"网","10":"络","11":"的","12":"性","13":"能","14":"指","15":"标","16":"？","description":"Linux 网络协议栈是根据 TCP/IP 模型来实现的，TCP/IP 模型由应用层、传输层、网络层和网络接口层，共四层组成，每一层都有各自的职责。 img 应用程序要发送数据包时，通常是通过 socket 接口，于是就会发生系统调用，把应用层的数据拷贝到内核里的 socket 层，接着由网络协议栈从上到下逐层处理后，最后才会送到网卡发送出去。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/myblogs/knowledgeBase/xiaolinCoding/operatingSystem/10.LinuxCommand/10.1.html"}],["meta",{"property":"og:site_name","content":"huamus"}],["meta",{"property":"og:title","content":"性能指标有哪些？"}],["meta",{"property":"og:description","content":"Linux 网络协议栈是根据 TCP/IP 模型来实现的，TCP/IP 模型由应用层、传输层、网络层和网络接口层，共四层组成，每一层都有各自的职责。 img 应用程序要发送数据包时，通常是通过 socket 接口，于是就会发生系统调用，把应用层的数据拷贝到内核里的 socket 层，接着由网络协议栈从上到下逐层处理后，最后才会送到网卡发送出去。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T13:11:21.000Z"}],["meta",{"property":"article:author","content":"huamus"}],["meta",{"property":"article:modified_time","content":"2023-07-01T13:11:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"性能指标有哪些？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T13:11:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"huamus\\",\\"url\\":\\"https://huamus.github.io/mynotes/\\"}]}"]]},"headers":[],"git":{"createdTime":1688217081000,"updatedTime":1688217081000,"contributors":[{"name":"huamus","email":"1943805462@qq.com","commits":1}]},"readingTime":{"minutes":8.48,"words":2543},"filePathRelative":"knowledgeBase/xiaolinCoding/operatingSystem/10.LinuxCommand/10.1.md","localizedDate":"2023年7月1日","excerpt":"<p>Linux 网络协议栈是根据 TCP/IP 模型来实现的，TCP/IP 模型由应用层、传输层、网络层和网络接口层，共四层组成，每一层都有各自的职责。</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801936.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>\\n<p><strong>应用程序要发送数据包时，通常是通过 socket 接口，于是就会发生系统调用，把应用层的数据拷贝到内核里的 socket 层，接着由网络协议栈从上到下逐层处理后，最后才会送到网卡发送出去。</strong></p>","autoDesc":true}');export{t as data};
