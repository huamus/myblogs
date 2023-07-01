import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as e,c,a as n,b as a,d as o,f as s}from"./app-e50d80a0.js";const l={},u=s('<h1 id="linux-进程的内存分布长什么样" tabindex="-1"><a class="header-anchor" href="#linux-进程的内存分布长什么样" aria-hidden="true">#</a> Linux 进程的内存分布长什么样？</h1><p>在 Linux 操作系统中，虚拟地址空间的内部又被分为<strong>内核空间和用户空间</strong>两部分，不同位数的系统，地址空间的范围也不同。比如最常见的 32 位和 64 位系统，如下所示：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611327.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>通过这里可以看出：</p><ul><li>32 位系统的内核空间占用 1G，位于最高处，剩下的 3G 是用户空间；</li><li>64 位系统的内核空间和用户空间都是 128T，分别占据整个内存空间的最高和最低处，剩下的中间部分是未定义的。</li></ul><p>再来说说，内核空间与用户空间的区别：</p><ul><li><strong>进程在用户态时，只能访问用户空间内存；</strong></li><li><strong>只有进入内核态后，才可以访问内核空间的内存；</strong></li></ul><p>虽然每个进程都各自有独立的虚拟内存，但是<strong>每个虚拟内存中的内核地址，其实关联的都是相同的物理内存</strong>。这样，<strong>进程切换到内核态后，就可以很方便地访问内核空间内存。</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611308.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们看看用户空间分布的情况，以 32 位系统为例，我画了一张图来表示它们的关系：</p><p>通过这张图你可以看到，用户空间内存从<strong>低到高</strong>分别是 6 种不同的内存段：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611343.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>',12),r=n("li",null,"代码段，包括二进制可执行代码；",-1),d=n("li",null,"数据段，包括已初始化的静态常量和全局变量；",-1),m=n("li",null,"BSS 段，包括未初始化的静态变量和全局变量；",-1),g=n("li",null,"堆段，包括动态分配的内存，从低地址开始向上增长；",-1),k={href:"http://lishiwen4.github.io/linux/linux-process-memory-location",target:"_blank",rel:"noopener noreferrer"},f=n("li",null,"栈段，包括局部变量和函数调用的上下文等。栈的大小是固定的，一般是 8 MB。当然系统也提供了参数，以便我们自定义大小；",-1),b=s(`<p>在这 6 个内存段中，堆和文件映射段的内存是动态分配的。比如说，使用 C 标准库的 malloc() 或者 mmap() ，就可以分别在堆和文件映射段动态分配内存。</p><h1 id="malloc-是如何分配内存的" tabindex="-1"><a class="header-anchor" href="#malloc-是如何分配内存的" aria-hidden="true">#</a> malloc 是如何分配内存的？</h1><p>实际上，malloc() 并不是系统调用，而是 C 库里的函数，用于动态分配内存。</p><p>malloc 申请内存的时候，会有两种方式向操作系统申请堆内存。</p><ul><li>方式一：通过 brk() 系统调用从堆分配内存</li><li>方式二：通过 mmap() 系统调用在文件映射区域分配内存；</li></ul><p>方式一实现的方式很简单，就是通过 brk() 函数将「堆顶」指针向高地址移动，获得新的内存空间。如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611365.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>方式二通过 mmap() 系统调用中「私有匿名映射」的方式，在文件映射区分配一块内存，也就是从文件映射区“偷”了一块内存。如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611396.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>什么场景下 malloc() 会通过 brk() 分配内存？又是什么场景下通过 mmap() 分配内存？</p><p>malloc() 源码里默认定义了一个阈值：</p><ul><li>如果用户分配的内存小于 128 KB，则通过 brk() 申请内存；</li><li>如果用户分配的内存大于 128 KB，则通过 mmap() 申请内存；</li></ul><p>注意，不同的 glibc 版本定义的阈值也是不同的。</p><h1 id="malloc-分配的是物理内存吗" tabindex="-1"><a class="header-anchor" href="#malloc-分配的是物理内存吗" aria-hidden="true">#</a> malloc() 分配的是物理内存吗？</h1><p>不是的，<strong>malloc() 分配的是虚拟内存</strong>。</p><p>如果分配后的虚拟内存没有被访问的话，虚拟内存是不会映射到物理内存的，这样就不会占用物理内存了。</p><p><strong>只有在访问已分配的虚拟地址空间的时候，操作系统通过查找页表，发现虚拟内存对应的页没有在物理内存中，就会触发缺页中断，然后操作系统会建立虚拟内存和物理内存之间的映射关系。</strong></p><h1 id="malloc-1-会分配多大的虚拟内存" tabindex="-1"><a class="header-anchor" href="#malloc-1-会分配多大的虚拟内存" aria-hidden="true">#</a> malloc(1) 会分配多大的虚拟内存？</h1><p>malloc() 在分配内存的时候，并不是老老实实按用户预期申请的字节数来分配内存空间大小，而是<strong>会预分配更大的空间作为内存池</strong>。</p><p>具体会预分配多大的空间，跟 malloc 使用的内存管理器有关系，我们就以 malloc 默认的内存管理器（Ptmalloc2）来分析。</p><p>接下里，我们做个实验，用下面这个代码，通过 malloc 申请 1 字节的内存时，看看操作系统实际分配了多大的内存空间。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;malloc.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;使用cat /proc/%d/maps查看内存分配\\n&quot;</span><span class="token punctuation">,</span><span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">//申请1字节的内存</span>
  <span class="token keyword">void</span> <span class="token operator">*</span>addr <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;此1字节的内存起始地址：%x\\n&quot;</span><span class="token punctuation">,</span> addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;使用cat /proc/%d/maps查看内存分配\\n&quot;</span><span class="token punctuation">,</span><span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
  <span class="token comment">//将程序阻塞，当输入任意字符时才往下执行</span>
  <span class="token function">getchar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//释放内存</span>
  <span class="token function">free</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;释放了1字节的内存，但heap堆并不会释放\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token function">getchar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行代码（<strong>先提前说明，我使用的 glibc 库的版本是 2.17</strong>）：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611279.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以通过 /proc//maps 文件查看进程的内存分布情况。我在 maps 文件通过此 1 字节的内存起始地址过滤出了内存地址的范围。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@xiaolin ~<span class="token punctuation">]</span><span class="token comment"># cat /proc/3191/maps | grep d730</span>
00d73000-00d94000 rw-p 00000000 00:00 <span class="token number">0</span>                                  <span class="token punctuation">[</span>heap<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子分配的内存小于 128 KB，所以是通过 brk() 系统调用向堆空间申请的内存，因此可以看到最右边有 [heap] 的标识。</p><p>可以看到，堆空间的内存地址范围是 00d73000-00d94000，这个范围大小是 132KB，也就说明了 <strong>malloc(1) 实际上预分配 132K 字节的内存</strong>。</p><p>可能有的同学注意到了，程序里打印的内存起始地址是 d73010，而 maps 文件显示堆内存空间的起始地址是 d73000，为什么会多出来 0x10 （16字节）呢？这个问题，我们先放着，后面会说。</p><h1 id="free-释放内存-会归还给操作系统吗" tabindex="-1"><a class="header-anchor" href="#free-释放内存-会归还给操作系统吗" aria-hidden="true">#</a> free 释放内存，会归还给操作系统吗？</h1><p>我们在上面的进程往下执行，看看通过 free() 函数释放内存后，堆内存还在吗？</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1685105338558-90ed06fd-880c-46c7-88c8-eb9e444ef8d8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>从下图可以看到，通过 free 释放内存后，堆内存还是存在的，并没有归还给操作系统。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611707.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这是因为与其把这 1 字节释放给操作系统，不如先缓存着放进 malloc 的内存池里，当进程再次申请 1 字节的内存时就可以直接复用，这样速度快了很多。</p><p>当然，当进程退出后，操作系统就会回收进程的所有资源。</p><p>上面说的 free 内存后堆内存还存在，是针对 malloc 通过 brk() 方式申请的内存的情况。</p><p>如果 malloc 通过 mmap 方式申请的内存，free 释放内存后就会归归还给操作系统。</p><p>我们做个实验验证下， 通过 malloc 申请 128 KB 字节的内存，来使得 malloc 通过 mmap 方式来分配内存。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;malloc.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//申请1字节的内存</span>
  <span class="token keyword">void</span> <span class="token operator">*</span>addr <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;此128KB字节的内存起始地址：%x\\n&quot;</span><span class="token punctuation">,</span> addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;使用cat /proc/%d/maps查看内存分配\\n&quot;</span><span class="token punctuation">,</span><span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//将程序阻塞，当输入任意字符时才往下执行</span>
  <span class="token function">getchar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//释放内存</span>
  <span class="token function">free</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;释放了128KB字节的内存，内存也归还给了操作系统\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">getchar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行代码：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611146.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>查看进程的内存的分布情况，可以发现最右边没有 [heap] 标志，说明是通过 mmap 以匿名映射的方式从文件映射区分配的匿名内存。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611496.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后我们释放掉这个内存看看：</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1685105341080-fff9d1d8-ba5a-4b05-9b06-9929309fb723.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>再次查看该 128 KB 内存的起始地址，可以发现已经不存在了，说明归还给了操作系统。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010611000.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于 「malloc 申请的内存，free 释放内存会归还给操作系统吗？」这个问题，我们可以做个总结了：</p><ul><li>malloc 通过 <strong>brk()</strong> 方式申请的内存，free 释放内存的时候，<strong>并不会把内存归还给操作系统，而是缓存在 malloc 的内存池中，待下次使用</strong>；</li><li>malloc 通过 <strong>mmap()</strong> 方式申请的内存，free 释放内存的时候，<strong>会把内存归还给操作系统，内存得到真正的释放</strong>。</li></ul><h1 id="为什么不全部使用-mmap-来分配内存" tabindex="-1"><a class="header-anchor" href="#为什么不全部使用-mmap-来分配内存" aria-hidden="true">#</a> 为什么不全部使用 mmap 来分配内存？</h1><p>因为向操作系统申请内存，是要通过系统调用的，执行系统调用是要进入内核态的，然后在回到用户态，运行态的切换会耗费不少时间。</p><p>所以，申请内存的操作应该避免频繁的系统调用，如果都用 mmap 来分配内存，等于每次都要执行系统调用。</p><p>另外，因为 mmap 分配的内存每次释放的时候，都会归还给操作系统，于是每次 mmap 分配的虚拟地址都是缺页状态的，然后在第一次访问该虚拟地址的时候，就会触发缺页中断。</p><p>也就是说，<strong>频繁通过 mmap 分配的内存话，不仅每次都会发生运行态的切换，还会发生缺页中断（在第一次访问虚拟地址后），这样会导致 CPU 消耗较大</strong>。</p><p>为了改进这两个问题，malloc 通过 brk() 系统调用在堆空间申请内存的时候，由于堆空间是连续的，所以直接预分配更大的内存来作为内存池，当内存释放的时候，就缓存在内存池中。</p><p><strong>等下次在申请内存的时候，就直接从内存池取出对应的内存块就行了，而且可能这个内存块的虚拟地址与物理地址的映射关系还存在，这样不仅减少了系统调用的次数，也减少了缺页中断的次数，这将大大降低 CPU 的消耗</strong>。</p><h1 id="既然-brk-那么牛逼-为什么不全部使用-brk-来分配" tabindex="-1"><a class="header-anchor" href="#既然-brk-那么牛逼-为什么不全部使用-brk-来分配" aria-hidden="true">#</a> 既然 brk 那么牛逼，为什么不全部使用 brk 来分配？</h1><p>前面我们提到通过 brk 从堆空间分配的内存，并不会归还给操作系统，那么我们那考虑这样一个场景。</p><p>如果我们连续申请了 10k，20k，30k 这三片内存，如果 10k 和 20k 这两片释放了，变为了空闲内存空间，如果下次申请的内存小于 30k，那么就可以重用这个空闲内存空间。</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1685105342339-67f555d7-253f-49ee-aff7-6e490085b175.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>但是如果下次申请的内存大于 30k，没有可用的空闲内存空间，必须向 OS 申请，实际使用内存继续增大。</p><p>因此，随着系统频繁地 malloc 和 free ，尤其对于小块内存，堆内将产生越来越多不可用的碎片，导致“内存泄露”。而这种“泄露”现象使用 valgrind 是无法检测出来的。</p><p>所以，malloc 实现中，充分考虑了 brk 和 mmap 行为上的差异及优缺点，默认分配大块内存 (128KB) 才使用 mmap 分配内存空间。</p><h1 id="free-函数只传入一个内存地址-为什么能知道要释放多大的内存" tabindex="-1"><a class="header-anchor" href="#free-函数只传入一个内存地址-为什么能知道要释放多大的内存" aria-hidden="true">#</a> free() 函数只传入一个内存地址，为什么能知道要释放多大的内存？</h1><p>还记得，我前面提到， malloc 返回给用户态的内存起始地址比进程的堆空间起始地址多了 16 字节吗？</p><p>这个多出来的 16 字节就是保存了该内存块的描述信息，比如有该内存块的大小。</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1685105342118-4fa442bc-c442-49c1-b227-097add2fdbc1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这样当执行 free() 函数时，free 会对传入进来的内存地址向左偏移 16 字节，然后从这个 16 字节的分析出当前的内存块的大小，自然就知道要释放多大的内存了。</p>`,69);function h(v,x){const t=i("ExternalLinkIcon");return e(),c("div",null,[u,n("ul",null,[r,d,m,g,n("li",null,[a("文件映射段，包括动态库、共享内存等，从低地址开始向上增长（"),n("a",k,[a("跟硬件和内核版本有关(opens new window)"),o(t)]),a("）；")]),f]),b])}const w=p(l,[["render",h],["__file","2.html.vue"]]);export{w as default};
