<template>
    <div ref="wrapArea">
    <div ref="contentContainer" class="content-container" @mousedown="start">
    </div>
    </div>
</template>

<script>
    export default {
        name: 'WorkArea',
        data: () => {
            return {

                    X: undefined,
                    Y: undefined,
                    moveX: 0,
                    moveY: 0

            }
        },
        methods: {
            start: function (event) {
                event.preventDefault()
                this.X = event.clientX
                this.Y = event.clientY
                document.onmousemove = this.move
                document.onmouseup = this.end
            },
            move: function (event) {
                event.preventDefault()
                this.moveX = this.X - event.clientX
                this.moveY = this.Y - event.clientY
                this.X = event.clientX
                this.Y = event.clientY
                this.$refs.contentContainer.style.top = (this.$refs.contentContainer.offsetTop - this.moveY) + 'px'
                this.$refs.contentContainer.style.left = (this.$refs.contentContainer.offsetLeft - this.moveX) + 'px'
            },
            end () {
                document.onmouseup = null
                document.onmousemove = null
            }
        }
    }
</script>

<style>
    .content-container {
        position: absolute;
        z-index: 9;
        width: 200px;
        height: 200px;
        border: 1px solid #2c3e50;
    }

</style>
