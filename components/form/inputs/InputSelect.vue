<template>
      <el-select v-model="propModel" placeholder="Select" >
        <el-option
          v-for="item in input.options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
</template>

<script>
    import inputMixin from "@/components/form/inputMixin";
    export default {
        name: "FormInput",
        mixins:[inputMixin],


    }
</script>

<style scoped>

</style>
