<template>
  <el-time-select
    v-model="propModel"
    :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime:minTime
              }"

    placeholder="Select time">
  </el-time-select>
</template>

<script>
    import inputMixin from "@/components/form/inputMixin";
    export default {
        name: "InputTimePicker",
        mixins:[inputMixin],

        data() {
            return {


            }
        },

        computed: {
            minTime() {
                return this.values[this.input.minTime]
            }
        },
    }
</script>

<style lang="scss">

</style>
