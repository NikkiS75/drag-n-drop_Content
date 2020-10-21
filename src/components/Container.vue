<template>
        <div ref="contentContainer"  class="content-container" @mousedown="start">
                edfgh{{getContainerByID}}
        </div>
</template>
<script>
        export default {
        name: "Container",
            data: () => {
                    return {
                            coords:{
                            X: undefined,
                            Y: undefined},
                            moveX: 0,
                            moveY: 0,
                    }
            },
            props: ['parentX', 'parentY', 'parentWidth', 'containerID', 'item'],
            methods: {
                    start: function (event) {
                            event.preventDefault()
                            this.coords.X = event.pageX-this.parentX
                            this.coords.Y = event.pageY-this.parentY
                            document.onmousemove = this.move
                            document.onmouseup = this.end
                            this.$refs.contentContainer.style.zIndex = 10;
                    },
                    move: function (event) {
                            event.preventDefault()
                            this.moveX   =  event.pageX;
                            this.moveY   =  event.pageY;
                            this.X = this.moveX - this.parentX-20;
                            if(this.X <= 0){
                                    this.end()
                                    this.X = 0;
                            }
                            if(this.X >= (this.parentWidth - this.$refs.contentContainer.offsetWidth)){
                                    this.end()
                                    this.X = this.parentWidth-this.$refs.contentContainer.offsetWidth;
                            }
                            this.Y = this.moveY-this.parentY-20;
                            if(this.Y<=0 ){
                                    this.end()
                                    this.Y = 0;
                            }
                            this.$refs.contentContainer.style.left = this.X +'px'
                            this.$refs.contentContainer.style.top = this.Y + 'px'
                    },
                    end () {
                            document.onmouseup = null
                            document.onmousemove = null
                            this.$refs.contentContainer.style.zIndex = 0;
                            this.$store.dispatch('updateContainer', {coords: this.coords, ID:this.containerID})
                    }
            },
            computed:{
                getContainerByID(){
                        return this.item
                }
            },
                mounted() {
                        this.coords.X = this.getContainerByID.coords.X
                        this.coords.Y = this.getContainerByID.coords.Y
                },


        }
</script>

<style scoped>
  .content-container{
          position: absolute;
          border: 1px solid #000;
          background-color: #fff;
          width: 200px;
          height: 200px;
          cursor: pointer;
  }
</style>
