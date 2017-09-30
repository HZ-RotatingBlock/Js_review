<template>
    <section class="warp">
      <div class="searchIpt clearFix">
        <select-input :title="title" :is-show.sync="listShow"></select-input>
        <list v-show="listShow" :data="listData" @changeTitle="titleHandle"></list>
      </div>
    </section>
</template>

<script>

import selectInput from '@/components/selectInput'
import list from '@/components/list'

let listData = [
  {
    title: 'javascript'
  },
  {
    title: 'html+css'
  },
  {
    title: 'Vue'
  },
  {
    title: 'NodeJS'
  },
  {
    title: 'React'
  },
  {
    title: 'Angular'
  }
]

export default {
  data () {
    return {
      listShow: false,
      listData: listData,
      title: ''
    }
  },
  components: {
    selectInput,
    list
  },
  methods: {
    titleHandle (title) {
      this.title = title
    }
  }
}
</script>
