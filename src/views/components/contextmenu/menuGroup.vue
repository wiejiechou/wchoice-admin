<template>
  <div>
    <div class="mb-2">按鈕組</div>
    <div v-contextmenu:contextmenu class="wrapper">
      <code>右鍵點選此區域</code>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>選單</v-contextmenu-item>

      <v-contextmenu-group>
        <v-contextmenu-item>Github</v-contextmenu-item>
        <v-contextmenu-item>Codepen</v-contextmenu-item>
        <v-contextmenu-item disabled>Alipay</v-contextmenu-item>
        <v-contextmenu-item>Wechat</v-contextmenu-item>
      </v-contextmenu-group>

      <v-contextmenu-divider />

      <v-contextmenu-group title="按鈕組">
        <v-contextmenu-item>選單1</v-contextmenu-item>
        <v-contextmenu-item>選單2</v-contextmenu-item>
        <v-contextmenu-item disabled>選單3</v-contextmenu-item>
      </v-contextmenu-group>
    </v-contextmenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup
} from "v-contextmenu";

const ExampleSFC = defineComponent({
  name: "ExampleSFC",

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup
  },

  directives: {
    contextmenu: directive
  }
});

export default ExampleSFC;
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: rgb(90 167 164 / 20%);
  border: 3px dashed rgb(90 167 164 / 90%);
  border-radius: 8px;
}
</style>
