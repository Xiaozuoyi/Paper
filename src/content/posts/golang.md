---
title: Go语言 基础语法
pubDate: 2024-04-03 14:34:42
categories: ["技术"]
description: ' golang 的基础语法介绍'
---
## 1.变量
使用`var`关键字来声明一个变量
```go
  var message string = "Hello, World!"
```
## 2.常量
使用`const`关键字来定义常量，一旦赋值后不可更改。
```go
  const Pi float64 = 3.14159
```
## 3.运算符
## 4.条件语句
在Go中，可以使用`if-else`语句来进行条件判断。
```go
  func checkNum(num int) {
    if num%2 == 0 {
        fmt.Println(num, "is even")
    } else {
        fmt.Println(num, "is odd")
    }
}
```
## 5.循环语句
```go
  func countToTen() {
    for i := 1; i <= 10; i++ {
        fmt.Println(i)
    }
}
```
## 6.函数
函数通过`func`关键字来定义，可以有输入参数和返回值。
```go
  func add(x int, y int) int {
      return x + y
  }
```
## 7.指针
指针保存了值的内存地址。与其他语言不同，Go没有指针运算。
```go
  func main() {
      i := 42

      // &i 取得i的内存地址，即指针
      p := &i         

      // *p 读取指针p指向的内存地址的值
      fmt.Println(*p) 

      // 通过指针p来设置i的值
      *p = 21         
      fmt.Println(i)  
  }
```
## 8.结构体
结构体是一种聚合数据类型，它由一系列具有不同类型的字段构成。
```go
  type Person struct {
      Name string
      Age  int
  }
```
## 9.接口
接口类型是一组方法的集合，它规定了对象的行为。
```go
  type Geometry interface {
    Area() float64
    Perim() float64
}
```
## 10.数组
数组是具有相同类型元素的固定长度序列。
```go
  var a [5]int
```
## 11.切片
切片是对数组的抽象，Go语言中的切片更加强大且是高性能的工作方式。
```go
  s := []int{1, 2, 3}
```
## 12.映射
映射是一种存储键值对的集合，键是唯一的。
```go
  m := make(map[string]int)
  m["key"] = 42
```
## 13.通道
Channels 是一种数据结构，可以让goroutines之间安全地通信。
```go
  ch := make(chan int)

  // 发送数据到channel
  go func() {
      ch <- 123
  }()

  // 从channel接收数据
  val := <-ch
  fmt.Println(val)
```
## 14.协程
Goroutines 是Go并发编程的核心，是一种比线程更轻量级的并发执行单元。
```go
    func f(from string) {
        for i := 0; i < 3; i++ {
            fmt.Println(from, ":", i)
        }
    }

    func main() {
        // 使用go关键字来开启一个新的Goroutine
        go f("goroutine")

        // 你也可以开启一个匿名函数的Goroutine
        go func(msg string) {
            fmt.Println(msg)
        }("going")

        // 我们也可以直接调用函数
        f("direct")

        // 等待Goroutines结束
        time.Sleep(time.Second)
        fmt.Println("done")
    }
```
## 15.反射
反射可以在运行时检查类型和变量，例如，你可以使用反射来迭代结构体的字段。
```go
    type MyStruct struct {
      Field1 int
      Field2 string
  }

  var x MyStruct = MyStruct{1, "hello"}
  val := reflect.ValueOf(x)

  for i := 0; i < val.NumField(); i++ {
      field := val.Field(i)
      fmt.Println(field.Type(), field.Interface())
  }
```
## 16.并发
在Go语言中，goroutine 是执行在同一个地址空间的轻量级线程，它们由Go运行时环境管理。
```go
  func say(s string) {
      for i := 0; i < 3; i++ {
          fmt.Println(s)
          // 让出CPU时间片，再次放入队列
          runtime.Gosched()
      }
  }

  // 使用goroutine
  go say("world")
  say("hello")
```
## 17.选择语句
Select 语句可以等待多个通道操作。
```go
  select {
  case c <- x:
      fmt.Println("sent", x)
  case y := <-c:
      fmt.Println("received", y)
  }
```
## 18.错误处理
在Go中，错误被看作是一种可以预料的结果，而不是异常。
```go
  func canFail() (int, error) {
      // 一个可能失败的操作
      return 0, errors.New("something went wrong")
  }

  value, err := canFail()
  if err != nil {
      log.Fatal(err)
  }
```
## 19.延迟语句
Defer 语句会将函数推迟到外层函数返回之后执行。
```go
  func readFile(filename string) {
      f, _ := os.Open(filename)
      defer f.Close()
      // 处理文件
  }
```
## 20.类型断言
类型断言提供了访问接口值底层具体值的方式。
```go
  var i interface{} = "hello"

  s := i.(string)
  fmt.Println(s)

  s, ok := i.(string)
  if ok {
      fmt.Println(s)
  }
```
类型转换用于将一个变量转换为另一个类型。

```go
  var x, y int = 3, 4
  f := float64(x)
  z := float64(y)
  fmt.Println(f, z)
```
## 21.包（Packages）
Go语言的代码通过包（packages）组织，包实际上是多个.go源文件的集合。
```go
  package main

  import (
      "fmt"
      "math"
  )

  func main() {
      fmt.Println("Now you have %g problems.", math.Sqrt(7))
  }
```
## 22.Go Modules
Go Modules 是Go语言的依赖管理系统，它使得版本控制、包的下载和安装变得非常简单。
```go
  go mod init mymodule
  go get github.com/my/repo
```

｜提示词：担任一个golang讲师。给零基础的初学者，讲解golang的基础语法。每个知识点都会提供一个简单的代码示例。将讲解的内容以Markdown文档格式输出


