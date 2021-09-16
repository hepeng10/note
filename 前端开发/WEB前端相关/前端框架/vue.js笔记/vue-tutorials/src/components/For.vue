<template>
  <div>
    <ul>
      <li
        v-for="item in list"
        :key="item"
        v-if="item !== 2"
      >
        {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(value, key) in obj" :key="value">{{ key }}: {{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'If',
  data () {
    return {
      list: [1, 2, 3, 4, 5],
      obj: {
        a: 'aaa',
        b: 'bbb',
        c: 'ccc'
      }
    }
  }
}
</script>
