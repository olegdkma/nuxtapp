<template>
  <div>
    <el-form :hide-required-asterisk="true" :model="formValues" label-position="top" :rules="rules" ref="ruleForm" label-width="120px"
             class="demo-ruleForm">
      <el-form-item v-for="(value, name) in schema" :key="name" :label="value.label" :prop="name">
        <component :is="'input-' + value.type" :value.sync="formValues[name]" :input="value"></component>
      </el-form-item>
      <el-form-item>
        <div class="d-flex">
          <el-button class="primary-btn empty-btn flex-grow-1" size="medium" @click="deleteEvent">DELETE
          </el-button>
          <el-button class="primary-btn flex-grow-1" size="medium" @click="submitForm('ruleForm')">SAVE
          </el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        name: "TheForm",
        components: {
            InputText: () => import('@/components/form/inputs/InputText'),
            InputTextarea: () => import('@/components/form/inputs/InputTextarea'),
            InputSelect: () => import('@/components/form/inputs/InputSelect'),
            InputEvents: () => import('@/components/form/inputs/InputEvents'),


        },
        props: {
            data: {
                type: Object,
                default() {
                    return {
                        title: '',
                        description: '',
                        events: []
                    }
                }
            },
            id: {
                type: [Number, String]
            },

        },
        data() {
            return {
                dayjs,
                formValues: {},
                rules: {
                    description: [
                        {validator: this.maxChars, trigger: 'change', count: 500}
                    ],
                    title: [
                        {required: true, validator: this.maxChars, trigger: 'change', count: 100}
                    ],
                    events: [
                        {
                            required: true,
                            validator: this.maxChars,
                            trigger: 'change',
                            count: 10,
                            errMess: 'Max 10 events'
                        },
                        {validator: this.nestedValid, trigger: 'blur'},
                    ],

                },

                schema: {
                    title: {
                        label: 'Title',
                        type: 'text',
                        placeholder: 'Title',
                    },
                    description: {
                        label: 'Description',
                        type: 'textarea',
                        placeholder: 'Description up to 500 characters',

                    },
                    events: {
                        label: 'Dates',
                        type: 'events',

                    }
                },


            }


        },
        watch: {
            'data.id'(n){
                this.initForm()
            }
        },

        created() {
            this.initForm()

        },
        methods: {
            maxChars(rule, value, callback) {
                if ((!value || !value.length) && rule.required) callback(new Error('Provide value'));
                else if (value.length > rule.count) callback(new Error(`Max ${rule.count} chars`));
                else callback()

            },
            nestedValid(rule, value, callback) {

                const s = value.reduce((acc, cur) => {
                    const valid = Object.values(cur).filter(el => !Number(el) && !el).length
                    return acc.concat([!!valid])
                }, []).filter(el => el).length

                if (s) callback(new Error('Fill all events'));
                else callback()

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.formValues)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            initForm() {
                this.formValues = JSON.parse(JSON.stringify(this.data))
            },
            deleteEvent() {
                this.$emit('delete', this.formValues)
            }


        }
    }
</script>

<style lang="scss">
  .el-form-item{
    textarea{
      width: 100%;
      height: 100%;
      resize: none;
      padding: 3px 8px;
      border: 1px solid #000;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    input {
      border: 1px solid #000;
    }
  }
</style>
