<template>
  <div class="my-tag">
    <input v-if="isEdit" ref="inp" @blur="isEdit = false" :value="value" class="input" v-focus type="text"
      placeholder="输入标签" @keyup.enter="handleEnter" />
    <div v-else @dblclick="handleClick" class="text">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false
    }
  },
  props: {
    value: String
  },
  methods: {
    handleClick() {
      this.isEdit = true
      // this.$nextTick(()=>{
      //   this.$refs.inp.focus()
      // })
    },
    handleEnter(e){
      if(e.target.value.trim()===''){
        alert('输入值不能为空')
        return
      }
      this.$emit('input',e.target.value)
      this.isEdit=false
    }
  },
}
</script>

<style lang="less" scoped>
.my-tag {
  cursor: pointer;

  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;

    &::placeholder {
      color: #666;
    }
  }
}
</style>
