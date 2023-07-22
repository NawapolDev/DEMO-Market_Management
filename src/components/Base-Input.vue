<template>
    <div class="relative flex flex-col mt-6">
      <label class="absolute -top-6 left-0 text-sm md:text-base">{{ title }}</label>
      <div class="flex flex-row">
        <input
          v-bind="$attrs"
          class="input"
          :placeholder="label"
          :value="modelValue"
          :maxlength="max"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <span v-show="showMax" class="justify-center items-center px-1 py-3 md:px-3 border bg-gray-100 text-sm text-gray-500" v-text="max-modelValue.length"></span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: String,
    title: String,
    showMax: {
      type: Boolean,
      require: true
    },
    modelValue:{
      type: [Number,String],
      default: ''
    },
    max:Number,
  }
}
</script>


