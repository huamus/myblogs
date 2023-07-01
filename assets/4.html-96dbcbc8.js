import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as i,f as g}from"./app-e50d80a0.js";const p={},a=g(`<p>问题：<strong>一致性哈希是什么，使用场景，解决了什么问题？</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741777.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h1 id="如何分配请求" tabindex="-1"><a class="header-anchor" href="#如何分配请求" aria-hidden="true">#</a> 如何分配请求？</h1><p>大多数网站背后肯定不是只有一台服务器提供服务，因为单机的并发量和数据量都是有限的，所以都会用多台服务器构成集群来对外提供服务。</p><p>但是问题来了，现在有那么多个节点（后面统称服务器为节点，因为少一个字），要如何分配客户端的请求呢？</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741775.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其实这个问题就是「负载均衡问题」。解决负载均衡问题的算法很多，不同的负载均衡算法，对应的就是不同的分配策略，适应的业务场景也不同。</p><p>最简单的方式，引入一个中间的负载均衡层，让它将外界的请求「轮流」的转发给内部的集群。比如集群有 3 个节点，外界请求有 3 个，那么每个节点都会处理 1 个请求，达到了分配请求的目的。</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1672645614081-6394a51d-c82a-487b-9f50-e9b76118299f.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>考虑到每个节点的硬件配置有所区别，我们可以引入权重值，将硬件配置更好的节点的权重值设高，然后根据各个节点的权重值，按照一定比重分配在不同的节点上，让硬件配置更好的节点承担更多的请求，这种算法叫做<strong>加权轮询</strong>。</p><p><strong>加权轮询算法使用场景是建立在每个节点存储的数据都相同的前提。所以，每次读数据的请求，访问任意一个节点都能得到结果。</strong></p><p>但是，加权轮询算法是无法应对「分布式系统（数据分片的系统）」的，因为分布式系统中，每个节点存储的数据是不同的。</p><p>当我们想提高系统的容量，就会将数据水平切分到不同的节点来存储，也就是将数据分布到了不同的节点。比如<strong>一个分布式 KV（key-valu） 缓存系统，某个 key 应该到哪个或者哪些节点上获得，应该是确定的</strong>，不是说任意访问一个节点都可以得到缓存结果的。</p><p>因此，我们要想一个能应对分布式系统的负载均衡算法。</p><h1 id="使用哈希算法有什么问题" tabindex="-1"><a class="header-anchor" href="#使用哈希算法有什么问题" aria-hidden="true">#</a> 使用哈希算法有什么问题？</h1><p>有的同学可能很快就想到了：<strong>哈希算法</strong>。因为对同一个关键字进行哈希计算，每次计算都是相同的值，这样就可以将某个 key 确定到一个节点了，可以满足分布式系统的负载均衡需求。</p><p>哈希算法最简单的做法就是进行取模运算，比如分布式系统中有 3 个节点，基于 hash(key) % 3 公式对数据进行了映射。</p><p>如果客户端要获取指定 key 的数据，通过下面的公式可以定位节点：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果经过上面这个公式计算后得到的值是 0，就说明该 key 需要去第一个节点获取。</p><p>但是有一个很致命的问题，<strong>如果节点数量发生了变化，也就是在对系统做扩容或者缩容时，必须迁移改变了映射关系的数据</strong>，否则会出现查询不到数据的问题。</p><p>举个例子，假设我们有一个由 A、B、C 三个节点组成分布式 KV 缓存系统，基于计算公式 hash(key) % 3 将数据进行了映射，每个节点存储了不同的数据：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741788.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在有 3 个查询 key 的请求，分别查询 key-01，key-02，key-03 的数据，这三个 key 分别经过 hash() 函数计算后的值为 hash( key-01) = 6、hash( key-02) = 7、hash(key-03) = 8，然后再对这些值进行取模运算。</p><p>通过这样的哈希算法，每个 key 都可以定位到对应的节点。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741810.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>当 3 个节点不能满足业务需求了，这时我们增加了一个节点，节点的数量从 3 变化为 4，意味取模哈希函数中基数的变化，这样会导致<strong>大部分映射关系改变</strong>，如下图：</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1672645615228-7947a00d-98b1-417c-a4f7-d859aaf48eaa.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>比如，之前的 hash(key-01) % 3 = 0，就变成了 hash(key-01) % 4 = 2，查询 key-01 数据时，寻址到了节点 C，而 key-01 的数据是存储在节点 A 上的，不是在节点 C，所以会查询不到数据。</p><p>同样的道理，如果我们对分布式系统进行缩容，比如移除一个节点，也会因为取模哈希函数中基数的变化，可能出现查询不到数据的问题。</p><p>要解决这个问题的办法，就需要我们进行<strong>迁移数据</strong>，比如节点的数量从 3 变化为 4 时，要基于新的计算公式 hash(key) % 4 ，重新对数据和节点做映射。</p><p>假设总数据条数为 M，哈希算法在面对节点数量变化时，<strong>最坏情况下所有数据都需要迁移，所以它的数据迁移规模是 O(M)</strong>，这样数据的迁移成本太高了。</p><p>所以，我们应该要重新想一个新的算法，来<strong>避免分布式系统在扩容或者缩容时，发生过多的数据迁移。</strong></p><h1 id="使用一致性哈希算法有什么问题" tabindex="-1"><a class="header-anchor" href="#使用一致性哈希算法有什么问题" aria-hidden="true">#</a> 使用一致性哈希算法有什么问题？</h1><p>一致性哈希算法就很好地解决了分布式系统在扩容或者缩容时，发生过多的数据迁移的问题。</p><p>一致哈希算法也用了取模运算，但与哈希算法不同的是，<strong>哈希算法是对节点的数量进行取模运算，而<strong><strong>一致哈希算法是对 2^32 进行取模运算，是一个固定的值</strong></strong>。</strong></p><p>我们可以把一致哈希算法是对 2^32 进行取模运算的结果值组织成一个圆环，就像钟表一样，钟表的圆可以理解成由 60 个点组成的圆，而此处我们把这个圆想象成由 2^32 个点组成的圆，这个圆环被称为<strong>哈希环</strong>，如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741812.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>一致性哈希要进行两步哈希：</strong></p><ul><li><strong>第一步：对存储节点进行哈希计算，也就是对存储节点做哈希映射，比如根据节点的 IP 地址进行哈希；</strong></li><li><strong>第二步：当对数据进行存储或访问时，对数据进行哈希映射；</strong></li></ul><p>所以，<strong>一致性哈希是指将「存储节点」和「数据」都映射到一个首尾相连的哈希环上</strong>。</p><p>问题来了，对「数据」进行哈希映射得到一个结果要怎么找到存储该数据的节点呢？</p><p>答案是，映射的结果值往<strong>顺时针的方向找到第一个节点</strong>，就是存储该数据的节点。</p><p>举个例子，有 3 个节点经过哈希计算，映射到了如下图的位置：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741918.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接着，对要查询的 key-01 进行哈希计算，确定此 key-01 映射在哈希环的位置，然后从这个位置往顺时针的方向找到第一个节点，就是存储该 key-01 数据的节点。</p><p>比如，下图中的 key-01 映射的位置，往顺时针的方向找到第一个节点就是节点 A。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741044.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以，<strong>当需要对指定 key 的值进行读写的时候，要通过下面 2 步进行寻址：</strong></p><ul><li><strong>首先，对 key 进行哈希计算，确定此 key 在环上的位置；</strong></li><li><strong>然后，从这个位置沿着顺时针方向走，遇到的第一节点就是存储 key 的节点。</strong></li></ul><p>知道了一致哈希寻址的方式，我们来看看，如果增加一个节点或者减少一个节点会发生大量的数据迁移吗？</p><p>假设节点数量从 3 增加到了 4，新的节点 D 经过哈希计算后映射到了下图中的位置：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741283.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>你可以看到，key-01、key-03 都不受影响，只有 key-02 需要被迁移节点 D。</p><p>假设节点数量从 3 减少到了 2，比如将节点 A 移除：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741330.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>你可以看到，key-02 和 key-03 不会受到影响，只有 key-01 需要被迁移节点 B。</p><p>因此，<strong>在一致哈希算法中，如果增加或者移除一个节点，仅影响该节点在哈希环上顺时针相邻的后继节点，其它数据也不会受到影响</strong>。</p><p>上面这些图中 3 个节点映射在哈希环还是比较分散的，所以看起来请求都会「均衡」到每个节点。</p><p>但是<strong>一致性哈希算法并不保证节点能够在哈希环上分布均匀</strong>，这样就会带来一个问题，会有大量的请求集中在一个节点上。</p><p>比如，下图中 3 个节点的映射位置都在哈希环的右半边：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/img202307010741560.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这时候有一半以上的数据的寻址都会找节点 A，也就是访问请求主要集中的节点 A 上，这肯定不行的呀，说好的负载均衡呢，这种情况一点都不均衡。</p><p>另外，在这种节点分布不均匀的情况下，进行容灾与扩容时，哈希环上的相邻节点容易受到过大影响，容易发生雪崩式的连锁反应。</p><p>比如，上图中如果节点 A 被移除了，当节点 A 宕机后，根据一致性哈希算法的规则，其上数据应该全部迁移到相邻的节点 B 上，这样，节点 B 的数据量、访问量都会迅速增加很多倍，一旦新增的压力超过了节点 B 的处理能力上限，就会导致节点 B 崩溃，进而形成雪崩式的连锁反应。</p><p>所以，<strong>一致性哈希算法虽然减少了数据迁移量，但是存在节点分布不均匀的问题</strong>。</p><h1 id="如何通过虚拟节点提高均衡度" tabindex="-1"><a class="header-anchor" href="#如何通过虚拟节点提高均衡度" aria-hidden="true">#</a> 如何通过虚拟节点提高均衡度？</h1><p>要想解决节点能在哈希环上分配不均匀的问题，就是要有大量的节点，节点数越多，哈希环上的节点分布的就越均匀。</p><p>但问题是，实际中我们没有那么多节点。所以这个时候我们就加入<strong>虚拟节点</strong>，也就是对一个真实节点做多个副本。</p><p>具体做法是，<strong>不再将真实节点映射到哈希环上，而是将虚拟节点映射到哈希环上，并将虚拟节点映射到实际节点，所以这里有「两层」映射关系。</strong></p><p>比如对每个节点分别设置 3 个虚拟节点：</p><ul><li>对节点 A 加上编号来作为虚拟节点：A-01、A-02、A-03</li><li>对节点 B 加上编号来作为虚拟节点：B-01、B-02、B-03</li><li>对节点 C 加上编号来作为虚拟节点：C-01、C-02、C-03</li></ul><p>引入虚拟节点后，原本哈希环上只有 3 个节点的情况，就会变成有 9 个虚拟节点映射到哈希环上，哈希环上的节点数量多了 3 倍。</p><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/25684216/1672645616570-f33db1b6-de9a-40d0-8172-3da2e5782562.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>你可以看到，<strong>节点数量多了后，节点在哈希环上的分布就相对均匀了</strong>。这时候，如果有访问请求寻址到「A-01」这个虚拟节点，接着再通过「A-01」虚拟节点找到真实节点 A，这样请求就能访问到真实节点 A 了。</p><p>上面为了方便你理解，每个真实节点仅包含 3 个虚拟节点，这样能起到的均衡效果其实很有限。而在实际的工程中，虚拟节点的数量会大很多，比如 Nginx 的一致性哈希算法，每个权重为 1 的真实节点就含有160 个虚拟节点。</p><p>另外，<strong>虚拟节点除了会提高节点的均衡度，还会提高系统的稳定性。<strong><strong>当节点变化时，会有不同的节点共同分担系统的变化，因此稳定性更高</strong></strong>。</strong></p><p>比如，当某个节点被移除时，对应该节点的多个虚拟节点均会移除，而这些虚拟节点按顺时针方向的下一个虚拟节点，可能会对应不同的真实节点，即这些不同的真实节点共同分担了节点变化导致的压力。</p><p>而且，有了虚拟节点后，<strong>还可以为硬件配置更好的节点增加权重</strong>，比如对权重更高的节点增加更多的虚拟机节点即可。</p><p>因此，<strong>带虚拟节点的一致性哈希方法不仅适合硬件配置不同的节点的场景，而且适合节点规模会发生变化的场景</strong>。</p><h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h1><p>不同的负载均衡算法适用的业务场景也不同的。</p><p><strong>轮询</strong>这类策略只能<strong>适用每个节点的数据都是相同的场景</strong>，访问任意节点都能请求到数据。但是不适用分布式系统，因为分布式系统意味着数据水平切分到了不同的节点上，访问数据的时候，一定要寻址存储该数据的节点。</p><p><strong>哈希算法</strong>虽然能建立数据和节点的映射关系，但是每次在节点数量发生变化的时候，最坏情况下所有数据都需要迁移，这样太麻烦了，所以<strong>不适用节点数量变化的场景</strong>。</p><p>为了<strong>减少迁移的数据量</strong>，就出现了<strong>一致性哈希算法</strong>。</p><p>一致性哈希是指将「存储节点」和「数据」都映射到一个首尾相连的哈希环上，如果增加或者移除一个节点，仅影响该节点在哈希环上顺时针相邻的后继节点，其它数据也不会受到影响。</p><p>但是一致性哈希算法<strong>不能够均匀的分布节点</strong>，会出现大量请求都集中在一个节点的情况，在这种情况下进行容灾与扩容时，容易出现雪崩的连锁反应。</p><p>为了解决一致性哈希算法不能够均匀的分布节点的问题，就需要引入虚拟节点，对一个真实节点做多个副本。不再将真实节点映射到哈希环上，而是<strong>将虚拟节点映射到哈希环上，并将虚拟节点映射到实际节点</strong>，所以这里有「两层」映射关系。</p><p>**引入虚拟节点后，可以会提高节点的均衡度，还会提高系统的稳定性。**所以，带虚拟节点的一致性哈希方法不仅适合硬件配置不同的节点的场景，而且适合节点规模会发生变化的场景。</p>`,89),r=[a];function e(s,o){return t(),i("div",null,r)}const m=n(p,[["render",e],["__file","4.html.vue"]]);export{m as default};
