# knowledge-tree
api

数据库连接暂不提供；

数据内容目录 ——treeSql



1. MyController 中写接口 调用Service方法，返回一个数组对象（entity）
2. Service中写调用方法，引用 Dao中的查询库表方法；
3. Dao中写查询数据库的函数 -调用 mapper中的查库语句
4. mapper中的 查库语句  引用 entity 中的实体
5. entity中要定义实体字段
