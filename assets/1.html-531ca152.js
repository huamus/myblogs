import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as g,c as s,a as i,b as t,d as e,f as r}from"./app-39e7b6f2.js";const l={},p={href:"https://xiaolincoding.com/",target:"_blank",rel:"noopener noreferrer"},d=i("p",null,"作者：小林coding",-1),u=r('<p>这是我的钱包，共有 100 万元。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046396.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>今天我心情好，我决定给你的转账 100 万，最后的结果肯定是我的余额变为 0 元，你的余额多了 100 万元，是不是想到就很开心？</p><p>转账这一动作在程序里会涉及到一系列的操作，假设我向你转账 100 万的过程是有下面这几个步骤组成的：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046407.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>可以看到这个转账的过程涉及到了两次修改数据库的操作。</p><p>假设在执行第三步骤之后，服务器忽然掉电了，就会发生一个蛋疼的事情，我的账户扣了 100 万，但是钱并没有到你的账户上，也就是说<strong>这 100 万消失了！</strong></p><p>要解决这个问题，就要保证转账业务里的所有数据库的操作是不可分割的，要么全部执行成功 ，要么全部失败，不允许出现中间状态的数据。</p><p>数据库中的「<strong>事务（<em><strong><strong>Transaction</strong></strong></em>）</strong>」就能达到这样的效果。</p><p>我们在转账操作前先开启事务，等所有数据库操作执行完成后，才提交事务，对于已经提交的事务来说，该事务对数据库所做的修改将永久生效，如果中途发生发生中断或错误，那么该事务期间对数据库所做的修改将会被回滚到没执行该事务之前的状态。</p><hr><h2 id="事务有哪些特性" tabindex="-1"><a class="header-anchor" href="#事务有哪些特性" aria-hidden="true">#</a> 事务有哪些特性？</h2><p>事务是由 MySQL 的引擎来实现的，我们常见的 InnoDB 引擎它是支持事务的。</p><p>要实现事务必须要遵守 4 个特性，分别如下：</p><ul><li><p><strong>原子性（Atomicity）</strong>：一个事务中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节，而且事务在执行过程中发生错误，会被回滚到事务开始前的状态，就像这个事务从来没有执行过一样。</p></li><li><ul><li>就好比买一件商品，购买成功时，则给商家付了钱，商品到手；购买失败时，则商品在商家手中，消费者的钱也没花出去。</li></ul></li><li><p><strong>一致性（Consistency）</strong>：是指事务操作前和操作后，数据满足完整性约束，数据库保持一致性状态。</p></li><li><ul><li>比如，用户 A 和用户 B 在银行分别有 800 元和 600 元，总共 1400 元，用户 A 给用户 B 转账 200 元，分为两个步骤，从 A 的账户扣除 200 元和对 B 的账户增加 200 元。一致性就是要求上述步骤操作后，最后的结果是用户 A 还有 600 元，用户 B 有 800 元，总共 1400 元，而不会出现用户 A 扣除了 200 元，但用户 B 未增加的情况（该情况，用户 A 和 B 均为 600 元，总共 1200 元）。</li></ul></li><li><p><strong>隔离性（Isolation）</strong>：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致，因为多个事务同时使用相同的数据时，不会相互干扰，每个事务都有一个完整的数据空间，对其他并发事务是隔离的。</p></li><li><ul><li>也就是说，消费者购买商品这个事务，是不影响其他消费者购买的。</li></ul></li><li><p><strong>持久性（Durability）</strong>：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。</p></li></ul><p>InnoDB 引擎通过什么技术来保证事务的这四个特性的呢？</p><ul><li><strong>持久性</strong>是通过 **redo log （重做日志）**来保证的；</li><li><strong>原子性</strong>是通过 <strong>undo log（回滚日志）</strong> 来保证的；</li><li><strong>隔离性</strong>是通过 <strong>MVCC（多版本并发控制） 或锁机制</strong>来保证的；</li><li>一致性则是通过持久性+原子性+隔离性来保证；</li></ul><p>这次将<strong>重点介绍事务的隔离性</strong>，这也是面试时最常问的知识的点。</p><p>为什么事务要有隔离性，我们就要知道并发事务时会引发什么问题。</p><h2 id="并行事务会引发什么问题" tabindex="-1"><a class="header-anchor" href="#并行事务会引发什么问题" aria-hidden="true">#</a> 并行事务会引发什么问题？</h2><p><strong>MySQL 服务端是允许多个客户端连接的，这意味着 MySQL 会出现同时处理多个事务的情况。</strong></p><p>那么<strong>在同时处理多个事务的时候，就可能出现脏读（dirty read）、不可重复读（non-repeatable read）、幻读（phantom read）的问题</strong>。</p><h3 id="脏读" tabindex="-1"><a class="header-anchor" href="#脏读" aria-hidden="true">#</a> 脏读</h3><p><strong>如果一个事务「读到」了另一个「未提交事务修改过的数据」，就意味着发生了「脏读」现象。</strong></p><p>举个栗子。</p><p>假设有 A 和 B 这两个事务同时在处理，事务 A 先开始从数据库中读取小林的余额数据，然后再执行更新操作，如果此时事务 A 还没有提交事务，而此时正好事务 B 也从数据库中读取小林的余额数据，那么事务 B 读取到的余额数据是刚才事务 A 更新后的数据，即使没有提交事务。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046606.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>因为事务 A 是还没提交事务的，也就是它随时可能发生回滚操作，<strong>如果在上面这种情况事务 A 发生了回滚，那么事务 B 刚才得到的数据就是过期的数据，这种现象就被称为脏读。</strong></p><h3 id="不可重复读" tabindex="-1"><a class="header-anchor" href="#不可重复读" aria-hidden="true">#</a> 不可重复读</h3><p><strong>在一个事务内多次读取同一个数据，如果出现前后两次读到的数据不一样的情况，就意味着发生了「不可重复读」现象。</strong></p><p>举个栗子。</p><p>假设有 A 和 B 这两个事务同时在处理，事务 A 先开始从数据库中读取小林的余额数据，然后继续执行代码逻辑处理，<strong>在这过程中如果事务 B 更新了这条数据，并提交了事务，那么当事务 A 再次读取该数据时，就会发现前后两次读到的数据是不一致的，这种现象就被称为不可重复读。</strong></p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046444.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="幻读" tabindex="-1"><a class="header-anchor" href="#幻读" aria-hidden="true">#</a> 幻读</h3><p><strong>在一个事务内多次查询某个符合查询条件的「记录数量」，如果出现前后两次查询到的记录数量不一样的情况，就意味着发生了「幻读」现象。</strong></p><p>举个栗子。</p><p>假设有 A 和 B 这两个事务同时在处理，事务 A 先开始从数据库查询账户余额大于 100 万的记录，发现共有 5 条，然后事务 B 也按相同的搜索条件也是查询出了 5 条记录。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141047931.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接下来，事务 A 插入了一条余额超过 100 万的账号，并提交了事务，此时数据库超过 100 万余额的账号个数就变为 6。</p><p>然后事务 B 再次查询账户余额大于 100 万的记录，此时查询到的记录数量有 6 条，<strong>发现和前一次读到的记录数量不一样了，就感觉发生了幻觉一样，这种现象就被称为幻读。</strong></p><h2 id="事务的隔离级别有哪些" tabindex="-1"><a class="header-anchor" href="#事务的隔离级别有哪些" aria-hidden="true">#</a> 事务的隔离级别有哪些？</h2><p>前面我们提到，当多个事务并发执行时可能会遇到「脏读、不可重复读、幻读」的现象，这些现象会对事务的一致性产生不同程序的影响。</p><ul><li>脏读：读到其他事务未提交的数据；</li><li>不可重复读：前后读取的数据不一致；</li><li>幻读：前后读取的记录数量不一致。</li></ul><p>这三个现象的严重性排序如下：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046429.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>SQL 标准提出了四种隔离级别来规避这些现象，隔离级别越高，性能效率就越低，这四个隔离级别如下：</p><ul><li><strong>读未提交（<em><strong><strong>read uncommitted</strong></strong></em>）</strong>，指一个事务还没提交时，它做的变更就能被其他事务看到；</li><li><strong>读提交（<em><strong><strong>read committed</strong></strong></em>）</strong>，指一个事务提交之后，它做的变更才能被其他事务看到；</li><li><strong>可重复读（<em><strong><strong>repeatable read</strong></strong></em>）</strong>，指一个事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，<strong>MySQL InnoDB 引擎的默认隔离级别</strong>；</li><li>**串行化（**<em><strong>serializable</strong></em> <strong>）</strong>；会对记录加上读写锁，在多个事务对这条记录进行读写操作时，如果发生了读写冲突的时候，后访问的事务必须等前一个事务执行完成，才能继续执行；</li></ul><p>按隔离水平高低排序如下：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046086.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>针对不同的隔离级别，并发事务时可能发生的现象也会不同。</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141047857.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以，要解决脏读现象，就要升级到「读已提交」以上的隔离级别；要解决不可重复读现象，就要升级到「可重复读」的隔离级别，要解决幻读现象不建议将隔离级别升级到「串行化」。</p><p>MySQL 在「可重复读」隔离级别下，可以很大程度上避免幻读现象的发生（注意是很大程度避免，并不是彻底避免），所以 MySQL 并不会使用「串行化」隔离级别来避免幻读现象的发生，因为使用「串行化」隔离级别会影响性能。</p>',53),c=i("strong",null,"MySQL InnoDB 引擎的默认隔离级别虽然是「可重复读」，但是它很大程度上避免幻读现象（并不是完全解决了，详见这篇",-1),m={href:"https://xiaolincoding.com/mysql/transaction/phantom.html",target:"_blank",rel:"noopener noreferrer"},h=i("strong",null,"）",-1),f=r('<ul><li><p>针对<strong>快照读</strong>（普通 select 语句），是<strong>通过 MVCC 方式解决了幻读</strong></p></li><li><ul><li>因为可重复读隔离级别下，事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，即使中途有其他事务插入了一条数据，是查询不出来这条数据的，所以就很好的避免了幻读问题。</li></ul></li><li><p>针对<strong>当前读</strong>（select ... for update 等语句），是<strong>通过 next-key lock（记录锁+间隙锁）方式解决了幻读</strong></p></li><li><ul><li>因为当执行 select ... for update 语句的时候，会加上 next-key lock，如果有其他事务在 next-key lock 锁范围内插入了一条记录，那么这个插入语句就会被阻塞，无法成功插入，所以就很好的避免了幻读问题。</li></ul></li></ul><p>接下来，举个具体的例子来说明这四种隔离级别，有一张账户余额表，里面有一条账户余额为 100 万的记录。然后有两个并发的事务，事务 A 只负责查询余额，事务 B 则会将我的余额改成 200 万，下面是按照时间顺序执行两个事务的行为：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141047159.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在不同隔离级别下，事务 A 执行过程中查询到的余额可能会不同：</p><ul><li>在「读未提交」隔离级别下，事务 B 修改余额后，虽然没有提交事务，但是此时的余额已经可以被事务 A 看见了，于是事务 A 中余额 V1 查询的值是 200 万，余额 V2、V3 自然也是 200 万了；</li><li>在「读提交」隔离级别下，事务 B 修改余额后，因为没有提交事务，所以事务 A 中余额 V1 的值还是 100 万，等事务 B 提交完后，最新的余额数据才能被事务 A 看见，因此额 V2、V3 都是 200 万；</li><li>在「可重复读」隔离级别下，事务 A 只能看见启动事务时的数据，所以余额 V1、余额 V2 的值都是 100 万，当事务 A 提交事务后，就能看见最新的余额数据了，所以余额 V3 的值是 200 万；</li><li>在「串行化」隔离级别下，事务 B 在执行将余额 100 万修改为 200 万时，由于此前事务 A 执行了读操作，这样就发生了读写冲突，于是就会被锁住，直到事务 A 提交后，事务 B 才可以继续执行，所以从 A 的角度看，余额 V1、V2 的值是 100 万，余额 V3 的值是 200万。</li></ul><p>这四种隔离级别具体是如何实现的呢？</p><ul><li>「读未提交」：因为可以读到未提交事务修改的数据，所以<strong>直接读取最新的数据</strong>就好了；</li><li>「串行化」：通过<strong>加读写锁</strong>的方式来避免并行访问；</li><li>「读已提交」和「可重复读」：通过 <strong>Read View 来实现的，它们的区别在于创建 Read View 的时机不同，大家可以把 Read View 理解成一个数据快照，就像相机拍照那样，定格某一时刻的风景。「读已提交」隔离级别是在「每个语句执行前」都会重新生成一个 Read View，而「可重复读」隔离级别是「启动事务时」生成一个 Read View，然后整个事务期间都在用这个 Read View</strong>。</li></ul><p>注意，执行「开始事务」命令，并不意味着启动了事务。在 MySQL 有两种开启事务的命令，分别是：</p><ul><li>第一种：begin/start transaction 命令；</li><li>第二种：start transaction with consistent snapshot 命令；</li></ul><p>这两种开启事务的命令，事务的启动时机是不同的：</p><ul><li>执行了 begin/start transaction 命令后，并不代表事务启动了。<strong>只有在执行这个命令后，执行了增删查改操作的 SQL 语句，才是事务真正启动的时机；</strong></li><li>执行了 start transaction with consistent snapshot 命令，就会马上启动事务。</li></ul><h2 id="read-view-在-mvcc-里如何工作的" tabindex="-1"><a class="header-anchor" href="#read-view-在-mvcc-里如何工作的" aria-hidden="true">#</a> Read View 在 MVCC 里如何工作的？</h2><p>我们需要了解两个知识：</p><ul><li>Read View 中四个字段作用；</li><li>聚簇索引记录中两个跟事务有关的隐藏列；</li></ul><p>那 Read View 到底是个什么东西？</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046134.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Read View 有四个重要的字段：</p><ul><li>m_ids ：指的是在创建 Read View 时，当前数据库中「活跃事务」的<strong>事务 id 列表</strong>，注意是一个列表，<strong>“活跃事务”指的就是，启动了但还没提交的事务</strong>。</li><li>min_trx_id ：指的是在创建 Read View 时，当前数据库中「活跃事务」中事务 <strong>id 最小的事务</strong>，也就是 m_ids 的最小值。</li><li>max_trx_id ：这个并不是 m_ids 的最大值，而是<strong>创建 Read View 时当前数据库中应该给下一个事务的 id 值</strong>，也就是全局事务中最大的事务 id 值 + 1；</li><li>creator_trx_id ：指的是<strong>创建该 Read View 的事务的事务 id</strong>。</li></ul><p>知道了 Read View 的字段，我们还需要了解聚簇索引记录中的两个隐藏列。</p><p>假设在账户余额表插入一条小林余额为 100 万的记录，然后我把这两个隐藏列也画出来，该记录的整个示意图如下：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141047797.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于使用 InnoDB 存储引擎的数据库表，它的<strong>聚簇索引记录中都包含下面两个隐藏列：</strong></p><ul><li>trx_id，当一个事务对某条聚簇索引记录进行改动时，就会<strong>把该事务的事务 id 记录在 trx_id 隐藏列里</strong>；</li><li>roll_pointer，每次对某条聚簇索引记录进行改动时，都会把旧版本的记录写入到 undo 日志中，然后<strong>这个隐藏列是个指针，指向每一个旧版本记录</strong>，于是就可以通过它找到修改前的记录。</li></ul><p>在创建 Read View 后，我们可以将记录中的 trx_id 划分这三种情况：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141047295.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>一个事务去访问记录的时候，除了自己的更新记录总是可见之外，还有这几种情况：</p><ul><li><p>如果记录的 trx_id 值小于 Read View 中的 min_trx_id 值，表示这个版本的记录是在创建 Read View <strong>前</strong>已经提交的事务生成的，所以该版本的记录对当前事务<strong>可见</strong>。</p></li><li><p>如果记录的 trx_id 值大于等于 Read View 中的 max_trx_id 值，表示这个版本的记录是在创建 Read View <strong>后</strong>才启动的事务生成的，所以该版本的记录对当前事务<strong>不可见</strong>。</p></li><li><p>如果记录的 trx_id 值在 Read View 的 min_trx_id 和 max_trx_id 之间，需要判断 trx_id 是否在 m_ids 列表中：</p></li><li><ul><li>如果记录的 trx_id <strong>在</strong> m_ids 列表中，表示生成该版本记录的活跃事务依然活跃着（还没提交事务），所以该版本的记录对当前事务<strong>不可见</strong>。</li><li>如果记录的 trx_id <strong>不在</strong> m_ids列表中，表示生成该版本记录的活跃事务已经被提交，所以该版本的记录对当前事务<strong>可见</strong>。</li></ul></li></ul><p><strong>这种通过「版本链」来控制并发事务访问同一个记录时的行为就叫 MVCC（多版本并发控制）。</strong></p><h2 id="可重复读是如何工作的" tabindex="-1"><a class="header-anchor" href="#可重复读是如何工作的" aria-hidden="true">#</a> 可重复读是如何工作的？</h2><p><strong>可重复读隔离级别是启动事务时生成一个 Read View，然后整个事务期间都在用这个 Read View</strong>。</p><p>假设事务 A （事务 id 为51）启动后，紧接着事务 B （事务 id 为52）也启动了，那这两个事务创建的 Read View 如下：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141048403.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>事务 A 和 事务 B 的 Read View 具体内容如下：</p><ul><li>在事务 A 的 Read View 中，它的事务 id 是 51，由于它是第一个启动的事务，所以此时活跃事务的事务 id 列表就只有 51，活跃事务的事务 id 列表中最小的事务 id 是事务 A 本身，下一个事务 id 则是 52。</li><li>在事务 B 的 Read View 中，它的事务 id 是 52，由于事务 A 是活跃的，所以此时活跃事务的事务 id 列表是 51 和 52，<strong>活跃的事务 id 中最小的事务 id 是事务 A</strong>，下一个事务 id 应该是 53。</li></ul><p>接着，在可重复读隔离级别下，事务 A 和事务 B 按顺序执行了以下操作：</p><ul><li>事务 B 读取小林的账户余额记录，读到余额是 100 万；</li><li>事务 A 将小林的账户余额记录修改成 200 万，并没有提交事务；</li><li>事务 B 读取小林的账户余额记录，读到余额还是 100 万；</li><li>事务 A 提交事务；</li><li>事务 B 读取小林的账户余额记录，读到余额依然还是 100 万；</li></ul><p>接下来，跟大家具体分析下。</p><p>事务 B 第一次读小林的账户余额记录，在找到记录后，它会先看这条记录的 trx_id，此时<strong>发现 trx_id 为 50，比事务 B 的 Read View 中的 min_trx_id 值（51）还小，这意味着修改这条记录的事务早就在事务 B 启动前提交过了，所以该版本的记录对事务 B 可见的</strong>，也就是事务 B 可以获取到这条记录。</p><p>接着，事务 A 通过 update 语句将这条记录修改了（还未提交事务），将小林的余额改成 200 万，这时 MySQL 会记录相应的 undo log，并以链表的方式串联起来，形成<strong>版本链</strong>，如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046663.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>你可以在上图的「记录的字段」看到，由于事务 A 修改了该记录，以前的记录就变成旧版本记录了，于是最新记录和旧版本记录通过链表的方式串起来，而且最新记录的 trx_id 是事务 A 的事务 id（trx_id = 51）。</p><p>然后事务 B 第二次去读取该记录，<strong>发现这条记录的 trx_id 值为 51，在事务 B 的 Read View 的 min_trx_id 和 max_trx_id 之间，则需要判断 trx_id 值是否在 m_ids 范围内，判断的结果是在的，那么说明这条记录是被还未提交的事务修改的，这时事务 B 并不会读取这个版本的记录。而是沿着 undo log 链条往下找旧版本的记录，直到找到 trx_id 「小于」事务 B 的 Read View 中的 min_trx_id 值的第一条记录</strong>，所以事务 B 能读取到的是 trx_id 为 50 的记录，也就是小林余额是 100 万的这条记录。</p><p>最后，当事物 A 提交事务后，<strong>由于隔离级别是「可重复读」，所以事务 B 再次读取记录时，还是基于启动事务时创建的 Read View 来判断当前版本的记录是否可见。所以，即使事物 A 将小林余额修改为 200 万并提交了事务， 事务 B 第三次读取记录时，读到的记录都是小林余额是 100 万的这条记录</strong>。</p><p>就是通过这样的方式实现了，「可重复读」隔离级别下在事务期间读到的记录都是事务启动前的记录。</p><h2 id="读提交是如何工作的" tabindex="-1"><a class="header-anchor" href="#读提交是如何工作的" aria-hidden="true">#</a> 读提交是如何工作的？</h2><p><strong>读提交隔离级别是在每次读取数据时，都会生成一个新的 Read View</strong>。</p><p>也意味着，事务期间的多次读取同一条数据，前后两次读的数据可能会出现不一致，因为可能这期间另外一个事务修改了该记录，并提交了事务。</p><p>那读提交隔离级别是怎么工作呢？我们还是以前面的例子来聊聊。</p><p>假设事务 A （事务 id 为51）启动后，紧接着事务 B （事务 id 为52）也启动了，接着按顺序执行了以下操作：</p><ul><li>事务 B 读取数据（创建 Read View），小林的账户余额为 100 万；</li><li>事务 A 修改数据（还没提交事务），将小林的账户余额从 100 万修改成了 200 万；</li><li>事务 B 读取数据（创建 Read View），小林的账户余额为 100 万；</li><li>事务 A 提交事务；</li><li>事务 B 读取数据（创建 Read View），小林的账户余额为 200 万；</li></ul><p>那具体怎么做到的呢？我们重点看事务 B 每次读取数据时创建的 Read View。前两次 事务 B 读取数据时创建的 Read View 如下图：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046703.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们来分析下为什么事务 B 第二次读数据时，读不到事务 A （还未提交事务）修改的数据？</p><p>事务 B 在找到小林这条记录时，会看这条记录的 trx_id 是 51，在事务 B 的 Read View 的 min_trx_id 和 max_trx_id 之间，接下来需要判断 trx_id 值是否在 m_ids 范围内，判断的结果是在的，那么说明<strong>这条记录是被还未提交的事务修改的，这时事务 B 并不会读取这个版本的记录</strong>。而是，沿着 undo log 链条往下找旧版本的记录，直到找到 trx_id 「小于」事务 B 的 Read View 中的 min_trx_id 值的第一条记录，所以事务 B 能读取到的是 trx_id 为 50 的记录，也就是小林余额是 100 万的这条记录。</p><p>我们来分析下为什么事务 A 提交后，事务 B 就可以读到事务 A 修改的数据？</p><p>在事务 A 提交后，<strong>由于隔离级别是「读提交」，所以事务 B 在每次读数据的时候，会重新创建 Read View</strong>，此时事务 B 第三次读取数据时创建的 Read View 如下：</p><figure><img src="https://raw.githubusercontent.com/huamus/picture-bed/main/202308141046095.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>事务 B 在找到小林这条记录时，<strong>会发现这条记录的 trx_id 是 51，比事务 B 的 Read View 中的 min_trx_id 值（52）还小，这意味着修改这条记录的事务早就在创建 Read View 前提交过了，所以该版本的记录对事务 B 是可见的</strong>。</p><p>正是因为在读提交隔离级别下，事务每次读数据时都重新创建 Read View，那么在事务期间的多次读取同一条数据，前后两次读的数据可能会出现不一致，因为可能这期间另外一个事务修改了该记录，并提交了事务。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p><strong>事务是在 MySQL 引擎层实现的</strong>，我们常见的 InnoDB 引擎是支持事务的，事务的四大特性是原子性、一致性、隔离性、持久性。</p><p>当多个事务并发执行的时候，会引发脏读、不可重复读、幻读这些问题，那为了避免这些问题，SQL 提出了四种隔离级别，分别是读未提交、读已提交、可重复读、串行化，从左往右隔离级别顺序递增，隔离级别越高，意味着性能越差，InnoDB 引擎的默认隔离级别是可重复读。</p><p>要解决脏读现象，就要将隔离级别升级到读已提交以上的隔离级别，要解决不可重复读现象，就要将隔离级别升级到可重复读以上的隔离级别。</p><p>而对于幻读现象，不建议将隔离级别升级为串行化，因为这会导致数据库并发时性能很差。MySQL InnoDB 引擎的默认隔离级别虽然是「可重复读」，但是它很大程度上避免幻读现象（并不是完全解决了，解决的方案有两种：</p><ul><li>针对<strong>快照读</strong>（普通 select 语句），是<strong>通过 MVCC 方式解决了幻读</strong>，因为可重复读隔离级别下，事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的，即使中途有其他事务插入了一条数据，是查询不出来这条数据的，所以就很好的避免了幻读问题。</li><li>针对<strong>当前读</strong>（select ... for update 等语句），是<strong>通过 next-key lock（记录锁+间隙锁）方式解决了幻读</strong>，因为当执行 select ... for update 语句的时候，会加上 next-key lock，如果有其他事务在 next-key lock 锁范围内插入了一条记录，那么这个插入语句就会被阻塞，无法成功插入，所以就很好的避免幻读问题。</li></ul><p>对于「读已提交」和「可重复读」隔离级别的事务来说，它们是通过 Read View 来实现的，它们的区别在于创建 Read View 的时机不同：</p><ul><li>「读已提交」隔离级别是在每个 select 都会生成一个新的 Read View，也意味着，事务期间的多次读取同一条数据，前后两次读的数据可能会出现不一致，因为可能这期间另外一个事务修改了该记录，并提交了事务。</li><li>「可重复读」隔离级别是启动事务时生成一个 Read View，然后整个事务期间都在用这个 Read View，这样就保证了在事务期间读到的数据都是事务启动前的记录。</li></ul><p>这两个隔离级别实现是通过「事务的 Read View 里的字段」和「记录中的两个隐藏列」的比对，来控制并发事务访问同一个记录时的行为，这就叫 MVCC（多版本并发控制）。</p><p>在可重复读隔离级别中，普通的 select 语句就是基于 MVCC 实现的快照读，也就是不会加锁的。而 select .. for update 语句就不是快照读了，而是当前读了，也就是每次读都是拿到最新版本的数据，但是它会对读到的记录加上 next-key lock 锁。</p>',69);function _(x,w){const n=o("ExternalLinkIcon");return g(),s("div",null,[i("blockquote",null,[i("p",null,[t("原文链接："),i("a",p,[t("https://xiaolincoding.com/"),e(n)])]),d]),u,i("p",null,[c,i("a",m,[t("文章(opens new window)"),e(n)]),h,t("，解决的方案有两种：")]),f])}const b=a(l,[["render",_],["__file","1.html.vue"]]);export{b as default};
