<template>
    <div class="app">6666</div>
</template>
<script lang="ts">
export default {
    name: "App",
    data() {
        return {
            message: "221",
        };
    },
    mounted() {
        console.log("VITE_APP_ENV", process.env);
    },
};
</script>
<style lang="sass" scoped>
$color: red
.app
  background: $color
</style>
