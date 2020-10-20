<template>
    <div class="container-wrap">
        <ul class="container-list">
            <li class="container-list__item"  :class="{ 'active': isActive }" @click="isActive=!isActive">Контейнер</li>
            <li class="container-list__item">Контейнер</li>
            <li class="container-list__item">Контейнер</li>
            <li class="container-list__item">Контейнер</li>
            <li class="container-list__item">Контейнер</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "ContainerList",
        data:() => ({
            isActive: false
        })
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
</style>
