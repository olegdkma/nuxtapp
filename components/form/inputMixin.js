export default {
  props:{
    input:{
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: [Number, String, Object, Array]
    },
    values: {
      type: [Number, String, Object, Array]
    }

  },
  computed: {
    propModel: {
      get () { return this.value },
      set (value) {

        this.$emit('change', value)
        this.$emit('update:value', value)

      },

    },
  },
}
