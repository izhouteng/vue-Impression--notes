<template>
    <div class="noteNames" v-show="$store.state.joinNoteBookObj.title">
      <img src="@/assets/images/dijijieduanbijibenxinxi.png" alt="" class="noteinfoPic">
      <div class="title">
        {{$store.state.joinNoteBookObj.title}}
      </div>
    </div>
</template>

<script>
    export default {
        name: "notebook-info"
    }
</script>

<style scoped>

</style>
