# Api

目前 `@quasi-dev/autoform` 中只有 `AutoForm` 这一个对象

## 构造函数

创建 `AutoForm` 对象时需要一个 `json` 格式的模板，用于指定表单的内容及组成。

示例代码：

```ts
const af = AutoForm({
    type: 'input',
    hint: 'Input a string.'
})
```

完整的模板格式参阅[JSON模板格式](./doc/template.md)

## 显示

`AutoForm` 对象创建后，可以通过 `.init(el)` 方法绑定到页面中的一个元素上，要求 `el` 必须是 `HTMLDivElement`。

示例代码：

```ts
af.init(document.getElementById('form'))
```

## 获取表单数据

通过调用 `.value()` 方法可以获取表单数据，返回值是 `json` 格式的数据。

返回值类型可由下表确定：

| 表单结构 | 返回值类型 | 备注 |
|:---:|:---:|:---:|
| 单行输入框 | `string` | 用户输入的内容 |
| 下拉选择框 | `string` | 选项的文本 |
| 复选框 | `boolean` | 是否选中 |
| 表单 | `json` | 子表单数据 |

例如，当 `template` 为如下内容时：

```ts
{
    type: 'form',
    child: {
        input1: {
            type: 'input',
        },
        input2: {
            type: 'input'
        },
        checkbox: {
            type: 'checkbox',
            label: 'click me'
        },
        subform: {
            type: 'form',
            child: {
                input3: {
                    type: 'input'
                }
            sel1: {
                type: 'select',
                option: ['option1', 'option2', 'option3']
            }
        }
    }
}
```

一个可能的返回值为：

```ts
{
    input1: 'input1 value',
    input2: 'input2 value',
    checkbox: true,
    subform: {
        input3: 'input3 value',
        sel1: 'option2'
    }
}
```

暂时还不支持设置表单数据的功能
