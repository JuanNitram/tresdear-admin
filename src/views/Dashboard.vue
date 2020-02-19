<template>
  <div :class="{ none : !isReady }">
    <h1 class="pb-4">Dashboard</h1>
  </div>
</template>

<script>
    import Analytics from '../components/Analytics'
    import eventBus from '../EventBus.js'

    export default{
      components: {
        Analytics
      },
      data(){
        return {
          isReady: false,
        }
      },
      created(){
        this.$store.commit('SET_LOADING', false);
      },
      computed: {
        loading(){
          return this.$store.getters.loading
        }
      }
    }
</script>

<style lang="css">
  .none{
    visibility: hidden;
  }
</style>
