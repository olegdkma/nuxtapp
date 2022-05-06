<template>
  <div id="app">

    <div class="custom-container">
      <div>

        <span class="headers">Filters</span>


        <div class="d-flex align-items-center " style="margin-top: 30px;">
          <span class="like_desc" style="margin-right: 20px;"> Filter on price</span>
          <div style="flex-shrink: 0;flex-grow: 1;flex-basis: 400px">
            <el-slider
              v-model="filterProps._value"
              range
              @input="setFilter"
              v-bind="filterProps"
            >
            </el-slider>
          </div>

        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center" style="margin-top: 50px;">
        <div class="headers">Shifts</div>
        <el-button @click="sidebarShift(null)" class="primary-btn" size="medium"> ADD SHIFT</el-button>

      </div>


      <div v-for="shift in shifts" :key="shift.id">

        <AppShiftCard @edit="sidebarShift" :shift="shift">

        </AppShiftCard>
      </div>
    </div>


    <AppSideBar :show="show">
      <template v-slot:header>
        <span  class="headers" style="margin: 20px 0;display: inline-block;">{{ formObject.id ? 'Edit' : 'Create' }}</span>
      </template>
      <AppForm
        :data="formObject"
        @delete="shiftEvent($event, 'delete')"
        @submit="shiftEvent"
      >

      </AppForm>

    </AppSideBar>


  </div>
</template>

<script>
    import AppForm from "@/components/form/AppForm"
    import AppSideBar from "@/components/AppSideBar"
    import AppShiftCard from "~/components/AppShiftCard"

    import {mapMutations, mapGetters, mapActions} from 'vuex'



export default {
  name: 'IndexPage',
    components: {
        AppForm,
        AppSideBar,
        AppShiftCard
    },
    data() {
        return {
            show: false,
            filterProps: {},
            formObject: {},
        };
    },
    computed: {
        ...mapGetters({
            shifts: 'getShifts',
            getFilter: 'getFilter'
        })
    },
    watch:{
        getFilter(n){
            this.setFilterProps()
        }
    },

    mounted() {
        this.setFilterProps()
    },
    methods: {
        ...mapMutations({
            setFilter: 'setFilter'
        }),
        ...mapActions({
            saveShift: 'saveShift',
        }),

        setFilterProps() {
            if( !this.getFilter) return
            const {min, max} = this.getFilter

            const middle = Math.ceil((max / 2))
            this.filterProps = {
                _value: [min, max],
                marks: {
                    [min]: String(min),
                    [middle]: String(middle),
                    [max]: String(max)
                },
                min,
                max

            }

        },
        clearForm() {
            this.formObject = {}
            this.show = false
        },
        sidebarShift(n) {
            this.show = true


            this.formObject = n ? n : {
                id: '',
                title: '',
                description: '',
                events: [],

            }

        },
        async shiftEvent(data, operation) {
            const result = {
                shift: data
            }

            result.operation = operation


            await this.saveShift(result)


            this.clearForm()
        },

    }
}
</script>

<style lang="scss">
  html, body {
    font-family: 'Roboto', sans-serif !important;
  }
  :root {
    --primary-color: #484848;
    --primary-bckg: #484848;
    --secondary-color: #F77F89;
    --error: #F56C6C;
  }


  .custom-container {
    width: 1005px;
    margin: auto;
  }
  .primary-btn {
    background: var(--primary-bckg) !important;
    color: #fff !important;

    &.empty-btn {
      background: transparent !important;
      color: var(--primary-bckg) !important;
      border: 2px solid var(--primary-bckg);
    }
  }



  .headers {
    font-size: 30px;
    font-weight: bold;
    color: var(--primary-color);
    position: relative;

  &:after, &span:after {
              content: '';
              position: absolute;
              bottom: -6px;
              left: 0;
              height: 4px;
              width: 50%;
              background: var(--secondary-color);
            }
  }
  .like_title{
    font-size: 36px;
    font-weight: 500;
    letter-spacing: 0.05em;
  }
  .like_desc {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.05em;
  }
  .el-slider{
    width: 400px;
  }
  .el-slider__bar {
    background-color: #C4C4C4 !important;
  }

  .el-slider__button {
    background-color: var(--secondary-color) !important;
    border: 2px solid var(--secondary-color) !important;


  }

</style>
