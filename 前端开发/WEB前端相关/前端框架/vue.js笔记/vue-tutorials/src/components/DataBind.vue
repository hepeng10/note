<template>
    <div>
        <!-- 使用 v-model 指令进行数据双向绑定 -->
        <input type="text" v-model="text">
        <p>{{ text }}</p>
        <!-- 单个复选框 -->
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
        <br>
        <br>
        <!-- 多个复选框 -->
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
        <br>
        <br>
        <!-- 单选按钮 -->
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
        <br>
        <br>
        <!-- 下拉框 -->
        <select v-model="selected">
            <option disabled value="">请选择</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <span>Selected: {{ selected }}</span>
        <br>
        <br>
        <select v-model="selectedMulti" multiple style="width: 50px;">
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <br>
        <span>Selected: {{ selectedMulti }}</span>
    </div>
</template>

<script>
export default {
  name: 'Bind',
  data () {
    return {
      text: '',
      checked: false,
      checkedNames: [],
      picked: 'One',
      selected: '',
      selectedMulti: []
    }
  }
}
</script>
