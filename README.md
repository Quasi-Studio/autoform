# Quasi-dev/autoform

A package that automatically generates forms from a schema.

## 快速开始

```bash
npm i @quasi-dev/autoform
```

## Demo

```typescript
import { AButton, AButtonModel } from '@quasi-dev/autoform'

let el = document.getElementById('root') as HTMLDivElement

let btn = new AButton(new AButtonModel())
btn.mount(el)
btn.patch({
  caption: '123'
})
```

## 文档

暂缺
