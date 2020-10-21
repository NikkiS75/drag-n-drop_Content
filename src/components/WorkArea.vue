<template>
    <div ref="work" class="work-area">
        <Container :container-i-d="index" :parentX = "parentX" :parentY = "parentY" :parentWidth = "parentWidth" v-for="(containers, index) of getAllContainers" :key="index" :item = "containers"/>
    </div>
</template>

<script>
    import Container from "./Container";

    export default {
        name: 'WorkArea',
        components: {
            Container
            },
        data: function () {
            return{
            parentX : 0,
            parentY: 0,
            parentWidth: 0
            }
        },
        mounted() {
            const positions = this.$refs.work.getBoundingClientRect();
            this.parentX = Math.round(positions.x);
            this.parentY = Math.round(positions.y);
            this.parentWidth = Math.round(positions.width);
        },
        computed: {
            getAllContainers(){
                return this.$store.getters.getAllContainers
            }
        }

    }
</script>

<style>
   .work-area{
       position: relative;
       height: 100%;
   }
</style>
