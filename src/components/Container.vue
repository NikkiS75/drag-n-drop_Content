<template>

    <div v-if="getContainerByID.visible == true" @dblclick="isDrag=!isDrag" ref="contentContainer"
         class="content-container" :class="{'active': getActiveContainer == this.containerID}" @click="active = !active"
         @mousedown="start">
        <b-button class="btn btn-light button__edit" v-b-modal="containerID.toString()"><i
                class="fas fa-pencil-alt"></i></b-button>
        <div class="wrap">
            <span class="hide">{{getContainerByID}}</span>
            <p v-if="getActiveContainer == this.containerID & getContainerByID.currentContent.type == 'text'">
                {{getContainerByID.currentContent.link}}</p>
            <img :width="getContainerByID.width"
                 v-if="getActiveContainer == this.containerID & getContainerByID.currentContent.type == 'img'"
                 :src="getContainerByID.currentContent.link"/>
            <video :width="getContainerByID.width"
                   v-if="getActiveContainer == this.containerID & getContainerByID.currentContent.type == 'video'"
                   :src="getContainerByID.currentContent.link"/>
            <div class='resizers' v-if="isDrag==false">
                <div class='resizer bottom-right'></div>
            </div>
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
                coords: {
                    X: undefined,
                    Y: undefined
                },
                moveX: 0,
                moveY: 0,
                active: false,
                url: '',
                isDrag: true,
                startMX: 0,
                startMY: 0,
                startWidth: undefined,
                startHeight: undefined,
                endWidth: 200,
                endHeight: 200
            }

        },
        props: ['parentX', 'parentY', 'parentWidth', 'containerID', 'item'],
        methods: {
            start: function (event) {
                event.preventDefault()
                if (this.isDrag == true) {
                    this.$store.dispatch('activeContainer', this.containerID)
                    //this.coords.X = event.pageX-this.parentX
                    // this.coords.Y = event.pageY-this.parentY
                    document.onmousemove = this.move
                    document.onmouseup = this.end
                    this.$refs.contentContainer.style.zIndex = 10;
                } else {
                    this.$store.dispatch('activeContainer', this.containerID)
                    this.startMX = event.pageX;
                    this.startMY = event.pageY;
                    window.addEventListener('mousemove', this.resize, false);
                    window.addEventListener('mouseup', this.stopResize, false);
                }
            },
            move: function (event) {
                event.preventDefault()
                this.moveX = event.pageX;
                this.moveY = event.pageY;
                this.coords.X = this.moveX - this.parentX - 20;
                if (this.coords.X <= 0) {
                    this.end()
                    this.coords.X = 0;
                }
                this.coords.Y = this.moveY - this.parentY - 20;
                if (this.coords.Y <= 0) {
                    this.end()
                    this.coords.Y = 0;
                }
                this.$refs.contentContainer.style.left = this.coords.X + 'px'
                this.$refs.contentContainer.style.top = this.coords.Y + 'px'
            },
            end() {
                document.onmouseup = null
                document.onmousemove = null
                this.$refs.contentContainer.style.zIndex = 0;
                this.$store.dispatch('updateContainer', {coords: this.coords, width:this.endWidth, height:this.endHeight,  ID: this.containerID})
            },
            resize(e) {
                this.endWidth = (this.startWidth + e.clientX - this.startMX);
                this.endHeight = this.startWidth + e.clientY - this.startMY;
                this.$refs.contentContainer.style.width = this.endWidth +'px'
                this.$refs.contentContainer.style.height = this.endHeight +'px'
            },
            stopResize() {
                window.removeEventListener('mousemove', this.resize, false);
                window.removeEventListener('mouseup', this.stopResize, false);
                this.$store.dispatch('updateContainer', {coords: this.coords, width:this.endWidth, height:this.endHeight,  ID: this.containerID})
            }


        },
        computed: {
            getContainerByID() {
                return this.item
            },
            getActiveContainer() {
                return this.$store.getters.getActiveContainer
            },

        },
        updated() {
            this.coords.X = this.getContainerByID.coords.X
            this.coords.Y = this.getContainerByID.coords.Y
            this.startWidth = this.getContainerByID.width
            this.startHeight = this.getContainerByID.height
            this.$refs.contentContainer.style.left = this.getContainerByID.coords.X + 'px';
            this.$refs.contentContainer.style.top = this.getContainerByID.coords.Y + 'px';
           this.$refs.contentContainer.style.width = this.getContainerByID.width+ 'px';
           this.$refs.contentContainer.style.height = this.getContainerByID.height+ 'px';

        },

    }
</script>

<style scoped>

    .content-container {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        border: 1px solid #000;
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: #fff;;
        cursor: pointer;
        overflow: hidden;
        padding: 5px;

    }

    .content-container .resizers {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .content-container .resizers .resizer {
        width: 10px;
        height: 10px;
        background: black;
        border: 3px solid #000;
        position: absolute;
    }

    .content-container .resizers .resizer.bottom-right {
        right: 0;
        bottom: 0;
        cursor: nwse-resize;


    }

    .hide {
        display: none;
    }

    .button__edit {
        position: absolute;
    }

    img {
        object-fit: cover;
    }

    .active {
        border: 2px solid #000;
    }

</style>
