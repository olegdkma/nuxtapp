<template>
  <div class="shift">

    <slot name="header"></slot>


    <div class="d-flex justify-content-between align-items-center">
      <div class="like_title"> {{ shift.title }} </div>
      <el-button style="font-size: 20px;color: var(--primary-bckg)" type="text" icon="el-icon-edit" @click="$emit('edit', shift)"></el-button>
    </div>

    <div class="like_desc"> {{ shift.description }} </div>
    <div style="margin-top: 20px;">
      <div class="like_title">Dates</div>
      <div >
        <div class="event-wrap" style="margin-bottom: 20px;"  v-for="(sh,i) in events" :key="i">
          <div class="event" >
            <div class="col-md-3">
              {{ dayjs(sh.date).format('D MMM YYYY').toLowerCase() }}
            </div>
            <div class="col-md-1">
              {{ sh.start }}
            </div>
            <div  class="col-md-1">
              {{ sh.end }}
            </div>
            <div class="col-md-3" >
              {{ sh.options }}
            </div>
            <div  class="col-md-4" style="margin-left: auto;-ms-text-align-last: right;text-align: right;">
              {{ sh.price }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        name: "AppShiftCard",
        props: {
            shift: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                dayjs
            }
        },
        computed:{
            events() {
                return this.shift.events.map(el => {
                    const {id,...rest} = el
                    return rest
                })
            }
        }
    }
</script>

<style lang="scss">
  .shift{
    margin-top: 30px;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 15px 25px;
  }
  .event{

    display: flex;
    align-items: center;
    flex-grow: 1;
    // justify-content: space-between;
    div{
      font-size: 20px;
      font-weight: 400;
    }
    &-wrap{
      background: var( --primary-bckg);
      color: #fff;
      padding: 10px 15px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      //  justify-content: space-between;
    }
  }
</style>
