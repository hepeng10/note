<?php

/*在使用之前应该先修改字符编码，转换为utf8；在mysql的配置文件中修改：
[mysql]
default-character-set=utf8
[mysqld]
character-set-server=utf8
控制器中可以使用：show variables like "%char%";来查询数据库使用的字符编码*/
MYSQL字段名默认不区分大小写，所以应该以_分割的方式来命名字段名

use databasename;  //使用数据库
show databases;  //展示所有数据库
show tables;  //展示选择的数据库中的所有数据表
desc tablename;  //展示选择的表的结构

//select语句：mysql不区分大小写
//select子句顺序：select from where group by having order by limit 

select [all|distinct] {*|表名.*|字段1 [as 别名1][,[表名.]字段2 [as 别名2][,...]]} from 表名 表达式[,...] [in 外部数据库] [where...] [group by...] [having...] [order by...] [limit...] //修改数据，大括号表示必须从里面选一个，*表示所有

select 字段名1,字段名2,字段名3 from 表名;  //从表中查询指定字段的所有内容
select * from 表名;  //从表中查询出所有字段的内容
select distinct 字段名1,字段名2 from 表名;  //使用distinct关键字，查询字段的内容如果有重复的则只显示一次；查询多个字段，则distinct应用与所有字段
select 字段名 from 表名 limit 5,10;  //使用limit关键字来筛选查询的内容，从第几行开始取出几行；第一行为0
select 字段名1,字段名2,字段名3 from 表名 order by 字段名1;  //使用order by进行排序，默认为升序排序;order by后的排序字段必须是查询字段
select 字段名1,字段名2,字段名3 from 表名 order by 字段名1 desc;  //使用desc降序排序
select 字段名1,字段名2,字段名3 from 表名 order by 字段名1,字段名2;  //先按字段名1进行排序，再按字段名2进行排序；有相同的字段名1时可以使用此方法
select 字段名1,字段名2,字段名3 from 表名 order by 字段名1 desc, 字段名2;  //按字段名1降序排序后，再在结果中按字段名2升序排序
select price from products order by price desc limit 1;  //使用order by和limit组合，查找出最贵的产品；limit必须位于order by之后

//使用where进行查询：
select name from products where price > 100 order by price;  //使用where语句查找出价格大于100的产品；order by必须位于where之后；比较符有：>,<,=,!=,>=,<=,between；where后的条件字段可以不是查询字段
select name,price from products where name = 'android' order by price;  //字符串需要使用单引号(别用双引号)，数值可以不用引号
select name,price from products where price is null;  //使用is null来查询没有价格的数据(不是价格为0)
select name,price from products where name='android' and price >1000;  //使用and进行组合查询；可以使用多个过滤条件，每两个间都得使用and
select name from products where name='android' or name = 'iphone';  //使用or进行组合查询；可以使用多个过滤条件，每两个间都得使用or
select name from products where name in ('android','iphone');  //使用in进行查找，效果和or相同；in操作符的最大优点是可以在in后面的条件中使用别的select语句，进行子查询
select name from products where name='android' in (select name,price from products where price > 1000);  //使用in进行子查询
select name from products where name not in ('android','iphone');  //使用not操作符查询给定条件以外的；not可以对in,between和exists进行作用
select name from products where (name='android' or name = 'iphone') and price > 1000;  //当or和and同时使用的时候，将优先处理and，所以需要使用括号来修改优先级
select name from products where name like 'sony%';  //使用like来进行模糊匹配，%表示那边可以有任意多个字符；这里就是搜索sony开头的所有数据；%不能匹配null
select name from products where name like '_so_y';  //使用_来匹配单个字符；使用通配符速度较慢

//使用正则表达式查询：查询的数据中部分能与给出的正则匹配，则这条数据就匹配
select price from products where price regexp '.000' order by price;  //使用regexp关键词来进行正则表达式匹配，后面的'.000'就是正则表达式；从查询的price的所有数据中匹配.000，.是正则的一个通配符，匹配任意一个字符串
select name from products where name regexp binary '^SONY';  //使用binary将区分大小写，默认不区分大小写
select name from products where name regexp 'sony|htc|apple';  //使用|进行or匹配
select name from products where name regexp 'sony [XZ]';  //使用[]匹配里面的其中一个，这里将匹配sony X和sony Z；实际上[XZ]为[X|Z]的缩写
select name from products where name regexp 'sony [^XZ]';  //在[]里的开头加上^表示匹配除了XZ以外的；另外[0123456789]可以使用[0-9]这样的写法
select name from products where name regexp '\\.';  //使用\\进行转意，这里匹配.字符，匹配\则要使用\\\进行匹配（其中一个\是mysql解析，另一个\是正则表达式库解析）

//元字符，放在字符后面：*表示0个1个或多个，+表示1个或多个，?表示0个或1个，{n}指定数目匹配，{n,}不少于指定数目的匹配，{n,m}匹配数目的范围(m不超过255)
select name from products where name regexp '\\([0-5] points?\\)';  //匹配(0-5之间任意一个数 point后面的s可有可无)
select name from products where name regexp '^[0-9].{4}$';  //使用^来表示以什么开头，$表示以什么结尾；这里匹配以0-9开头，后面有4个字符的精确匹配

//concat()函数拼接数据：
select concat(rtrim(name),' (',country,')') as sale from products;  //从数据表products中查询出name字段和country字段，并使用concat()函数将这两个字段合并为一个字段；如：name字段中的一行为sony，country字段中的这行为HK，这里将拼接为一个字段sony (HK)；councat()函数中没加引号就为字段名，加了引号就输出字符串；mysql函数rtrim清除右边空格；使用as给这个拼接后的新字段取一个别名

//算术计算：支持+-*/没有取模
select id,price,quantity,quantity*price as expanded_price from products where name='sony';  //这里quantity*price as expanded_price使用*计算出总价，并用expanded_price作为这个新的字段名

//mysql函数：
//常用文本处理函数：
upper()/*转化为大写*/ lower()/*转化为小写*/ length()/*返回字符串长度*/ trim()/*去掉左右两边的空格*/
//日期时间函数：日期格式必须为yyy-mm-dd使用-连接
adddate()/*添加一个日期*/ addtime/*添加一个时间*/ curdate()/*返回当前日期*/ curtime/*返回当前时间*/ date()/*返回日期时间的日期部分*/ time()/*返回时间部分*/ datediff()/*计算两个日期之差*/ date_add()/*高度灵活的日期计算函数*/ date_format()/*返回一个格式化的日期或时间串*/ day()/*返回日期的天数部分*/ hour() minute() second() month() year() now() /*返回指定日期或时间*/
select id,name from products where date(sale_date) = 2013-10-1;  //有可能sale_date的格式为2013-10-1 19:05:13，由于有具体的时间，所以必须使用date()函数只取出日期部分进行匹配
select id,name from products where year(sale_date) = 2013 and month(sale_date) = 9;  //使用year()和month()查询2013年9月的所有销售
//数值处理函数：
abs()/*绝对值*/ mod()/*返回除操作的余数*/ rand()/*返回一个随机数*/ sqrt()/*平方根*/ pi()/*圆周率*/...
//聚集函数：
count()/*返回某列的行数*/ avg()/*返回某列的平均值*/ sum()/*返回某列之和*/ max()/*返回某列最大值*/ min()/*返回某列最小值*/
select avg(price) as avg_price from products where price > 1000;  //查询出价格大于1000的所有价格的平均值
select count(*) as num_cust from products;  //使用count(*)查询总行数
select count(email) as num_cust from products;  //查询有email的数据的总行数
select avg(distinct price) as avg_price from products;  //使用了distinct则只对不同价格的数据取平均值，默认为all
select count(*) as num_items,min(price) as min_price,avg(price) as avg_price from products;  //一次性使用多个聚集函数

//数据分组：
select name,count(*) as prods from products group by name;  //这里使用了group by关键字对数据进行分组，则name相同的为一组，count(*)也就自动变为对不同的name进行统计(详见mysql必知必会94p)
select name,count(*) as prods from products group by name having count(*) >= 3;  //使用having对分组进行过滤，having的语法和where几乎一致，只是having用于分组而where不能用于分组
select name,count(*) as prods from products where price > 1000 group by name having count(*) >= 3 order by prods;  //group by前面也可以使用where语句先进行过滤，后面可以跟order by

//子查询：可以用在各个地方，只要使用()即可
select name from products where type in (select type from user where `like` = 'movie');  //从user表中查询like为movie的type，再从products表中查询type等于前面所查询出的type的name(详见91p)
slect price,(select count(*) from user where user.name = products.username) as order from products order by price;  //先从user表中的name字段等于products表中的username字段进行查询，再从这个结果中进行查询；这里使用了表名.字段名的方式进行相关子查询

//联结表：联结是一种机制，用来在一条select语句中关联表，进行关联查询；需要指定主键和外键(109p)
//内部联结：又叫等值联结，通过两个表中的相关联的一个字段(主键和外键)进行联结
select vend_name,prod_name,prod_price frome vendors,products where vendors.vend_id = products.vend_id order by vend_name,prod_name;  //从vendors表和products表中进行关联查询，vend_id为vendors表的主键和products表的外键；如果没有where限定条件则会产生笛卡尔积(查询出的行数是第一个表的行数乘以第二个表的行数；111p)
select vend_name,prod_name,prod_price frome vendors inner join products on vendors.vend_id = products.vend_id order by vend_name,prod_name;  //这条语句的查询结果和上面相同，只是语法不同，使用了inner join on这三个关键字
select vend_name,prod_name,prod_price frome vendors inner join products on vendors.vend_id = products.vend_id where vendors.vend_id=3;  //使用了join on后还可以使用where，从join on查询出的结果中继续进行查询
select name from products inner join user on products.type = user.type and user.like = 'movie';  //某些时候可以使用联结查询替代子查询
select vend_name,prod_name,prod_price frome vendors as v inner join products as p on v.vend_id = p.vend_id;  //通过给表取别名缩短sql语句
//自联结：在同一个表中进行联结查询
select id,name from products where id = (select id from products where id = 'DTNTR');
select p1.id,p1.name from products as p1,products as p2 where p1.id=p2.id and p2.id='DTNTR';  //这两条语句效果相同，但使用自联结效率高于子查询
//外部联结：
select customers.id,orders.num from customers left outer join orders on customers.id = orders.id;  //使用outer join进行外部联结，而且必须有left或right关键字来指定包括其所有行的表(on后面的表)，这里从左边表(customers表)中选择所有行；会从左表 (customers) 那里返回所有的行，即使在右表 (orders) 中没有匹配的行(会留空)。(可以简写为left join)
//使用聚集函数：
select customers.cust_id,customers.name,count(order.num) as ord_num from customers inner join orders on customers.cust_id = orders.cust_id group by customers.cust_id;  //这里使用了count()函数；通过对cust_id进行分组，count()函数也会根据不同的分组进行统计

//组合查询：
select id price from products where price > 1000 or name = 'sony';
select id price from products where price > 1000 union select id price from products where name = 'sony' order by price;  //使用union关键字连接多个select语句进行组合查询；这条语句等价于上面那条；注意：union连接的每个select语句必须拥有相同的字段、表达式或聚集函数，order by必须在最后一个select语句

//全文本搜索：myisam引擎才支持此功能(129p)；搜索的词所在行如果超过总行数的50%则无法进行搜索(140p)；忽略单引号don't索引为dont；搜索汉字返回的结果不一定恰当
//需要在创建表的时候使用子句 fulltext(字段1,字段2...) 创建索引(131p)
select intro from products where match(intro) against('free');  //使用match()函数指定被搜索的字段，这个字段必须是fulltext()定义的字段；against()函数指定要搜索的表达式；这里就是在intro字段中搜索含有free这个单词的数据；搜索不区分大小写，除非使用binary；全文本搜索会按照匹配结果自动排序，如free的位置在intro中靠前的会排在前面(133p)
//查询扩展：
select intro from products where match(intro) against('free' with query expansion);  //使用with query expansion进行查询扩展，不仅会搜索出含有free的数据，还会搜索出与这些含有free的数据有关系的数据(135p)
//布尔文本搜索：不需要fulltext()索引，速度缓慢；可以搜索含有某个词并且不含有某个词的情况
select intro from products where match(intro) against('free -sony*' in boolean mode);  //使用了in boolean mode进行布尔文本搜索；这里搜索结果为含有free并且不以sony开头的数据
//全文本布尔操作符：+包含，词必须存在；-排除，词必须不存在；>提高搜索词的等级；<降低搜索词的等级；()把词组成一个子表达式，可以对这个子表达式进行包含排除等操作；*通配符；""定义一个字符串，对这个字符串进行包含排除等操作(138p)
select intro from products where match(intro) against('free sony' in boolean mode);  //只要能匹配free或sony其中一个即可
select intro from products where match(intro) against('+free +sony' in boolean mode);  //必须free和sony同时存在才匹配
select intro from products where match(intro) against('>free <sony' in boolean mode);  //增加free的等级，降低sony的等级；对搜索结果的排序有影响
select intro from products where match(intro) against('+free +(<sony)' in boolean mode);  //多个操作的时候需要使用()



//insert into语句：
insert into 表名(字段1,字段2,字段3...) values(值1,值2,值3...);  //insert into的基本语法；省略的字段要求：1、该字段允许null值，2、该字段有默认值
insert into 表名(字段1,字段2,字段3...) values(值1,值2,值3...),(值1,值2,值3...);  //一次性插入多条数据，用,隔开；比使用多条insert语句性能更高
insert into products(name,price) values('lt26i',1800),('iphone5s',5200);
insert low_priority into...  //在insert和into间插入low_priority，可以降低insert语句的优先级；insert比较消耗性能；low_priority也适用于update和delete
insert into 表名(字段1,字段2,字段3...) select 字段1,字段2,字段3... from 表名 where ...;  //从一个表中查询出数据，将这些数据插入另一个表；可实现自我复制功能



//update语句：注意别忽略where语句，否则将更新所有数据
update 表名 set 字段名=表达式(可以有多个，用逗号隔开) where 条件 [order by 字段(以此字段升序排列) [desc(降序)]] [limit 行数(限制修改的条数)]; //修改数据语法
update products set price = 5000,color = '土豪金' where name = 'iphone5s';  //一次性修改多个字段，使用,隔开
update products set color = null where name = 'iphone5s';  //将值设为null删除这条数据的这个字段
update ignore set color = 'black' where id > 100;  //update默认情况下，在更新多行数据时，只要有一行出错，则所有更新失败；使用了ignore则即使出错也会继续更新



//delete语句：注意别忽略where语句，否则将删除所有数据
delete from 表名 where 条件 [order by 字段] [limit 行数]; //删除数据语法
delete from products where id>100;


//创建用户：
grant 权限 on 数据库.数据表 to 用户名@登录主机 identified by "密码"; //创建用户
grant select,insert,update,delete on mydb.* to user@localhost indentified by "123456";
//创建数据库：
creat database [if not exists] bookstore; //creat database-创建数据库
//create table创建表：
creat table [if not exists] books( //create table-创建数据表，创建数据表时需要给出至少一个字段(又叫数据列、表头)，并且必须有字段类型
	id int not null auto_increment, //拥有自增长属性的字段；每个表只允许一个auto_increment，而且必须被索引(如成为主键)
	bookname varchar(50) not null default '', //普通字段最好设置为not null，并给个默认值
	price double not null default 0.00,  //mysql不允许使用函数作为默认值，只支持常量
	info text,
	primary key(id), //将id设置为主键；主键字段的值是唯一的，比如这里的id不能有重复
	index book_bookname(bookname), //给表头bookname设置索引
	fulltext (info)
)engine=innodb default character set utf8 collate utf8_general_ci; //设置表引擎，字符集和校对规则

primary key(id,name)  //指定主键，当使用多个字段时，表示这些字段的组合必须唯一
innodv和myisam的区别：innodb支持事务处理，而myisam不支持；myisam支持全文索引，而innodb不支持；myisam效率更高；引擎在数据库中可以混用，但外键不能跨引擎(161p)

//字段属性
unsigned //设置数值类型不包含负数，可使字段存储长度增加一倍
zerofill //当插入的数值位数不足设置的位数时，在前面用0填充至设置的位数
auto_increment //设置字段为自动增量属性，每插入一个数据，自动+1；不允许有重复的数值，可插入自定义数值，自增将从最大数值+1
null & not null //插入数据时，此字段是否可以不插入数据；默认为null，没插入数据将自动给值'null'；not null表示必须插入数据。由于null值在数据类型转换时可能转换为null,0,false等多种值，所以通常设置为not null，并给一个default值
default //给字段指定一个默认值，如果插入数据时没有在此列添加值，则默认添加此值
primary key //创建主键索引；不允许有重复的值，一个数据表只能有一个主键索引，最好每个数据表都有一个
unique //唯一索引；不允许有重复的值，可以有多个
index //常规索引；用在搜索、排序、分组等操作的数据列上提高效率，但是过多也会影响性能，适可而止
create index book_ind on books(bookname,price); //如果在创建表的时候没有创建索引，则需要使用此方法创建
fulltext //全文索引；只用在myisam类型的表中，并且只能给char,varchar,text类型的字段创建
select match(info) against('hello') from books; //在具有全文索引的info中搜索hello字符串
`date` //``这个符号是对数据库名、表明、字段的特殊处理。防止用户自定义的名称和mysql保留字冲突；如：字段名 date ，mysql同样有内建行数date，`date`就能区分开这是自定义字段

//alter table更新表：
alter table 表名 add 字段名 类型;  //使用add给表添加字段
alter table products add color varchar(20);
alter table `tp_article` add column `aaa` varchar(20) NOT NULL AFTER `Dec`; //使用AFTER指定添加到哪个字段后；column不是必须的
alter table 表名 drop column 字段名;  //使用drop column删除字段
alter table products drop column color;

//drop删除表：
drop table 表名;

//rename重命名表：
rename table 表名 to 新表名,表名 to 新表名;  //重命名多个表之间用,隔开



//视图：将一段sql语句封装为一个视图，便于用这条语句进行别的操作
//创建视图：
create view productcustomers as select prod_id,cust_name,cust_content from customers,orders,orderitems where customers.cust_id = orders.cust_id and orderitems.order_num = orders.order_num;  //这里将这条select语句封装为名为productcustomers的视图(167p)
select cust_name,cust_content from productcustomers where pro_id='TNT2';  //这条语句从上面创建的视图中进行查询



//事务处理：可以保证一组操作要么成功执行，要么一个都不执行，不会出现部分执行的情况
//下面是一组sql语句来举例事务处理
-----------
select * from user;
start transaction;  //标识事务处理的开始
delete from user;
select * from user;
rollback;  //回滚事物处理；则上面两条语句执行无效，user表的内容并没有被删除；回滚只能作用于insert,update和delete语句，create,drop无效，select无意义
select * from user;
-----------
start transaction;
delete from user where id>100;
delete from products where id>1000;
commit;  //使用commit来确认执行；如果上面两条中有一条出错则不会执行commit，所以即使有一条没出错也不会执行那条没出错的语句；只有全部成功才会执行commit并确认执行



//安全管理：对用户的权限进行控制
use mysql;
select user from user;  //mysql库默认有个user表，保存所有用户帐号，user字段为用户名
creat user tirion identified by 'password';  //使用creat user创建一个新用户tirion，密码为password
rename user tirion to soul;  //使用rename user将tirion重命名为soul
drop user soul;  //使用drop user删除用户
show grants for tirion;  //使用show grants for来查看用户权限，新创建的用户没有任何权限
grant select,update on mobile.* to tirion;  //使用grant授予select和update权限给tirion在mobile库中的所有表
revoke select on mobile.* to tirion;  //使用revoke撤销select权限；被撤销的权限必须存在，否则会报错
具体权限列表见212p
set password for tirion = password('tirion');  //修改用户密码，必须使用password()函数
set password = password('tirion');  //修改当前登录用户的密码



//数据库维护：
analyze table user;  //使用analyze table来检查一个表的表键是否正确
check table user,products;  //check table用来针对许多问题对表进行检查


//数据类型：
mysql处理定长字段比变长字段速度快很多，而且变长字段不支持索引
字符串数据需要使用引号，最好使用单引号
电话号码等数据别使用数值类型，因为010这样的数据会自动删除开头的0变为10，所以应当使用字符串类型


//其它：
timestamp CURRENT_TIMESTAMP //如果要保存日期字段可以用timestamp类型，将默认值设为CURRENT_TIMESTAMP，这样在插入数据的时候这个字段的值就会默认为插入时的时间2013-09-14 17:35:00
ALTER TABLE `tp_article` AUTO_INCREMENT=1; //自增长重置语句
`符号的作用是标识自定义的表名或字段等，比如某个字段名为like，为了防止与mysql关键字like混淆，就应该使用`like`

select * from table where id in (5,3,6,1) order by field(id,5,3,6,1)  //记录按照5,3,6,1的顺序返回

//SQL注入：
//登录攻击：万能密码和万能用户名
select * from user where username='aaa' password='bb' or 1='1';
$sql="select * from user where username='$username' password='$password'"; //PHP中的代码，用于判断用户登录是否正确
bb' or 1='1 //万能密码：在密码框中输入这个字符串，即使用户名随便输入也能查询出所有的用户信息
select * from user where username='aaa' union select * from users;/* password='bb';     使用union联合查询，使用/*让后面的语句不执行    */*/
aaa' union select * from users/*    '//万能用户名：需要知道表名，而且不能加上面语句中的那个分号；这样也能查出指定表中的所有数据
//防范：
1、在php.ini中，将magic_quotes_gpc=off改为on；服务器就会对表单提交的所有的单引号加上\转义符
2、获取用户名，连接数据库取得密码，再用输入的密码和数据库中的密码比对
3、用PDO连接；$pdo->prepare("insert into shops(name,price,num) values(:name,:price,:num)");使用PDO预处理方法

//查询攻击：
select * from user where username='aaa'; //当用户在搜索框输入%时，则aaa会变成%，就会查询出所有数据；另外还有__等
$keyWord=addslashes($keyWord);  //使用addslashes进行过滤；则当用户输入'"\等字符时，会自动在前面加\转意
$keyWord=str_replace('%','\%',$keyWord);  //使用str_replace进行替换过滤
$keyWord=str_replace('_','\_',$keyWord);  //使用str_replace进行替换过滤