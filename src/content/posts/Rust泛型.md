---
title: 探索 Rust：泛型
pubDate: 2024-05-01 24:30:00
categories: 
  - rust
description: '在Rust编程语言中，泛型（Generic）是一个非常强大的特性，它允许我们编写可重用的代码，同时保持类型安全。'
---

在Rust编程语言中，泛型（Generic）是一个非常强大的特性，它允许我们编写可重用的代码，同时保持类型安全。

你可以编写一个功能强大的函数或数据结构，它可以用于不同的类型，而无需为每种类型重写代码。

## 1. 泛型详解
使用泛型参数，有一个先决条件，必须在使用前对其进行声明：

```rust
struct Point<T> {
    x: T,
    y: T,
}
```
上面代码的 T 就是泛型类型参数，实际上在 Rust 中，泛型参数的名称你可以任意起，但是出于惯例，我们都用 T ( T 是 type 的首字母)来作为首选。

当我们调用泛型函数时，Rust 会根据我们传入的参数类型来推断泛型参数的具体类型

``` rust
let integer_point = Point { x: 5, y: 10 };
let float_point = Point { x: 1.5, y: 2.7 };
```
在上面的例子中，`integer_point` 的类型是 `Point<i32>`，而 `float_point` 的类型是 `Point<f64>`。


### 1.1 泛型函数

在函数中使用泛型,可以让函数更加灵活和可重用。通过在函数签名中声明泛型类型参数,我们可以编写适用于多种类型的函数。

#### 示例代码：

```rust
fn swap<T>(x: &mut T, y: &mut T) {
    let temp = *x;
    *x = *y;
    *y = temp;
}
```

这个 `swap` 函数可以交换两个可变引用所指向的值，而且它适用于任何类型 `T`。

在调用 `swap` 函数时，编译器会根据传入的参数类型自动推断出 `T` 的具体类型。

### 1.2 泛型结构体

在结构体中使用泛型,可以让结构体更加灵活和可重用。通过在结构体定义中声明泛型类型参数,我们可以创建适用于多种类型的结构体。

#### 示例代码：

```rust
struct Point<T> {
    x: T,
    y: T,
}
```

这里的 `Point<T>` 表示一个包含两个字段 `x` 和 `y` 的结构体,它们的类型都是 `T`。

`T` 是一个泛型类型参数,可以在使用 `Point` 结构体时指定具体的类型。

```rust
let integer_point = Point { x: 5, y: 10 };
let float_point = Point { x: 1.5, y: 2.7 };
```

在上面的例子中,`integer_point` 的类型是 `Point<i32>`,而 `float_point` 的类型是 `Point<f64>`。

#### 泛型结构体实现方法

```rust
impl<T> Point<T> {
    fn new(x: T, y: T) -> Point<T> {
        Point { x, y }
    }

    fn x(&self) -> &T {
        &self.x
    }

    fn y(&self) -> &T {
        &self.y
    }
}
```

在这个例子中,我们为 `Point<T>` 实现了三个方法:
- `new`: 一个关联函数,用于创建新的 `Point<T>` 实例。
- `x`: 返回字段 `x` 的引用。
- `y`: 返回字段 `y` 的引用。

### 1.3 泛型枚举

在枚举中使用泛型,可以让枚举更加灵活和可扩展。通过在枚举定义中声明泛型类型参数,我们可以创建适用于多种类型的枚举。

#### 示例代码：

```rust
enum Option<T> {
    Some(T),
    None,
}
```

`Option` 枚举表示一个可能包含值的类型,它有两个变体:`Some(T)` 表示存在一个类型为 `T`的值,`None` 表示没有值。

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

这里的 `Result<T, E>` 表示一个包含两个变体的枚举:
- `Ok(T)`: 表示成功的结果,关联一个类型为 `T` 的值。
- `Err(E)`: 表示错误的结果,关联一个类型为 `E` 的值。

`T` 和 `E` 是泛型类型参数,可以在使用 `Result` 枚举时指定具体的类型。

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}
```

在这个例子中,`divide` 函数接受两个 `i32` 类型的参数,返回一个 `Result<i32, String>` 类型的结果。如果除数 `b` 为零,函数返回一个 `Err(String)`; 否则,返回一个 `Ok(i32)`,其中 `i32` 是除法的结果。

### 1.4 泛型实现

在 Rust 中,我们可以为泛型类型实现方法。通过在 `impl` 块中声明泛型类型参数,我们可以为泛型结构体、枚举或者特征实现方法。

例如,我们可以为之前定义的 `Point<T>` 结构体实现一些方法:

```rust
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }

    fn y(&self) -> &T {
        &self.y
    }

    fn swap(&mut self) {
        std::mem::swap(&mut self.x, &mut self.y);
    }
}
```

在这个例子中,我们为 `Point<T>` 实现了三个方法:
- `x`: 返回字段 `x` 的引用。
- `y`: 返回字段 `y` 的引用。
- `swap`: 交换 `x` 和 `y` 的值。

注意,在 `impl` 块中,我们使用了 `<T>` 来声明泛型类型参数。这表示我们为所有可能的 `T` 类型实现了这些方法。

我们还可以在方法中使用泛型参数,例如:

```rust
impl<T> Point<T> {
    fn mixup<U>(self, other: Point<U>) -> Point<(T, U)> {
        Point {
            x: (self.x, other.y),
            y: (self.y, other.x),
        }
    }
}
```

在这个例子中,`mixup` 方法接受另一个 `Point<U>` 类型的参数,并返回一个新的 `Point<(T, U)>`。这个方法将当前的 `Point<T>` 实例的 `x` 值与 `other` 的 `y` 值组合成一个元组,将当前实例的 `y` 值与 `other` 的 `x` 值组合成另一个元组,然后用这两个元组创建一个新的 `Point<(T, U)>` 实例。

## 2. `const` 泛型：编译时的类型安全

从 Rust 1.51 版本开始，Rust 引入了 const 泛型（const generics）的特性。

`const` 泛型允许你将常量直接用作类型参数，这对于创建需要在编译时知道大小的数据结构非常有用。

#### 示例代码：

```rust
fn array_init<T, const N: usize>(value: T) -> [T; N] {
    [value; N]
}
```
在这个例子中，`array_init` 结构体使用了两个泛型参数：`T` 和 `N`。`T` 是元素的类型，而 `N` 是数组的长度，它是一个常量泛型参数，类型是 `usize`。我们可以使用 `N` 来指定数组的长度。

```rust
let array1 = array_init::<i32, 5>(0);
let array2 = array_init::<f64, 10>(1.0);
```

## 3. `const fn`：编译时函数计算

`const fn` 是 Rust 中的一个关键字，用于声明一个编译时常量函数。
`const fn` 可以在编译时求值，并且可以用于常量表达式的上下文中，例如数组长度、const 泛型参数等。

### 示例代码：

```rust
const fn square(num: i32) -> i32 {
    num * num
}

const RESULT: usize = square(5) as usize;
```
在这个例子中，`square` 是一个 `const fn`，它在编译时就可以求值。我们可以将 `square(5)` 的结果作为常量表达式赋值给`RESULT`。

## 4. 泛型的约束

有时候，我们可能需要对泛型类型参数进行一些约束，以满足某些条件。这时候可以使用泛型约束（又称为 trait bounds）。例如：

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

在这个例子中，`largest` 函数有一个泛型类型参数 `T`，并且要求 `T` 必须实现了 `PartialOrd` 和 `Copy` 这两个特征。这样，我们就可以在函数内部使用大于号比较 `T` 类型的值，并且可以直接返回 `T`类型的值（因为它是可复制的）。

## 结论与注意事项

通过引入泛型和 `const fn`，Rust 在提供强类型安全的同时，也让我们能写出更灵活和高效的代码。然而，使用这些特性时也要注意，例如 `const fn` 不能执行任何 I/O 操作，不能访问或修改可变静态变量。泛型虽然提高了代码的复用性，但如果不当使用，也可能导致代码的复杂度增加。

希望本文帮助你更好地理解并应用 Rust 中的这些高级特性，为你的编程旅程增添一抹亮色。