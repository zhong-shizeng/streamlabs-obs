<template>
<div class="google-font-selector">
  <div>
    <div class="input-container">
      <div class="input-label">
        <label>
          Font Family
          <i v-if="loading" class="fa fa-spinner fa-pulse google-font-loading" />
        </label>
      </div>
      <div class="input-wrapper">
        <multiselect
          :value="selectedFamily"
          :options="fontFamilies"
          :disabled="loading"
          @input="setFamily">
        </multiselect>
      </div>
    </div>
    <div class="input-container">
      <div class="input-label">
        <label>
          Font Style
          <i v-if="loading" class="fa fa-spinner fa-pulse google-font-loading" />
        </label>
      </div>
      <div class="input-wrapper">
        <multiselect
          :value="selectedStyle"
          :options="fontStyles"
          :allow-empty="false"
          :disabled="loading"
          @input="setStyle">
        </multiselect>
      </div>
    </div>
    <font-size-selector :value="value.size" @input="setSize" />
  </div>
</div>
</template>

<script lang="ts" src="./GoogleFontSelector.vue.ts"></script>

<style lang="less" scoped>
.google-font-loading {
  margin-left: 5px;
}
</style>
