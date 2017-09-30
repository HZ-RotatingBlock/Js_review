<template>
    <div class="clearFix">
      <input
        readonly='readonly'
        class="keyWord"
        @click="showListHandle"
        :value="title"
      />
      <input type="button" value="GO">
      <span></span>
    </div>
</template>

<script>

export default {
  props: ['isShow',"title"],
  computed: {
    initShow () {
      return this.isShow
    }
  },
  methods: {
    showListHandle () {
      // 触发update更新事件更新isShow(双向数据绑定特性)
      this.$emit('update:isShow', !this.initShow)
    }
  }

}
</script>
