<template>
    <div ref="work" class="work-area">
        <Container :parentX = "parentX" :parentY = "parentY" :parentWidth = "parentWidth"  />
        {{parentX}}
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
            }
        },
        mounted() {
            const positions = this.$refs.work.getBoundingClientRect();
            this.parentX = Math.round(positions.x);
            this.parentY = Math.round(positions.y);
        }

    }
</script>

<style>
   .work-area{
       position: relative;
   }
</style>
