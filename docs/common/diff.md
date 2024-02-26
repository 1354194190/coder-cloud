# 传统开发 VS OceanCode 开发
对比传统开发与OceanCode开发的区别。

## 后端比较
### 持久层比较
1. Domain,Service,Repository,Mapper,Mapper.xml

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|Domain(数据表)|使用jpa或mybaties中间件提供|根据Domain直接生成Service,Repository,Mapper,Mapper.xml
|Mapper|手动编写|根据Domain自动生成
|Repository|手动编写|根据Domain自动生成，支持数据隔离，如组合隔离，工作区隔离，软删除等业务场景
|JPA功能|框架提供JPA常用方法|生成常增删改查用方法，与Domain特性有关的方法
|安全性|需手动编写|根据Domain自动生成，避免对于空where条件导致全表扫描问题，如批量查询下禁止铭感数据返回，大文本字段返回等
|性能保证|需人工检视|存在性能接口需手动勾选才生成，对于分页等返回和参数有校验
|业务字段填充|手动设置|业务字段自动填充，如projectId,tenantId，创建时间,跟新时间会自动设置值
|Domain复杂数据结构|手动实现处理器映射|Domain中支持枚举，数组等复杂结构自动映射
|参数校验|手动校验|校验逻辑自动生成，对主键ID(Long)，


- OceanCode使用示例

定义Order(订单)数据模型
- id
- userId:Long(用户ID)
- deleted:Boolean(是否删除)
- status:OrderStatusEnum
- created:Timestamp
- updated:Timestamp

新增
```java
Order order = new Order();
// userId 自动从session上下文获取并填充
// created,updated,deleted自动填充
orderService.repository().addOne(order);

```

用户1(userId=1)根据ID查询
```java
// 对组件会进行校验 必须满足 id>0
// id=1 且userId=1,deleted=false 不存在 直接抛出异常码返回前端，无需再业务逻辑中处理
orderService.repository().findById(1L,true);// orderService.repository().findById(1L)
// id=1 且userId=1且deleted=false不存在 自己处理异常
orderService.repository().findById(1L,false);

//orderService.repository(false) 表示忽略业务字段特性，即满足id=1即可，无需满足userId=1和delete=false
orderService.repository(false).findById(1L,false);
```

用户1(userId=1)根据主键更新
```java
// 查询id=1 且userId=1 且 deleted=false的订单，不存在 抛出异常restfull接口直接抛出订单不存在
Order order = orderService.repository().findById(1L);

// 修改订单属性

// 更新 条件id=1 && userId=1 且delete=false等数据，跟新失败抛出异常，无需特别处理
orderService.repository().updateById(1L)
```


# 用户开发代码量

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
||  几乎全量手动编写  | <b style='color:red'>(仅仅业务代码)</b>仅需实现定义的函数，其他功能模块均自动生成，如接口调用链，接口入参校验，持久层代码，缓存配置，不同数据源的实现代码等 |

# 模块，组件，插件引入，函数

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|模块|无|在组件市场选择，如mongodb模块，es模块，具体参考组件市场
|中间件|依赖引入，代码编写|组件市场勾选，自动生成相关代码，自动适配其他组件|
|插件引入|无|在组件市场选择
|函数调用|依赖引入|在函数市场调用已发布的函数，如发送短信函数,自动管理版本。

# UT，自动化测试，压测,Fuzze测试，覆盖率

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|UT|全部编写，代码量大|自动生成|
|覆盖率|全部编写，代码量大|大部分自动生成，少部分手动补充
|自动化测试|全部编写，代码量大|生成对应语言的测试脚本，如python,jemeter等
|fuzze|全部编写，代码量大|自定生成测试代码
|测试代码|手动编写|可根据配置输入用力生成对应语言的测试代码|

# 框架引入，集成，配置

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|SpringBootWeb| 手动配置pom引入相关依赖  | 根据版本差异选中对应的依赖项，解决冲突，升级有漏洞的依赖 |
|Reds| 手动配置作标，编写配置类,RedisService实现  | 勾选Redis自动生成多redis源配置类和CacheServce(通用方法)+RedisService相关方法 |
|数据源| 手动引入jdbc依赖编写对应持久代码，多数据源配置代码  | 自动生成多数据源配置，依赖引入，持久层Service,Repository,Mapper相关代码 |


# 接口开发

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|Api|编写Controller代码和参数校验|自动生成controller接口，和参数校验代码|
|持久层|编写service,mapper,repository，mapper.xml代码|自动生安全的，支持数据隔离，多数据源相关代码操作方法|
|权限|编码实现，手动设置session上下文|通过配置自动生成相关的代码，拦截接口，验证用户登录与否，设置userId等会话数据
|调用方式|不同调用方式各实现一套|根据配置生成对应代码，如grpc实现代码等，不需要关心这些非业务逻辑部分
|接口文档|手动定期维护|自动生成，实时性，详细的接口文档|
|使用方式|前端，外部根据接口文档实现|支持生成前端js等代码，将接口变成普通方法，使用者只需关注方法的参数和返回值即可。

# 业务代码

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|框架|使用相关接口和特性|提供工具类，接口等剥离对业务代码的影响|
|中间件|编写实现|生成对应实现|
|数据隔离|需自己实现|支持对每种中间件的数据隔离代码生成，如数据库，redis,消息队列的中对租户(tenantId),工作区(projectId)的数据隔离特性|
|session管理|手动编写对应的代码|自动适配应用对session的处理，解析并设置上下文,如：userId,projectId,tenantId等参数的获取和设置|
|环境影响|根据分布式和单机不同业务代码实现不同|业务代码实现无区别，通过勾选组件会根据配置环境自动注入对应的实现，不对业务代码产生影响，如消息队列分布式下会注入选择的消息队列实现，单机下可选择阻塞队列来实现|

# 持久层开发

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|Mapper|定义接口编写特定数据源sql|根据数据源自动生成对应的mapper和sql
|方法安全性|需开发者关注|根据方法特性自动生成安全的实现，如敏感数据，大文本字段仅支持单条记录查询接口，批量接口不返回
|业务字段|手动设置|自动强制设置创建时间，更新时间，软删除，用户ID，租户ID，工作ID等业务相关的字段
|JPA|使用mybaties等框架特性|自动生成常用方法，存在性能问题的方法需手动选中
|规范性|代码监视发现|平台会对字段名命等做一些规范校验，如字段命名规范问题|
|多数据源|配置mapper的包路径|自动生成多数据源配置，一个模型一个表一批对应的方法接口和实现，天生支持

# 工具类

||  传统开发  | OceanCode  |
|----|  ----  | ----  |
|公共工具|手动编写|根据所选中的依赖中间件或组件生成对应的工具类，且对别的组件做了适配。如消息中间件在存在租户和工作区下会支持数据隔离
|中间件工具类|手动编写|自动生成，自动适配|
