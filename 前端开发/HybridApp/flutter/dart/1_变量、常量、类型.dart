// 程序入口 main 函数
void main() {
  variable();
  types();
}

// 变量常量的使用
void variable() {
  var name = '何鹏';
  const age = 33;  // Const 变量在编译时就已经固定 (Const 变量 是隐式 Final 的类型.)
  final sex = 'male';  // 最高级 final 变量或类变量在第一次使用时被初始化
  print('$name - $age - $sex');

  // const 和 final 的区别
  var n = 1;
//  const n1 = n;  // n 是变量，需要在运行时才能确定值，而将一个需要在运行时才能确定的值赋值给 const 声明的常量就会报错
  final n1 = n;  // final 则是运行时常量，可以将运行时计算的结果赋给它，只是运行赋值后不能再修改。比如网络请求返回的数据要设置为常量就只能使用 final
  print(n1);
  const a = 'a';
  const a1 = a;  // a 是一个 const 常量，在编译时就能确定值，所以可以把它赋值给另一个 const 常量
  print(a1);
  const b = 1;
  const c = 2;
  const d = b + c;  // 可以将两个 const 常量运算后赋值给一个 const 常量，因为在编译时能确定 b, c 两个 const 常量的值，所以 const 常量 d 也能在编译时确定
  print(d);
}

// 内建类型
void types() {
  numType();
  strType();
  boolType();
  listType();
  setType();
  mapType();
}

// number 类型
void numType() {
  num n1 = 123;
  num n2 = 123.456;  // num 包含 int 和 double
  int i = 111;
  double d1 = 222;  // double 赋值 int 时会自动转为 double。这里即 222.0
  double d2 = 333.33;
  print('$n1-$n2-$i-$d1-$d2');
  // 字符串转数字
  var one = int.parse('1');
  assert(one == 1);
  var onePointOne = double.parse('1.1');
  assert(onePointOne == 1.1);
  String oneStr = 1.toString();
  assert(oneStr == '1');
  String piStr = 3.1415926.toStringAsFixed(2);
  assert(piStr == '3.14');
  // int 类型特有的位运算
  assert((3 << 1 == 6));  // 0011 << 1 == 0110
  assert((3 >> 1 == 1));  // 0011 >> 1 == 0001
  assert((3 | 4 == 7));  // 0011 | 0100 == 0111
}

// 字符串类型
void strType() {
  var s1 = 'Single quotes string';
  var s2 = "Double quotes string";
  var s3 = 'It\'s easy to escape the string delimiter.';
  var s4 = "It's even easier to use the other delimiter.";
  // 字符串内嵌表达式使用 ${expression}，如果表达式是一个标识符，则 {} 可以省略。
  var s = 'string';
  print('this is $s');
  print('this is ${s.toUpperCase()}');
  // 多行字符串
  var multiS = '''
    line 1
    line 2
  ''';
  print(multiS);

  const num = 1;
  const str = 'abc';
  var ns = '$num,$str';
  print(ns);
}

// 布尔类型
void boolType() {
  var s = '';
  // dart 是类型安全的，所以使用 if, assert 等进行条件判断必须进行明确的判断，下面两种写法都不行。
//  assert(s);
//  if (s) {...}
  assert(s.isEmpty);  // 检查空字符串

  var n;
  assert(n == null);  // 检查 null 值

  var nan = 0 / 0;
  assert(nan.isNaN);  // 检查 NaN
}

// List 类型
void listType() {
  var list = [1, 2, 3];  // list 中所有元素都是 int 类型，所以会类型推断为 List<Int>
  assert(list.length == 3);
  assert(list[1] == 2);
  list[1] = 1;
  assert(list[1] == 1);
//  list[3] = '4';  // 向 list<int> 中添加字符串就会报错

  var list2 = [1, '2', 3];  // list 中有多种类型，则会推断为 List<Object>
  print(list2.runtimeType);
//  list2[3] = 4;  // 直接添加也不行
  list2.add(true);  // 但是可以使用 add 方法添加各种类型的值
  print(list2);

  var list3 = const [1, 2, 3];  // 创建常量 list
//  list3[1] = 1;  // 不能修改常量
//  list3[3] = 4;  // 添加也不行
}


// Set 类型：元素唯一且无序的集合
void setType() {
  var name = { '张三', '李四', '王五', '张三' };  // 类型推断为 Set<String>
  print(name);  // 输出的结果中只有一个 张三
  name.add('赵六');  // 使用 add 添加元素
  var name2 = <String>{};  // 声明一个 String 类型的 Set 集合
  name2.add('孙悟空');
  name2.addAll(name);  // 使用 addAll 添加另一个 Set 集合
  print(name2);
  final constantSet = const {  // 使用 const 创建编译时 Set 常量
    'fluorine',
    'chlorine',
    'bromine',
    'iodine',
    'astatine',
  };
}

// Map 类型
void mapType() {
  var gifts = {  // 类型推断为 Map<String, String>
    'first': 'partridge',
    'second': 'turtledoves',
    'third': 'golden rings',
//    fourth: 'money'  // key 必须加引号
  };
  var nobleGases = {  // 类型推断为 Map<int, String>
    2: 'helium',
    10: 'neon',
    18: 'argon',
  };

  var gifts2 = Map();  // 等同于 new Map()，dart2 中 new 关键字是可选的
  gifts['first'] = 'partridge';
  gifts['second'] = 'turtledoves';
  gifts['fifth'] = 'golden rings';

  final constantMap = const {  // 创建常量 Map
    2: 'helium',
    10: 'neon',
    18: 'argon',
  };
}
