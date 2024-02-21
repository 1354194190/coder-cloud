# 接口使用

## 后端
### 工具类
- SessionUtil
- ComponentUtil

### 持久层
持久层只能调用Service接口，通过service接口调用具体的Repository接口。
- findById

### 缓存
需勾选相关缓存组件可用

- CacheService
- RedisService: 勾选redis缓存可用

### 消息队列


## 前端

### 微应用