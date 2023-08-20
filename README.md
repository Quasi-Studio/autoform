# Quasi-dev/autoform

A package that automatically generates forms from a schema.

## 快速开始

```bash
npm i @quasi-dev/autoform
```

## Demo

```typescript
import { AutoForm } from '@quasi-dev/autoform'
const af = AutoForm({
    type: 'input',
    hint: 'Input a string.'
})
af.init(document.getElementById('root'))
```

## 文档

[Api](./doc/api.md)

[JSON模板格式](./doc/template.md)
