<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AutoForm } from './autoform/autoform'

export default defineComponent({
  name: 'App'
});

// let af = new AutoForm({
//   type: 'input',
//   hint: 'This is a hint'
// })

// let af = new AutoForm({
//   type: 'select',
//   option: [
//     '123', '234', '345'
//   ]
// })

// let af = new AutoForm({
//   type: 'checkbox',
//   label: 'Check up'
// })

let af = new AutoForm({
  type: 'form',
  child: {
    input1: {
      type: 'input'
    },
    checkbox1: {
      type: 'checkbox',
      label: '123'
    }
  }
})

af.init(document.getElementById('apppppp') as HTMLDivElement)

</script>

<style scoped>


</style>