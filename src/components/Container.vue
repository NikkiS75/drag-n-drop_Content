<template>
        <div ref="contentContainer"  class="content-container" @mousedown="start">
                {{X}} {{Y}}
        </div>
</template>
<script>
    export default {
        name: "Container",
            data: () => {
                    return {
                            X: undefined,
                            Y: undefined,
                            moveX: 0,
                            moveY: 0,
                            movement: {
                                    startX: 0,
                                    startY:0,
                                    endX: 0,
                                    endY:0
                            },
                            container:{
                                    movements:[]}
                    }
            },
            props: ['parentX', 'parentY', 'parentWidth'],
            methods: {
                    start: function (event) {
                            event.preventDefault()
                            this.X = event.pageX-this.parentX
                            this.Y = event.pageY-this.parentY
                            document.onmousemove = this.move
                            document.onmouseup = this.end
                            this.movement.startX = this.X
                            this.movement.startY = this.Y
                    },
                    move: function (event) {
                            event.preventDefault()
                            this.moveX   =  event.pageX; //get mouse move position
                            this.moveY   =  event.pageY;
                            this.X = this.moveX-this.parentX-20;
                            if(this.X<=0){
                                    this.end()
                                    this.X = 0;
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
                            this.movement.endX = this.X
                            this.movement.endY = this.Y
                            this.container.movements.push(this.movement)
                    }
            }
    }
</script>

<style scoped>
  .content-container{
          position: absolute;
          border: 1px solid #000;
          width: 200px;
          height: 200px;
          cursor: pointer;
  }
</style>
