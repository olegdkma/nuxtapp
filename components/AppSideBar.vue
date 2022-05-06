<template>
  <transition name="slide">

    <div class="left-sidebar" v-if="show">
      <slot name="header"></slot>
      <slot></slot>
    </div>
  </transition>

</template>

<script>
    export default {
        name: "AppSideBar",
        props: {
            show: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style lang="scss">
  .left-sidebar{
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 500px;
    padding: 20px;
    overflow-y: auto;
    background: white;
    z-index: 200;
    max-height: 100vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .slide-enter-active {
    transition: all .8s ease;
  }
  .slide-leave-active {
    transition: all .8s ease-in-out;
  }
  .slide-enter, .slide-leave-to
  {
    transform: translateX(500px);
  }
</style>
