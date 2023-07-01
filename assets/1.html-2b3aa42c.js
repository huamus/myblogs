import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as t,f as n}from"./app-e50d80a0.js";const s={},r=n(`<p>Linux 网络协议栈是根据 TCP/IP 模型来实现的，TCP/IP 模型由应用层、传输层、网络层和网络接口层，共四层组成，每一层都有各自的职责。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801936.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>应用程序要发送数据包时，通常是通过 socket 接口，于是就会发生系统调用，把应用层的数据拷贝到内核里的 socket 层，接着由网络协议栈从上到下逐层处理后，最后才会送到网卡发送出去。</strong></p><p>而对于接收网络包时，同样也要经过网络协议逐层处理，不过处理的方向与发送数据时是相反的，也就是从下到上的逐层处理，最后才送到应用程序。</p><p>网络的速度往往跟用户体验是挂钩的，那我们又该用什么指标来衡量 Linux 的网络性能呢？以及如何分析网络问题呢？</p><p>这次，我们就来说这些。</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1685106032554-c845b8c4-70a7-435b-b14d-fc9b4651c7e0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><hr><h1 id="性能指标有哪些" tabindex="-1"><a class="header-anchor" href="#性能指标有哪些" aria-hidden="true">#</a> 性能指标有哪些？</h1><p>通常是以 4 个指标来衡量网络的性能，分别是带宽、延时、吞吐率、PPS（Packet Per Second），它们表示的意义如下：</p><ul><li><em>带宽</em>，表示<strong>链路的最大传输速率</strong>，单位是 b/s （比特 / 秒），带宽越大，其传输能力就越强。</li><li><em>延时</em>，表示<strong>请求数据包发送后，收到对端响应，所需要的时间延迟</strong>。不同的场景有着不同的含义，比如可以表示建立 TCP 连接所需的时间延迟，或一个数据包往返所需的时间延迟。</li><li><em>吞吐率</em>，<strong>表示单位时间内成功传输的数据量</strong>，单位是 b/s（比特 / 秒）或者 B/s（字节 / 秒），吞吐受带宽限制，带宽越大，吞吐率的上限才可能越高。</li><li><em>PPS</em>，全称是 Packet Per Second（包 / 秒），表示<strong>以网络包为单位的传输速率，一般用来评估系统对于网络的转发能力。</strong></li></ul><p>当然，除了以上这四种基本的指标，还有一些其他常用的性能指标，比如：</p><ul><li><em>网络的可用性</em>，表示网络能否正常通信；</li><li><em>并发连接数</em>，表示 TCP 连接数量；</li><li><em>丢包率</em>，表示所丢失数据包数量占所发送数据组的比率；</li><li><em>重传率</em>，表示重传网络包的比例；</li></ul><hr><h1 id="网络配置如何看" tabindex="-1"><a class="header-anchor" href="#网络配置如何看" aria-hidden="true">#</a> 网络配置如何看？</h1><p><strong>要想知道网络的配置和状态，我们可以使用</strong> <strong>ifconfig</strong> <strong>或者</strong> <strong>ip</strong> <strong>命令来查看。</strong></p><p>这两个命令功能都差不多，不过它们属于不同的软件包，ifconfig 属于 net-tools 软件包，ip 属于 iproute2 软件包，我的印象中 net-tools 软件包没有人继续维护了，而 iproute2 软件包是有开发者依然在维护，所以更推荐你使用 ip 工具。</p><p>学以致用，那就来使用这两个命令，来查看网口 eth0 的配置等信息：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801036.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>虽然这两个命令输出的格式不尽相同，但是输出的内容基本相同，比如都包含了 IP 地址、子网掩码、MAC 地址、网关地址、MTU 大小、网口的状态以及网络包收发的统计信息，下面就来说说这些信息，它们都与网络性能有一定的关系。</p><p>第一，网口的连接状态标志。其实也就是表示对应的网口是否连接到交换机或路由器等设备，如果 ifconfig 输出中看到有 RUNNING，或者 ip 输出中有 LOWER_UP，则说明物理网络是连通的，如果看不到，则表示网口没有接网线。</p><p>第二，MTU 大小。默认值是 1500 字节，其作用主要是限制网络包的大小，如果 IP 层有一个数据报要传，而且网络包的长度比链路层的 MTU 还大，那么 IP 层就需要进行分片，即把数据报分成若干片，这样每一片就都小于 MTU。事实上，每个网络的链路层 MTU 可能会不一样，所以你可能需要调大或者调小 MTU 的数值。</p><p>第三，网口的 IP 地址、子网掩码、MAC 地址、网关地址。这些信息必须要配置正确，网络功能才能正常工作。</p><p>第四，网络包收发的统计信息。通常有网络收发的字节数、包数、错误数以及丢包情况的信息，如果 TX（发送） 和 RX（接收） 部分中 errors、dropped、overruns、carrier 以及 collisions 等指标不为 0 时，则说明网络发送或者接收出问题了，这些出错统计信息的指标意义如下：</p><ul><li><em>errors</em> 表示发生错误的数据包数，比如校验错误、帧同步错误等；</li><li><em>dropped</em> 表示丢弃的数据包数，即数据包已经收到了 Ring Buffer（这个缓冲区是在内核内存中，更具体一点是在网卡驱动程序里），但因为系统内存不足等原因而发生的丢包；</li><li><em>overruns</em> 表示超限数据包数，即网络接收/发送速度过快，导致 Ring Buffer 中的数据包来不及处理，而导致的丢包，因为过多的数据包挤压在 Ring Buffer，这样 Ring Buffer 很容易就溢出了；</li><li><em>carrier</em> 表示发生 carrirer 错误的数据包数，比如双工模式不匹配、物理电缆出现问题等；</li><li><em>collisions</em> 表示冲突、碰撞数据包数；</li></ul><p>ifconfig 和 ip 命令只显示的是网口的配置以及收发数据包的统计信息，而看不到协议栈里的信息，那接下来就来看看如何查看协议栈里的信息。</p><hr><h1 id="socket-信息如何查看" tabindex="-1"><a class="header-anchor" href="#socket-信息如何查看" aria-hidden="true">#</a> socket 信息如何查看？</h1><p>我们可以<strong>使用</strong> <strong>netstat</strong> <strong>或者</strong> <strong>ss</strong>**，这两个命令查看 socket、网络协议栈、网口以及路由表的信息。**</p><p>虽然 netstat 与 ss 命令查看的信息都差不多，但是如果在生产环境中要查看这类信息的时候，尽量不要使用 netstat 命令，因为它的性能不好，在系统比较繁忙的情况下，如果频繁使用 netstat 命令则会对性能的开销雪上加霜，所以更推荐你使用性能更好的 ss 命令。</p><p>从下面这张图，你可以看到这两个命令的输出内容：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801919.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>可以发现，输出的内容都差不多， 比如都包含了 socket 的状态（<em>State</em>）、接收队列（<em>Recv-Q</em>）、发送队列（<em>Send-Q</em>）、本地地址（<em>Local Address</em>）、远端地址（<em>Foreign Address</em>）、进程 PID 和进程名称（<em>PID/Program name</em>）等。</p><p>接收队列（<em>Recv-Q</em>）和发送队列（<em>Send-Q</em>）比较特殊，在不同的 socket 状态。它们表示的含义是不同的。</p><p>当 socket 状态处于 Established时：</p><ul><li><em>Recv-Q</em> 表示 socket 缓冲区中还没有被应用程序读取的字节数；</li><li><em>Send-Q</em> 表示 socket 缓冲区中还没有被远端主机确认的字节数；</li></ul><p>而当 socket 状态处于 Listen 时：</p><ul><li><em>Recv-Q</em> 表示全连接队列的长度；</li><li><em>Send-Q</em> 表示全连接队列的最大长度；</li></ul><p>在 TCP 三次握手过程中，当服务器收到客户端的 SYN 包后，内核会把该连接存储到半连接队列，然后再向客户端发送 SYN+ACK 包，接着客户端会返回 ACK，服务端收到第三次握手的 ACK 后，内核会把连接从半连接队列移除，然后创建新的完全的连接，并将其增加到全连接队列 ，等待进程调用 accept() 函数时把连接取出来。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801958.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>也就说，全连接队列指的是服务器与客户端完了 TCP 三次握手后，还没有被 accept() 系统调用取走连接的队列。</p><p>那对于协议栈的统计信息，依然还是使用 netstat 或 ss，它们查看统计信息的命令如下：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801009.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>ss 命令输出的统计信息相比 netsat 比较少，ss 只显示已经连接（<em>estab</em>）、关闭（<em>closed</em>）、孤儿（<em>orphaned</em>） socket 等简要统计。</p><p>而 netstat 则有更详细的网络协议栈信息，比如上面显示了 TCP 协议的主动连接（<em>active connections openings</em>）、被动连接（<em>passive connection openings</em>）、失败重试（<em>failed connection attempts</em>）、发送（<em>segments send out</em>）和接收（<em>segments received</em>）的分段数量等各种信息。</p><hr><h1 id="网络吞吐率和-pps-如何查看" tabindex="-1"><a class="header-anchor" href="#网络吞吐率和-pps-如何查看" aria-hidden="true">#</a> 网络吞吐率和 PPS 如何查看？</h1><p>可以<strong>使用</strong> <strong>sar</strong> <strong>命令当前网络的吞吐率和 PPS，用法是给</strong> <strong>sar</strong> <strong>增加</strong> <strong>-n</strong> <strong>参数就可以查看网络的统计信息</strong>，比如</p><ul><li>sar -n DEV，显示网口的统计数据；</li><li>sar -n EDEV，显示关于网络错误的统计数据；</li><li>sar -n TCP，显示 TCP 的统计数据</li></ul><p>比如，我通过 sar 命令获取了网口的统计信息：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801916.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>它们的含义：</p><ul><li>rxpck/s 和 txpck/s 分别是接收和发送的 PPS，单位为包 / 秒。</li><li>rxkB/s 和 txkB/s 分别是接收和发送的吞吐率，单位是 KB/ 秒。</li><li>rxcmp/s 和 txcmp/s 分别是接收和发送的压缩数据包数，单位是包 / 秒。</li></ul><p><strong>对于带宽，我们可以使用</strong> <strong>ethtool</strong> <strong>命令来查询</strong>，它的单位通常是 Gb/s 或者 Mb/s，不过注意这里<strong>小写字母</strong> <strong>b</strong> <strong>，表示比特而不是字节</strong>。我们通常提到的千兆网卡、万兆网卡等，单位也都是比特（<em>bit</em>）。如下你可以看到， eth0 网卡就是一个千兆网卡：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ethtool</span> eth0 <span class="token operator">|</span> <span class="token function">grep</span> Speed
  Speed: 1000Mb/s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="连通性和延时如何查看" tabindex="-1"><a class="header-anchor" href="#连通性和延时如何查看" aria-hidden="true">#</a> 连通性和延时如何查看？</h1><p><strong>要测试本机与远程主机的连通性和延时，通常是使用</strong> <strong>ping</strong> <strong>命令，它是基于 ICMP 协议的，工作在网络层。</strong></p><p>比如，如果要测试本机到 192.168.12.20 IP 地址的连通性和延时：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010801318.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>显示的内容主要包含 icmp_seq（ICMP 序列号）、TTL（生存时间，或者跳数）以及 time （往返延时），而且最后会汇总本次测试的情况，如果网络没有丢包，packet loss 的百分比就是 0。</p><p>不过，需要注意的是，<strong>ping</strong> <strong>不通服务器并不代表 HTTP 请求也不通，因为有的服务器的防火墙是会禁用 ICMP 协议的。</strong></p>`,62),o=[r];function a(g,p){return i(),t("div",null,o)}const l=e(s,[["render",a],["__file","1.html.vue"]]);export{l as default};
