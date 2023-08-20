# JSON模板格式

目前支持的控件有以下几个：

* [单行输入框](#单行输入框)
* [下拉选择框](#下拉选择框)
* [复选框](#复选框)
* [表单](#表单)

## 单行输入框

| 参数 | 类型 | 是否可选 | 说明 |
|:---:|:---:|:---:|:---:|
| caption | string | yes | [caption字段作用说明](#caption-字段作用说明) |
| type | 'input' | no | 标识字段 |
| default | string | yes | 默认值，尚未实现 |
| hint | string | yes | 提示文本 |
| validate | string => boolean | yes | 校验函数，尚未实现 |

## 下拉选择框

| 参数 | 类型 | 是否可选 | 说明 |
|:---:|:---:|:---:|:---:|
| caption | string | yes | [caption字段作用说明](#caption-字段作用说明) |
| type | 'select' | no | 标识字段 |
| option | string[] | no | 选项列表 |

## 复选框

| 参数 | 类型 | 是否可选 | 说明 |
|:---:|:---:|:---:|:---:|
| caption | string | yes | [caption字段作用说明](#caption-字段作用说明) |
| type | 'checkbox' | no | 标识字段 |
| label | string | yes | 选项文本 |

## 表单

| 参数 | 类型 | 是否可选 | 说明 |
|:---:|:---:|:---:|:---:|
| caption | string | yes | [caption字段作用说明](#caption-字段作用说明) |
| type | 'form' | no | 标识字段 |
| child | JSON[] | no | 子控件列表 |

## caption 字段作用说明

当一个控件单独出现时，设置它的 `caption` 没有意义。

当一个控件被包含在表单中时，`caption` 将作为这个控件的说明显示出来。
