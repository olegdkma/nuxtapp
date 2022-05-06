<template>
  <div class="event-wrp">

    <div class="date-input" style="position: relative;">
      <div class="d-flex flex-wrap date-input__fake">
        <div style="margin-right: 5px;" v-for="date in dates" :key="date.id">
          {{ date.date }}
        </div>
        <i style="position: absolute;right: 10px;z-index: 99; top: 50%;transform: translateY(-50%)"
           class="el-icon-date"></i>
      </div>

      <el-date-picker
        style="position: absolute; top: 0; bottom: 0;"
        v-model="date"
        type="date"
        @input="addNewEvent"

      >
      </el-date-picker>
    </div>


    <div style="margin: 10px 0;" v-for="(event,i) in propModel" :key="event.id">
      <div class="d-flex justify-content-between">
        <span>{{ dayjs(event.date).format('DD-MM-YYYY') }}</span>
        <span @click="removeEvent(event)"> <i class="el-icon-close"></i></span>
      </div>
      <div class="d-flex align-items-center flex-wrap event-group">
        <el-form-item :class="'col-md-' + (value.col || 12)" v-for="(value, name) in schema" :key="name"
                      :label="value.label" :prop="name">

          <component :is="'input-' + value.type" :value.sync="event[name]" :values="event"
                     :input="value"></component>


        </el-form-item>
      </div>

    </div>

  </div>
</template>

<script>
    import inputMixin from "@/components/form/inputMixin";
    import dayjs from 'dayjs'

    export default {
        name: "InputEvents",
        mixins: [inputMixin],
        components: {
            InputText: () => import('@/components/form/inputs/InputText'),
            InputTimePicker: () => import('@/components/form/inputs/InputTimePicker'),
            InputTextarea: () => import('@/components/form/inputs/InputTextarea'),
            InputSelect: () => import('@/components/form/inputs/InputSelect'),

        },
        data() {
            return {
                date: '',
                dayjs,
                schema: {
                    start: {
                        label: 'Starttime',
                        type: 'time-picker',
                        col: '4',
                    },
                    end: {
                        label: 'Endtime',
                        type: 'time-picker',
                        col: '4',
                        minTime: 'start',
                    },
                    price: {
                        label: 'Price',
                        type: 'text',
                        col: '4',
                        placeholder: '75',

                    },
                    options: {
                        label: 'Type',
                        type: 'select',
                        placeholder: 'Select option',
                        options: ['Consultation', 'Ambulance', 'Telephone'],
                    }
                }
            }
        },
        computed: {
            dates() {
                return this.propModel.map(el =>({date: dayjs(el.date).format('DD-MM-YYYY'), id: el.id}))
            }
        },

        methods: {
            addNewEvent(val) {
                this.propModel = this.propModel.concat([{
                    id: this.propModel.length + 1,
                    date: val,
                    start: null,
                    end: null,
                    price: null,
                    options: null
                }])
            },
            removeEvent(event) {
                this.propModel = this.propModel.filter(el => el != event)
            },

        }
    }
</script>

<style lang="scss">
  .el-form-item__label {
    line-height: 1;
    padding: 0;
    margin: 0;
    // color: #fff;
  }

  .is-error {
    .event-wrp {
      border: 1px solid var(--error);
      .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{
        border-color: unset;
      }
    }
  }

  .event-group {
    //margin: 0 -15px;
    background: var(--primary-bckg);
    padding-bottom: 20px;
    // margin: 10px 0;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;

    .el-form-item__label {
      color: #fff;
    }
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100% !important;
  }

  .el-select {
    width: 100%;
  }

  .date-input {
    .el-input__icon {
      display: none;
    }

    &__fake {
      min-height: 30px;
      position: relative;
      -webkit-appearance: none;
      background-color: #FFF;
      border-radius: 4px;
      border: 1px solid #000;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      line-height: 2;
      outline: 0;
      padding: 0 15px;
      //padding-left: 32px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: 100%;

    }

    .el-input__inner {

      opacity: 0;
      z-index: 999;
      -webkit-appearance: none;
      background-color: #FFF;
      border-radius: 4px;
      border: 0px solid #DCDFE6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 100%;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: 100%;
    }
  }
</style>
