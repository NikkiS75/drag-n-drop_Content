<template>
    <div class="container-wrap">
        <ul class="container-list">
            <li  class="container-list__item" ref="listItem" :class="{ 'active': getActiveContainer == index, 'dnone' : container.visible == false}"  @click="active(index)" v-for="(container, index) of getAllContainers" :key="index" :item="container">Контейнер {{index + 1}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "ContainerList",
        data:() => ({
            isActive: 0
        }),
        computed: {
            getAllContainers(){
                return this.$store.getters.getAllContainers
            },
            getActiveContainer(){
                return this.$store.getters.getActiveContainer
            }
        },
        methods: {
            active (idx){
                this.isActive = idx;
                this.$store.dispatch('activeContainer', this.isActive)
            }
        }
    }
</script>

<style scoped>
 .container-wrap {
     background-color:#fcfcfc;
 }
  .container-list{
      list-style: none;
  }
   .container-list__item{
    padding: 5px;
    cursor:pointer;
   }

 .active{
        background-color: #2c3e50;
        color: #fcfcfc;
    }
    .dnone{
        display: none;
    }
</style>
