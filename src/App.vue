<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AutoForm } from './autoform/autoform'

export default defineComponent({
  name: 'App'
});

// let af = new AutoForm({
//   type: 'string',
//   hint: 'This is a hint'
// })

let af = new AutoForm({
  type: 'select',
  option: [
    '123', '234', '345'
  ]
})

af.inject(document.getElementById('apppppp') as HTMLDivElement)

</script>

<style scoped>


</style>