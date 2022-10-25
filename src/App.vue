<template>
    <div class="app">6666</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "App",
    data() {
        return {
            message: "221",
        };
    },
    mounted() {
        console.log(process.env.VUE_APP_ENV);
    },
});
</script>
<style lang="sass" scoped>
$color: red
.app
  background: $color
</style>
