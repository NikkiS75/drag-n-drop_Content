<template>
        <div class="wrap">

        <div v-if="getContainerByID.visible" ref="contentContainer" class="content-container" :class="{'active': getActiveContainer == this.containerID }" @click="active = !active" @mousedown="start">
                <span class="hide">{{getContainerByID}}</span>
                <p v-if="getActiveContainer == this.containerID & getContainerByID.currentContent.type == 'text'">{{getContainerByID.currentContent.link}}</p>
                <img v-if="getActiveContainer == this.containerID" :src="getContainerByID.currentContent.link"/>
                <b-button class="btn btn-light button__edit" v-b-modal="containerID.toString()"><i class="fas fa-pencil-alt"></i></b-button>
        </div>
               <Modal :modalID="this.containerID"></Modal>
        </div>
</template>
<script>
        import Modal from "./Modal";
        export default {
        name: "Container",
                components: {Modal},
                data: () => {
                    return {
                            coords:{
                            X: undefined,
                            Y: undefined},
                            moveX: 0,
                            moveY: 0,
                            active: false,
                            url: ''
                    }

            },
            props: ['parentX', 'parentY', 'parentWidth', 'containerID', 'item'],
            methods: {
                    start: function (event) {
                            event.preventDefault()
                            this.$store.dispatch('activeContainer', this.containerID)
                            //this.coords.X = event.pageX-this.parentX
                           // this.coords.Y = event.pageY-this.parentY
                            document.onmousemove = this.move
                            document.onmouseup = this.end
                            this.$refs.contentContainer.style.zIndex = 10;

                    },
                    move: function (event) {
                            event.preventDefault()
                            this.moveX   =  event.pageX;
                            this.moveY   =  event.pageY;
                            this.coords.X = this.moveX - this.parentX-20;
                            if(this.coords.X <= 0){
                                    this.end()
                                    this.coords.X = 0;
                            }
                            if(this.coords.X >= (this.parentWidth - this.$refs.contentContainer.offsetWidth)){
                                    this.end()
                                    this.coords.X = this.parentWidth-this.$refs.contentContainer.offsetWidth;
                            }
                            this.coords.Y = this.moveY-this.parentY-20;
                            if(this.coords.Y<=0 ){
                                    this.end()
                                    this.coords.Y = 0;
                            }
                            this.$refs.contentContainer.style.left = this.coords.X +'px'
                            this.$refs.contentContainer.style.top = this.coords.Y + 'px'
                    },
                    end () {
                            document.onmouseup = null
                            document.onmousemove = null
                            this.$refs.contentContainer.style.zIndex = 0;
                            this.$store.dispatch('updateContainer', {coords: this.coords, ID:this.containerID})
                    },


            },
            computed:{
                getContainerByID(){
                        return this.item
                },
                 getActiveContainer(){
                        return this.$store.getters.getActiveContainer
                 },

            },
                updated() {
                console.log(this.active)
                        this.coords.X = this.getContainerByID.coords.X
                        this.coords.Y = this.getContainerByID.coords.Y
                        this.$refs.contentContainer.style.left = this.getContainerByID.coords.X + 'px';
                        this.$refs.contentContainer.style.top = this.getContainerByID.coords.Y + 'px';

                },


        }
</script>

<style scoped>
  .content-container{
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          position: absolute;
          border: 1px solid #000;
          background-color: #fff;
          width: 200px;
          height: 200px;
          cursor: pointer;
  }
        .hide{
                display: none;
        }
        .button__edit{
        }
        .active{
                border: 2px solid #000;
        }
</style>
