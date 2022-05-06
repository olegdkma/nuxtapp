<template>
  <el-input :class="input.class"  v-model="propModel"></el-input>

</template>

<script>
    import inputMixin from "@/components/form/inputMixin";
    export default {
        name: "InputText",
        mixins:[inputMixin],


    }
</script>

<style scoped>

</style>
