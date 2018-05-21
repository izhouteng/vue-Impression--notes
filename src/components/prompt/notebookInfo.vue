<template>
    <div class="noteNames" v-if="$store.state.joinNoteBookObj.title" ref="noteInfoNamesScroll">
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
