import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as s,a as i,b as t,d as l,f as n}from"./app-e50d80a0.js";const e={},a=n('<p>先来看看一则小故事</p><p>我们写好的一行行代码，为了让其工作起来，我们还得把它送进城（<strong>进程</strong>）里，那既然进了城里，那肯定不能胡作非为了。</p><p>城里人有城里人的规矩，城中有个专门管辖你们的城管（<strong>操作系统</strong>），人家让你休息就休息，让你工作就工作，毕竟摊位不多，每个人都要占这个摊位来工作，城里要工作的人多着去了。</p><p>所以城管为了公平起见，它使用一种策略（<strong>调度</strong>）方式，给每个人一个固定的工作时间（<strong>时间片</strong>），时间到了就会通知你去休息而换另外一个人上场工作。</p><p>另外，在休息时候你也不能偷懒，要记住工作到哪了，不然下次到你工作了，你忘记工作到哪了，那还怎么继续？</p><p>有的人，可能还进入了县城（<strong>线程</strong>）工作，这里相对轻松一些，在休息的时候，要记住的东西相对较少，而且还能共享城里的资源。</p><p>“哎哟，难道本文内容是进程和线程？”</p><p>可以，聪明的你猜出来了，也不枉费我瞎编乱造的故事了。</p><p>进程和线程对于写代码的我们，真的天天见、日日见了，但见的多不代表你就熟悉它们，比如简单问你一句，你知道它们的工作原理和区别吗？</p><p>不知道没关系，今天就要跟大家讨论<strong>操作系统的进程和线程</strong>。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010620982.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>TIP</strong></p><p>先强调一下，我们本篇讲的主要都是操作系统理论知识，偏大学计算机专业课上的那种，并不是讲解 Linux 或 Windows 操作系统的实现方式，所以大家要区别一下。</p><p>想让了解 Linux 或 Windows 操作系统的具体实现，得去看这些操作系统的实现原理或者源码书籍。</p><hr><h1 id="进程" tabindex="-1"><a class="header-anchor" href="#进程" aria-hidden="true">#</a> 进程</h1><p>我们编写的<strong>代码只是一个存储在硬盘的静态文件，通过编译后就会生成二进制可执行文件，当我们运行这个可执行文件后，它会被装载到内存中，接着 CPU 会执行程序中的每一条指令，那么这个<strong><strong>运行中的程序，就被称为「进程」（Process）</strong></strong>。</strong></p><p>现在我们考虑有一个会读取硬盘文件数据的程序被执行了，那么当运行到读取文件的指令时，就会去从硬盘读取数据，但是硬盘的读写速度是非常慢的，那么在这个时候，如果 CPU 傻傻的等硬盘返回数据的话，那 CPU 的利用率是非常低的。</p><p>所以，当进程要从硬盘读取数据时，CPU 不需要阻塞等待数据的返回，而是去执行另外的进程。当硬盘数据返回时，CPU 会收到个<strong>中断</strong>，于是 CPU 再继续运行这个进程。</p><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/25684216/1672210349574-e36f2dd5-780c-4f14-84b4-ca4c75b08c08.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这种<strong>多个程序、交替执行</strong>的思想，就有 CPU 管理多个进程的初步想法。</p><p>对于一个支持多进程的系统，CPU 会从一个进程快速切换至另一个进程，其间每个进程各运行几十或几百个毫秒。</p><p>虽然单核的 CPU 在某一个瞬间，只能运行一个进程。但在 1 秒钟期间，它可能会运行多个进程，这样就产生<strong>并行的错觉</strong>，实际上这是<strong>并发</strong>。</p><p>并发和并行有什么区别？</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010620897.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>进程与程序的关系的类比</p><p>到了晚饭时间，一对小情侣肚子都咕咕叫了，于是男生见机行事，就想给女生做晚饭，所以他就在网上找了辣子鸡的菜谱，接着买了一些鸡肉、辣椒、香料等材料，然后边看边学边做这道菜。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010620856.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>突然，女生说她想喝可乐，那么男生只好把做菜的事情暂停一下，并在手机菜谱标记做到哪一个步骤，把状态信息记录了下来。</p><p>然后男生听从女生的指令，跑去下楼买了一瓶冰可乐后，又回到厨房继续做菜。</p><p><strong>这体现了，CPU 可以从一个进程（做菜）切换到另外一个进程（买可乐），在切换前必须要记录当前进程中运行的状态信息，以备下次切换回来的时候可以恢复执行。</strong></p><p>所以，可以发现进程有着「<strong>运行 - 暂停 - 运行</strong>」的活动规律。</p><h2 id="进程的状态" tabindex="-1"><a class="header-anchor" href="#进程的状态" aria-hidden="true">#</a> 进程的状态</h2><p>进程有着「运行 - 暂停 - 运行」的活动规律。一般说来，一个进程并不是自始至终连续不停地运行的，它与并发执行中的其他进程的执行是相互制约的。</p><p>它有时处于运行状态，有时又由于某种原因而暂停运行处于等待状态，当使它暂停的原因消失后，它又进入准备运行状态。</p><p>所以，<strong>在一个进程的活动期间至少具备三种基本状态，即运行状态、就绪状态、阻塞状态。</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010620875.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>上图中各个状态的意义：</p><ul><li>运行状态（<em>Running</em>）：该时刻进程占用 CPU；</li><li>就绪状态（<em>Ready</em>）：可运行，由于其他进程处于运行状态而暂时停止运行；</li><li>阻塞状态（<em>Blocked</em>）：该进程正在等待某一事件发生（如等待输入/输出操作的完成）而暂时停止运行，这时，即使给它CPU控制权，它也无法运行；</li></ul><p>当然，进程还有另外两个基本状态：</p><ul><li>创建状态（<em>new</em>）：进程正在被创建时的状态；</li><li>结束状态（<em>Exit</em>）：进程正在从系统中消失时的状态；</li></ul><p>于是，一个完整的进程状态的变迁如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010620902.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>再来详细说明一下进程的状态变迁：</p><ul><li><em>NULL -&gt; 创建状态</em>：一个新进程被创建时的第一个状态；</li><li><em>创建状态 -&gt; 就绪状态</em>：当进程被创建完成并初始化后，一切就绪准备运行时，变为就绪状态，这个过程是很快的；</li><li><em>就绪态 -&gt; 运行状态</em>：处于就绪状态的进程被操作系统的进程调度器选中后，就分配给 CPU 正式运行该进程；</li><li><em>运行状态 -&gt; 结束状态</em>：当进程已经运行完成或出错时，会被操作系统作结束状态处理；</li><li><em>运行状态 -&gt; 就绪状态</em>：处于运行状态的进程在运行过程中，由于分配给它的运行时间片用完，操作系统会把该进程变为就绪态，接着从就绪态选中另外一个进程运行；</li><li><em>运行状态 -&gt; 阻塞状态</em>：当进程请求某个事件且必须等待时，例如请求 I/O 事件；</li><li><em>阻塞状态 -&gt; 就绪状态</em>：当进程要等待的事件完成时，它从阻塞状态变到就绪状态；</li></ul><p>如果有大量处于阻塞状态的进程，进程可能会占用着物理内存空间，显然不是我们所希望的，毕竟物理内存空间是有限的，被阻塞状态的进程占用着物理内存就一种浪费物理内存的行为。</p><p>所以，<strong>在虚拟内存管理的操作系统中，通常会把阻塞状态的进程的物理内存空间换出到硬盘，等需要再次运行的时候，再从硬盘换入到物理内存。</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621088.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>那么，就需要一个新的状态，来<strong>描述进程没有占用实际的物理内存空间的情况，这个状态就是挂起状态</strong>。这跟阻塞状态不一样，阻塞状态是等待某个事件的返回。</p><p>另外，挂起状态可以分为两种：</p><ul><li>阻塞挂起状态：进程在外存（硬盘）并等待某个事件的出现；</li><li>就绪挂起状态：进程在外存（硬盘），但只要进入内存，即可立刻运行；</li></ul><p>这两种挂起状态加上前面的五种状态，就变成了七种状态变迁（留给我的颜色不多了），见如下图：</p><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/25684216/1672210351031-0ac44ca4-3364-44bf-acc9-8e7e6be30bac.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>导致进程挂起的原因不只是因为进程所使用的内存空间不在物理内存，还包括如下情况：</p><ul><li>通过 sleep 让进程间歇性挂起，其工作原理是设置一个定时器，到期后唤醒进程。</li><li>用户希望挂起一个程序的执行，比如在 Linux 中用 Ctrl+Z 挂起进程；</li></ul><h2 id="进程的控制结构" tabindex="-1"><a class="header-anchor" href="#进程的控制结构" aria-hidden="true">#</a> 进程的控制结构</h2><p>在操作系统中，是用<strong>进程控制块</strong>（<em>process control block，PCB</em>）数据结构来描述进程的。</p><p><strong>PCB 是进程存在的唯一标识</strong>，这意味着一个进程的存在，必然会有一个 PCB，如果进程消失了，那么 PCB 也会随之消失。</p><p>PCB 具体包含什么信息呢？</p><p><strong>进程描述信息：</strong></p><ul><li>进程标识符：标识各个进程，每个进程都有一个并且唯一的标识符；</li><li>用户标识符：进程归属的用户，用户标识符主要为共享和保护服务；</li></ul><p><strong>进程控制和管理信息：</strong></p><ul><li>进程当前状态，如 new、ready、running、waiting 或 blocked 等；</li><li>进程优先级：进程抢占 CPU 时的优先级；</li></ul><p><strong>资源分配清单：</strong></p><ul><li>有关内存地址空间或虚拟地址空间的信息，所打开文件的列表和所使用的 I/O 设备信息。</li></ul><p><strong>CPU 相关信息：</strong></p><ul><li>CPU 中各个寄存器的值，当进程被切换时，CPU 的状态信息都会被保存在相应的 PCB 中，以便进程重新执行时，能从断点处继续执行。</li></ul><p>可见，PCB 包含信息还是比较多的。</p><p>每个 PCB 是如何组织的呢？</p><p>**通常是通过<strong><strong>链表</strong></strong>的方式进行组织，把具有<strong><strong>相同状态的进程链在一起，组成各种队列</strong></strong>。**比如：</p><ul><li>将所有处于就绪状态的进程链在一起，称为<strong>就绪队列</strong>；</li><li>把所有因等待某事件而处于等待状态的进程链在一起就组成各种<strong>阻塞队列</strong>；</li><li>另外，对于运行队列在单核 CPU 系统中则只有一个运行指针了，因为单核 CPU 在某个时间，只能运行一个程序。</li></ul><p>那么，就绪队列和阻塞队列链表的组织形式如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621464.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>除了链接的组织方式，还有<strong>索引方式</strong>，它的工作原理：将同一状态的进程组织在一个索引表中，索引表项指向相应的 PCB，不同状态对应不同的索引表。</p><p><strong>一般会选择链表，因为可能面临进程创建，销毁等调度导致进程状态发生变化，所以链表能够更加灵活的插入和删除。</strong></p><h2 id="进程的控制" tabindex="-1"><a class="header-anchor" href="#进程的控制" aria-hidden="true">#</a> 进程的控制</h2><p>我们熟知了进程的状态变迁和进程的数据结构 PCB 后，再来看看进程的<strong>创建、终止、阻塞、唤醒</strong>的过程，这些过程也就是进程的控制。</p><p><strong>01 创建进程</strong></p><p>操作系统允许一个进程创建另一个进程，而且允许子进程继承父进程所拥有的资源。</p><p><strong>创建进程的过程如下：</strong></p><ol><li><strong>申请一个空白的 PCB，并向 PCB 中填写一些控制和管理进程的信息，比如进程的唯一标识等；</strong></li><li><strong>为该进程分配运行时所必需的资源，比如内存资源；</strong></li><li><strong>将 PCB 插入到就绪队列，等待被调度运行；</strong></li></ol><p><strong>02 终止进程</strong></p><p>进程可以有 3 种终止方式：正常结束、异常结束以及外界干预（信号 kill 掉）。</p><p>当子进程被终止时，其在父进程处继承的资源应当还给父进程。而<strong>当父进程被终止时，该父进程的子进程就变为孤儿进程，会被 1 号进程收养，并由 1 号进程对它们完成状态收集工作。</strong></p><p>终止进程的过程如下：</p><ul><li>查找需要终止的进程的 PCB；</li><li>如果处于执行状态，则立即终止该进程的执行，然后将 CPU 资源分配给其他进程；</li><li>如果其还有子进程，则应将该进程的子进程交给 1 号进程接管；</li><li>将该进程所拥有的全部资源都归还给操作系统；</li><li>将其从 PCB 所在队列中删除；</li></ul><p><strong>03 阻塞进程</strong></p><p>当进程需要等待某一事件完成时，它可以调用阻塞语句把自己阻塞等待。而一旦被阻塞等待，它只能由另一个进程唤醒。</p><p>阻塞进程的过程如下：</p><ul><li>找到将要被阻塞进程标识号对应的 PCB；</li><li>如果该进程为运行状态，则保护其现场，将其状态转为阻塞状态，停止运行；</li><li>将该 PCB 插入到阻塞队列中去；</li></ul><p><strong>04 唤醒进程</strong></p><p>进程由「运行」转变为「阻塞」状态是由于进程必须等待某一事件的完成，所以处于阻塞状态的进程是绝对不可能叫醒自己的。</p><p>如果某进程正在等待 I/O 事件，需由别的进程发消息给它，则只有当该进程所期待的事件出现时，才由发现者进程用唤醒语句叫醒它。</p><p>唤醒进程的过程如下：</p><ul><li>在该事件的阻塞队列中找到相应进程的 PCB；</li><li>将其从阻塞队列中移出，并置其状态为就绪状态；</li><li>把该 PCB 插入到就绪队列中，等待调度程序调度；</li></ul><p>进程的阻塞和唤醒是一对功能相反的语句，如果某个进程调用了阻塞语句，则必有一个与之对应的唤醒语句。</p><h2 id="进程的上下文切换" tabindex="-1"><a class="header-anchor" href="#进程的上下文切换" aria-hidden="true">#</a> 进程的上下文切换</h2><p>各个进程之间是共享 CPU 资源的，在不同的时候进程之间需要切换，让不同的进程可以在 CPU 执行，那么这个<strong>一个进程切换到另一个进程运行，称为进程的上下文切换</strong>。</p><p>在详细说进程上下文切换前，我们先来看看 CPU 上下文切换</p><p>大多数操作系统都是多任务，通常支持大于 CPU 数量的任务同时运行。实际上，这些任务并不是同时运行的，只是因为系统在很短的时间内，让各个任务分别在 CPU 运行，于是就造成同时运行的错觉。</p><p>任务是交给 CPU 运行的，那么在每个任务运行前，CPU 需要知道任务从哪里加载，又从哪里开始运行。</p><p>所以，操作系统需要事先帮 CPU 设置好 <strong>CPU 寄存器和程序计数器</strong>。</p><p>CPU 寄存器是 CPU 内部一个容量小，但是速度极快的内存（缓存）。我举个例子，寄存器像是你的口袋，内存像你的书包，硬盘则是你家里的柜子，如果你的东西存放到口袋，那肯定是比你从书包或家里柜子取出来要快的多。</p><p>再来，程序计数器则是用来存储 CPU 正在执行的指令位置、或者即将执行的下一条指令位置。</p><p>所以说，<strong>CPU 寄存器和程序计数是 CPU 在运行任何任务前，所必须依赖的环境，这些环境就叫做</strong> <strong>CPU 上下文</strong>**。**</p><p>既然知道了什么是 CPU 上下文，那理解 CPU 上下文切换就不难了。</p><p>CPU 上下文切换就是先把前一个任务的 CPU 上下文（CPU 寄存器和程序计数器）保存起来，然后加载新任务的上下文到这些寄存器和程序计数器，最后再跳转到程序计数器所指的新位置，运行新任务。</p><p>系统内核会存储保持下来的上下文信息，当此任务再次被分配给 CPU 运行时，CPU 会重新加载这些上下文，这样就能保证任务原来的状态不受影响，让任务看起来还是连续运行。</p><p>上面说到所谓的「任务」，主要包含进程、线程和中断。所以，可以根据任务的不同，把 CPU 上下文切换分成：<strong>进程上下文切换、线程上下文切换和中断上下文切换</strong>。</p><p>进程的上下文切换到底是切换什么呢？</p><p><strong>进程是由内核管理和调度的，所以进程的切换只能发生在内核态。</strong></p><p>所以，<strong>进程的上下文切换不仅包含了虚拟内存、栈、全局变量等用户空间的资源，还包括了内核堆栈、寄存器等内核空间的资源。</strong></p><p>通常，会把交换的信息保存在进程的 PCB，当要运行另外一个进程的时候，我们需要从这个进程的 PCB 取出上下文，然后恢复到 CPU 中，这使得这个进程可以继续执行，如下图所示：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621295.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>大家需要注意，进程的上下文开销是很关键的，我们希望它的开销越小越好，这样可以使得进程可以把更多时间花费在执行程序上，而不是耗费在上下文切换。</p><p>发生进程上下文切换有哪些场景？</p><ul><li>为了保证所有进程可以得到公平调度，CPU 时间被划分为一段段的时间片，这些时间片再被轮流分配给各个进程。这样，当某个进程的时间片耗尽了，进程就从运行状态变为就绪状态，系统从就绪队列选择另外一个进程运行；</li><li>进程在系统资源不足（比如内存不足）时，要等到资源满足后才可以运行，这个时候进程也会被挂起，并由系统调度其他进程运行；</li><li>当进程通过睡眠函数 sleep 这样的方法将自己主动挂起时，自然也会重新调度；</li><li>当有优先级更高的进程运行时，为了保证高优先级进程的运行，当前进程会被挂起，由高优先级进程来运行；</li><li>发生硬件中断时，CPU 上的进程会被中断挂起，转而执行内核中的中断服务程序；</li></ul><hr><h1 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h1><p>在早期的操作系统中都是以进程作为独立运行的基本单位，直到后面，计算机科学家们又提出了更小的能独立运行的基本单位，也就是<strong>线程。</strong></p><h2 id="为什么使用线程" tabindex="-1"><a class="header-anchor" href="#为什么使用线程" aria-hidden="true">#</a> 为什么使用线程？</h2><p>我们举个例子，假设你要编写一个视频播放器软件，那么该软件功能的核心模块有三个：</p><ul><li>从视频文件当中读取数据；</li><li>对读取的数据进行解压缩；</li><li>把解压缩后的视频数据播放出来；</li></ul><p>对于单进程的实现方式，我想大家都会是以下这个方式：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621534.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于单进程的这种方式，存在以下问题：</p><ul><li>播放出来的画面和声音会不连贯，因为当 CPU 能力不够强的时候，Read 的时候可能进程就等在这了，这样就会导致等半天才进行数据解压和播放；</li><li>各个函数之间不是并发执行，影响资源的使用效率；</li></ul><p>那改进成多进程的方式：</p><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/25684216/1672210351790-c42c40e8-d639-43d2-a3bf-500e05cceb24.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于多进程的这种方式，依然会存在问题：</p><ul><li>进程之间如何通信，共享数据？</li><li>维护进程的系统开销较大，如创建进程时，分配资源、建立 PCB；终止进程时，回收资源、撤销 PCB；进程切换时，保存当前进程的状态信息；</li></ul><p>那到底如何解决呢？需要有一种新的实体，满足以下特性：</p><ul><li>实体之间可以并发运行；</li><li>实体之间共享相同的地址空间；</li></ul><p>这个新的实体，就是<strong>线程(</strong> <em><strong>Thread</strong></em> <strong>)</strong>，线程之间可以并发运行且共享相同的地址空间。</p><h2 id="什么是线程" tabindex="-1"><a class="header-anchor" href="#什么是线程" aria-hidden="true">#</a> 什么是线程？</h2><p><strong>线程是进程当中的一条执行流程。</strong></p><p><strong>同一个进程内多个线程之间可以共享代码段、数据段、打开的文件等资源，但每个线程各自都有一套独立的寄存器和栈，这样可以确保线程的控制流是相对独立的。</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621645.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>线程的优缺点？</p><p>线程的优点：</p><ul><li>一个进程中可以同时存在<strong>多个线程</strong>；</li><li>各个线程之间可以<strong>并发执行</strong>；</li><li>各个线程之间可以<strong>共享地址空间和文件等资源</strong>；</li></ul><p>线程的缺点：</p>',142),u={href:"https://xiaolincoding.com/os/4_process/thread_crash.html",target:"_blank",rel:"noopener noreferrer"},m=n('<p>举个例子，对于游戏的用户设计，则不应该使用多线程的方式，否则一个用户挂了，会影响其他同个进程的线程。</p><h2 id="线程与进程的比较" tabindex="-1"><a class="header-anchor" href="#线程与进程的比较" aria-hidden="true">#</a> 线程与进程的比较</h2><p>线程与进程的比较如下：</p><ul><li>进程是资源（包括内存、打开的文件等）分配的单位，线程是 CPU 调度的单位；</li><li>进程拥有一个完整的资源平台，而线程只独享必不可少的资源，如寄存器和栈；</li><li>线程同样具有就绪、阻塞、执行三种基本状态，同样具有状态之间的转换关系；</li><li>线程能减少并发执行的时间和空间开销；</li></ul><p>对于，线程相比进程能减少开销，体现在：</p><ul><li>线程的创建时间比进程快，因为进程在创建的过程中，还需要资源管理信息，比如内存管理信息、文件管理信息，而线程在创建的过程中，不会涉及这些资源管理信息，而是共享它们；</li><li>线程的终止时间比进程快，因为线程释放的资源相比进程少很多；</li><li>同一个进程内的线程切换比进程切换快，因为线程具有相同的地址空间（虚拟内存共享），这意味着同一个进程的线程都具有同一个页表，那么在切换的时候不需要切换页表。而对于进程之间的切换，切换的时候要把页表给切换掉，而页表的切换过程开销是比较大的；</li><li>由于同一进程的各线程间共享内存和文件资源，那么在线程之间数据传递的时候，就不需要经过内核了，这就使得线程之间的数据交互效率更高了；</li></ul><p>所以，不管是时间效率，还是空间效率线程比进程都要高。</p><h2 id="线程的上下文切换" tabindex="-1"><a class="header-anchor" href="#线程的上下文切换" aria-hidden="true">#</a> 线程的上下文切换</h2><p>线程与进程最大的区别在于：<strong>线程是调度的基本单位，而进程则是资源拥有的基本单位</strong>。</p><p>所谓操作系统的任务调度，实际上的调度对象是线程，而进程只是给线程提供了虚拟内存、全局变量等资源。</p><p>对于线程和进程，我们可以这么理解：</p><ul><li>当进程只有一个线程时，可以认为进程就等于线程；</li><li>当进程拥有多个线程时，这些线程会共享相同的虚拟内存和全局变量等资源，这些资源在上下文切换时是不需要修改的；</li></ul><p>另外，线程也有自己的私有数据，比如栈和寄存器等，这些在上下文切换时也是需要保存的。</p><p>线程上下文切换的是什么？</p><p>这还得看线程是不是属于同一个进程：</p><ul><li>当两个线程不是属于同一个进程，则切换的过程就跟进程上下文切换一样；</li><li><strong>当两个线程是属于同一个进程，因为虚拟内存是共享的，所以在切换时，虚拟内存这些资源就保持不动，只需要切换线程的私有数据、寄存器等不共享的数据</strong>；</li></ul><p>所以，线程的上下文切换相比进程，开销要小很多。</p><h2 id="线程的实现" tabindex="-1"><a class="header-anchor" href="#线程的实现" aria-hidden="true">#</a> 线程的实现</h2><p>主要有三种线程的实现方式：</p><ul><li><strong>用户线程（<em><strong><strong>User Thread</strong></strong></em>）</strong>：在用户空间实现的线程，不是由内核管理的线程，是由用户态的线程库来完成线程的管理；</li><li><strong>内核线程（<em><strong><strong>Kernel Thread</strong></strong></em>）</strong>：在内核中实现的线程，是由内核管理的线程；</li><li><strong>轻量级进程（<em><strong><strong>LightWeight Process</strong></strong></em>）</strong>：在内核中来支持用户线程；</li></ul><p>那么，这还需要考虑一个问题，用户线程和内核线程的对应关系。</p><p>首先，第一种关系是<strong>多对一</strong>的关系，也就是多个用户线程对应同一个内核线程：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621847.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>第二种是<strong>一对一</strong>的关系，也就是一个用户线程对应一个内核线程：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621250.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>第三种是<strong>多对多</strong>的关系，也就是多个用户线程对应到多个内核线程：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621494.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>用户线程如何理解？存在什么优势和缺陷？</p><p>用户线程是基于用户态的线程管理库来实现的，那么<strong>线程控制块（<em><strong><strong>Thread Control Block, TCB</strong></strong></em>）</strong> 也是在库里面来实现的，对于操作系统而言是看不到这个 TCB 的，它只能看到整个进程的 PCB。</p><p>所以，<strong>用户线程的整个线程管理和调度，操作系统是不直接参与的，而是由用户级线程库函数来完成线程的管理，包括线程的创建、终止、同步和调度等。</strong></p><p>用户级线程的模型，也就类似前面提到的<strong>多对一</strong>的关系，即多个用户线程对应同一个内核线程，如下图所示：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621207.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>用户线程的<strong>优点</strong>：</p><ul><li>每个进程都需要有它私有的线程控制块（TCB）列表，用来跟踪记录它各个线程状态信息（PC、栈指针、寄存器），TCB 由用户级线程库函数来维护，<strong>可用于不支持线程技术的操作系统</strong>；</li><li><strong>用户线程的切换也是由线程库函数来完成的，无需用户态与内核态的切换，所以速度特别快</strong>；</li></ul><p>用户线程的<strong>缺点</strong>：</p><ul><li>由于操作系统不参与线程的调度，如果一个线程发起了系统调用而阻塞，那进程所包含的用户线程都不能执行了。</li><li>当一个线程开始运行后，除非它主动地交出 CPU 的使用权，否则它所在的进程当中的其他线程无法运行，因为<strong>用户态的线程没法打断当前运行中的线程</strong>，它没有这个特权，只有操作系统才有，但是用户线程不是由操作系统管理的。</li><li>由于时间片分配给进程，故与其他进程比，在多线程执行时，每个线程得到的时间片较少，执行会比较慢；</li></ul><p>那内核线程如何理解？存在什么优势和缺陷？</p><p><strong>内核线程是由操作系统管理的，线程对应的 TCB 自然是放在操作系统里的，这样线程的创建、终止和管理都是由操作系统负责。</strong></p><p>内核线程的模型，也就类似前面提到的<strong>一对一</strong>的关系，即一个用户线程对应一个内核线程，如下图所示：</p><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/25684216/1672210353284-e22a25f0-b627-4f3e-80a1-5981e3dd4519.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>内核线程的<strong>优点</strong>：</p><ul><li>在一个进程当中，如果某个内核线程发起系统调用而被阻塞，并不会影响其他内核线程的运行；</li><li>分配给线程，多线程的进程获得更多的 CPU 运行时间；</li></ul><p>内核线程的<strong>缺点</strong>：</p><ul><li>在支持内核线程的操作系统中，由内核来维护进程和线程的上下文信息，如 PCB 和 TCB；</li><li>线程的创建、终止和切换都是通过系统调用的方式来进行，因此对于系统来说，系统开销比较大；</li></ul><p>最后的轻量级进程如何理解？</p><p><strong>轻量级进程（<em><strong><strong>Light-weight process，LWP</strong></strong></em>）是内核支持的用户线程，一个进程可有一个或多个 LWP，每个 LWP 是跟内核线程一对一映射的，也就是 LWP 都是由一个内核线程支持，而且 LWP 是由内核管理并像普通进程一样被调度</strong>。</p><p>在大多数系统中，<strong>LWP与普通进程的区别也在于它只有一个最小的执行上下文和调度程序所需的统计信息</strong>。一般来说，一个进程代表程序的一个实例，而 LWP 代表程序的执行线程，因为一个执行线程不像进程那样需要那么多状态信息，所以 LWP 也不带有这样的信息。</p><p>在 LWP 之上也是可以使用用户线程的，那么 LWP 与用户线程的对应关系就有三种：</p><ul><li>1 : 1，即一个 LWP 对应 一个用户线程；</li><li>N : 1，即一个 LWP 对应多个用户线程；</li><li>M : N，即多个 LWP 对应多个用户线程；</li></ul><p>接下来针对上面这三种对应关系说明它们优缺点。先看下图的 LWP 模型：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621851.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>1 : 1 模式</strong></p><p>一个线程对应到一个 LWP 再对应到一个内核线程，如上图的进程 4，属于此模型。</p><ul><li>优点：实现并行，当一个 LWP 阻塞，不会影响其他 LWP；</li><li>缺点：每一个用户线程，就产生一个内核线程，创建线程的开销较大。</li></ul><p><strong>N : 1 模式</strong></p><p>多个用户线程对应一个 LWP 再对应一个内核线程，如上图的进程 2，线程管理是在用户空间完成的，此模式中用户的线程对操作系统不可见。</p><ul><li>优点：用户线程要开几个都没问题，且上下文切换发生用户空间，切换的效率较高；</li><li>缺点：一个用户线程如果阻塞了，则整个进程都将会阻塞，另外在多核 CPU 中，是没办法充分利用 CPU 的。</li></ul><p><strong>M : N 模式</strong></p><p>根据前面的两个模型混搭一起，就形成 M:N 模型，该模型提供了两级控制，首先多个用户线程对应到多个 LWP，LWP 再一一对应到内核线程，如上图的进程 3。</p><ul><li>优点：综合了前两种优点，大部分的线程上下文发生在用户空间，且多个线程又可以充分利用多核 CPU 的资源。</li></ul><p><strong>组合模式</strong></p><p>如上图的进程 5，此进程结合 1:1 模型和 M:N 模型。开发人员可以针对不同的应用特点调节内核线程的数目来达到物理并行性和逻辑并行性的最佳方案。</p><hr><h1 id="调度" tabindex="-1"><a class="header-anchor" href="#调度" aria-hidden="true">#</a> 调度</h1><p>进程都希望自己能够占用 CPU 进行工作，那么这涉及到前面说过的进程上下文切换。</p><p>一旦操作系统把进程切换到运行状态，也就意味着该进程占用着 CPU 在执行，但是当操作系统把进程切换到其他状态时，那就不能在 CPU 中执行了，于是操作系统会选择下一个要运行的进程。</p><p>选择一个进程运行这一功能是在操作系统中完成的，通常称为<strong>调度程序</strong>（<em>scheduler</em>）。</p><p>那到底什么时候调度进程，或以什么原则来调度进程呢？</p><p><strong>TIP</strong></p><p>我知道很多人会问，线程不是操作系统的调度单位吗？为什么这里参与调度的是进程？</p><p>先提前说明，这里的进程指只有主线程的进程，所以调度主线程就等于调度了整个进程。</p><p>那为什么干脆不直接取名线程调度？主要是操作系统相关书籍，都是用进程调度这个名字，所以我也沿用了这个名字。</p><h2 id="调度时机" tabindex="-1"><a class="header-anchor" href="#调度时机" aria-hidden="true">#</a> 调度时机</h2><p>在进程的生命周期中，当进程从一个运行状态到另外一状态变化的时候，其实会触发一次调度。</p><p>比如，以下状态的变化都会触发操作系统的调度：</p><ul><li><em>从就绪态 -&gt; 运行态</em>：当进程被创建时，会进入到就绪队列，操作系统会从就绪队列选择一个进程运行；</li><li><em>从运行态 -&gt; 阻塞态</em>：当进程发生 I/O 事件而阻塞时，操作系统必须选择另外一个进程运行；</li><li><em>从运行态 -&gt; 结束态</em>：当进程退出结束后，操作系统得从就绪队列选择另外一个进程运行；</li></ul><p>因为这些状态变化的时候，操作系统需要考虑是否要让新的进程给 CPU 运行，或者是否让当前进程从 CPU 上退出来而换另一个进程运行。</p><p>另外，如果硬件时钟提供某个频率的周期性中断，那么可以根据如何处理时钟中断 ，把调度算法分为两类：</p><ul><li><strong>非抢占式调度算法</strong>挑选一个进程，然后让该进程运行直到被阻塞，或者直到该进程退出，才会调用另外一个进程，也就是说不会理时钟中断这个事情。</li><li><strong>抢占式调度算法</strong>挑选一个进程，然后让该进程只运行某段时间，如果在该时段结束时，该进程仍然在运行时，则会把它挂起，接着调度程序从就绪队列挑选另外一个进程。这种抢占式调度处理，需要在时间间隔的末端发生<strong>时钟中断</strong>，以便把 CPU 控制返回给调度程序进行调度，也就是常说的<strong>时间片机制</strong>。</li></ul><h2 id="调度原则" tabindex="-1"><a class="header-anchor" href="#调度原则" aria-hidden="true">#</a> 调度原则</h2><p><em>原则一</em>：如果运行的程序，发生了 I/O 事件的请求，那 CPU 使用率必然会很低，因为此时进程在阻塞等待硬盘的数据返回。这样的过程，势必会造成 CPU 突然的空闲。 <strong>为了提高 CPU 利用率，在这种发送 I/O 事件致使 CPU 空闲的情况下，调度程序需要从就绪队列中选择一个进程来运行。</strong></p><p><em>原则二</em>：有的程序执行某个任务花费的时间会比较长，如果这个程序一直占用着 CPU，会造成系统吞吐量（CPU 在单位时间内完成的进程数量）的降低。所以，<strong>要提高系统的吞吐率，调度程序要权衡长任务和短任务进程的运行完成数量。</strong></p><p><em>原则三</em>：从进程开始到结束的过程中，实际上是包含两个时间，分别是进程运行时间和进程等待时间，这两个时间总和就称为周转时间。进程的周转时间越小越好，<strong>如果进程的等待时间很长而运行时间很短，那周转时间就很长，这不是我们所期望的，调度程序应该避免这种情况发生。</strong></p><p><em>原则四</em>：处于就绪队列的进程，也不能等太久，当然希望这个等待的时间越短越好，这样可以使得进程更快的在 CPU 中执行。所以，<strong>就绪队列中进程的等待时间也是调度程序所需要考虑的原则。</strong></p><p><em>原则五</em>：对于鼠标、键盘这种交互式比较强的应用，我们当然希望它的响应时间越快越好，否则就会影响用户体验了。所以，<strong>对于交互式比较强的应用，响应时间也是调度程序需要考虑的原则。</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621184.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>针对上面的五种调度原则，总结成如下：</p><ul><li><strong>CPU 利用率</strong>：调度程序应确保 CPU 是始终匆忙的状态，这可提高 CPU 的利用率；</li><li><strong>系统吞吐量</strong>：吞吐量表示的是单位时间内 CPU 完成进程的数量，长作业的进程会占用较长的 CPU 资源，因此会降低吞吐量，相反，短作业的进程会提升系统吞吐量；</li><li><strong>周转时间</strong>：周转时间是进程运行+阻塞时间+等待时间的总和，一个进程的周转时间越小越好；</li><li><strong>等待时间</strong>：这个等待时间不是阻塞状态的时间，而是进程处于就绪队列的时间，等待的时间越长，用户越不满意；</li><li><strong>响应时间</strong>：用户提交请求到系统第一次产生响应所花费的时间，在交互式系统中，响应时间是衡量调度算法好坏的主要标准。</li></ul><p>说白了，这么多调度原则，目的就是要使得进程要「快」。</p><h2 id="调度算法" tabindex="-1"><a class="header-anchor" href="#调度算法" aria-hidden="true">#</a> 调度算法</h2><p>不同的调度算法适用的场景也是不同的。</p><p>接下来，说说在<strong>单核 CPU 系统</strong>中常见的调度算法。</p><p>01 先来先服务调度算法</p><p>最简单的一个调度算法，就是非抢占式的<strong>先来先服务（<em><strong><strong>First Come First Serve, FCFS</strong></strong></em>）算法</strong>了。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621463.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>顾名思义，先来后到，<strong>每次从就绪队列选择最先进入队列的进程，然后一直运行，直到进程退出或被阻塞，才会继续从队列中选择第一个进程接着运行。</strong></p><p>这似乎很公平，但是当一个长作业先运行了，那么后面的短作业等待的时间就会很长，不利于短作业。</p><p>FCFS 对长作业有利，适用于 CPU 繁忙型作业的系统，而不适用于 I/O 繁忙型作业的系统。</p><p>02 最短作业优先调度算法</p><p><strong>最短作业优先（<em><strong><strong>Shortest Job First, SJF</strong></strong></em>）调度算法</strong>，它会<strong>优先选择运行时间最短的进程来运行</strong>，这有助于提高系统的吞吐量。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621122.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这显然对长作业不利，很容易造成一种极端现象。</p><p>比如，一个长作业在就绪队列等待运行，而这个就绪队列有非常多的短作业，那么就会使得长作业不断的往后推，周转时间变长，致使长作业长期不会被运行。</p><p>03 高响应比优先调度算法</p><p>前面的「先来先服务调度算法」和「最短作业优先调度算法」都没有很好的权衡短作业和长作业。</p><p>那么，<strong>高响应比优先 （<em><strong><strong>Highest Response Ratio Next, HRRN</strong></strong></em>）调度算法</strong>主要是权衡了短作业和长作业。</p><p><strong>每次进行进程调度时，先计算「响应比优先级」，然后把「响应比优先级」最高的进程投入运行</strong>，「响应比优先级」的计算公式：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621654.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>从上面的公式，可以发现：</p><ul><li>如果两个进程的「等待时间」相同时，「要求的服务时间」越短，「响应比」就越高，这样短作业的进程容易被选中运行；</li><li>如果两个进程「要求的服务时间」相同时，「等待时间」越长，「响应比」就越高，这就兼顾到了长作业进程，因为进程的响应比可以随时间等待的增加而提高，当其等待时间足够长时，其响应比便可以升到很高，从而获得运行的机会；</li></ul><p><strong>TIP</strong></p><p>很多人问怎么才能知道一个进程要求服务的时间？这不是不可预知的吗？</p><p>对的，这是不可预估的。所以，高响应比优先调度算法是「理想型」的调度算法，现实中是实现不了的。</p><p>04 时间片轮转调度算法</p><p>最古老、最简单、最公平且使用最广的算法就是<strong>时间片轮转（<em><strong><strong>Round Robin, RR</strong></strong></em>）调度算法</strong>。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010621846.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>每个进程被分配一个时间段，称为时间片（<em><strong><strong>Quantum</strong></strong></em>），即允许该进程在该时间段中运行。</strong></p><ul><li>如果时间片用完，进程还在运行，那么将会把此进程从 CPU 释放出来，并把 CPU 分配给另外一个进程；</li><li>如果该进程在时间片结束前阻塞或结束，则 CPU 立即进行切换；</li></ul><p>另外，时间片的长度就是一个很关键的点：</p><ul><li>如果时间片设得太短会导致过多的进程上下文切换，降低了 CPU 效率；</li><li>如果设得太长又可能引起对短作业进程的响应时间变长。</li></ul><p>一般来说，时间片设为 20ms~50ms 通常是一个比较合理的折中值。</p><p>05 最高优先级调度算法</p><p>前面的「时间片轮转算法」做了个假设，即让所有的进程同等重要，也不偏袒谁，大家的运行时间都一样。</p><p>但是，对于多用户计算机系统就有不同的看法了，它们希望调度是有优先级的，即希望调度程序能<strong>从就绪队列中选择最高优先级的进程进行运行，这称为最高优先级（<em><strong><strong>Highest Priority First，HPF</strong></strong></em>）调度算法</strong>。</p><p>进程的优先级可以分为，静态优先级和动态优先级：</p><ul><li>静态优先级：创建进程时候，就已经确定了优先级了，然后整个运行时间优先级都不会变化；</li><li>动态优先级：根据进程的动态变化调整优先级，比如如果进程运行时间增加，则降低其优先级，如果进程等待时间（就绪队列的等待时间）增加，则升高其优先级，也就是<strong>随着时间的推移增加等待进程的优先级</strong>。</li></ul><p>该算法也有两种处理优先级高的方法，非抢占式和抢占式：</p><ul><li>非抢占式：当就绪队列中出现优先级高的进程，运行完当前进程，再选择优先级高的进程。</li><li>抢占式：当就绪队列中出现优先级高的进程，当前进程挂起，调度优先级高的进程运行。</li></ul><p>但是依然有缺点，可能会导致低优先级的进程永远不会运行。</p><p>06 多级反馈队列调度算法</p><p><strong>多级反馈队列（<em><strong><strong>Multilevel Feedback Queue</strong></strong></em>）调度算法</strong>是「时间片轮转算法」和「最高优先级算法」的综合和发展。</p><p>顾名思义：</p><ul><li>「多级」表示有多个队列，每个队列优先级从高到低，同时优先级越高时间片越短。</li><li>「反馈」表示如果有新的进程加入优先级高的队列时，立刻停止当前正在运行的进程，转而去运行优先级高的队列；</li></ul><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/25684216/1672210354621-d13179e1-4204-44f1-807d-17800e0871fb.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>来看看，它是如何工作的：</p><ul><li>设置了多个队列，赋予每个队列不同的优先级，每个<strong>队列优先级从高到低</strong>，同时<strong>优先级越高时间片越短</strong>；</li><li>新的进程会被放入到第一级队列的末尾，按先来先服务的原则排队等待被调度，如果在第一级队列规定的时间片没运行完成，则将其转入到第二级队列的末尾，以此类推，直至完成；</li><li>当较高优先级的队列为空，才调度较低优先级的队列中的进程运行。如果进程运行时，有新进程进入较高优先级的队列，则停止当前运行的进程并将其移入到原队列末尾，接着让较高优先级的进程运行；</li></ul><p>可以发现，对于短作业可能可以在第一级队列很快被处理完。对于长作业，如果在第一级队列处理不完，可以移入下次队列等待被执行，虽然等待的时间变长了，但是运行时间也变更长了，所以该算法很好的<strong>兼顾了长短作业，同时有较好的响应时间。</strong></p>',137);function c(d,h){const g=p("ExternalLinkIcon");return o(),s("div",null,[a,i("ul",null,[i("li",null,[t("当进程中的一个线程崩溃时，会导致其所属进程的所有线程崩溃（这里是针对 C/C++ 语言，Java语言中的线程奔溃不会造成进程崩溃，具体分析原因可以看这篇："),i("a",u,[t("线程崩溃了，进程也会崩溃吗？(opens new window)"),l(g)]),t("）。")])]),m])}const C=r(e,[["render",c],["__file","1.html.vue"]]);export{C as default};
