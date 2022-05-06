<template>

  <textarea  type="text" :placeholder="input.placeholder" v-model="propModel" ></textarea>

</template>

<script>
    import inputMixin from "@/components/form/inputMixin";
    export default {
        name: "InputTextarea",
        mixins:[inputMixin],

    }
</script>

<style lang="scss">

  .is-error{
    textarea{
      border-color: #F56C6C;
    }
  }
</style>
