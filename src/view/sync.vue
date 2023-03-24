<template>
  <div>
    <child :name.sync="name"></child>
    <button @click="al">点击</button>
    <button @click="change">改变</button>
  </div>
</template>
 
<script>
import child from "@/components/sync-components";
export default {
  name: "list",
  components: {
    child,
  },
  data() {
    return {
      listItems: ["buy food", "play games", "sleep"],
      name: "xiaoming",
    };
  },
  methods: {
    al() {
      alert(this.name);
    },
    change() {
      this.name = "123";
    },
  },
};
</script>