<template>
<div class="control-wrap">
    <ul class="control-list">
        <li class="control-list__item">
            <button :disabled="containers[index].counter==0" type="button"  class="btn button__backward" @click="backContainer"><i class="fas fa-undo"></i></button>
        </li>
        <li class="control-list__item">
            <button :disabled="containers[index].counter == containers[index].history.length-1"   type="button" class="btn button__forward"  @click="forwardContainer" ><i class="fas fa-redo"></i></button>
        </li>
        <li class="control-list__item">
            <button  type="button" :disabled="containers[index].counter==0" class="btn button__save"  @click="saveContainer"><i class="far fa-save"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__add" @click="createContainer"><i class="fas fa-plus"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__remove" @click="removeContainer"><i class="fas fa-trash-alt"></i></button>
        </li>
    </ul>
</div>
</template>
<script>
    export default {
        name: "ControlPanel",
        props: {isActive: Number},
        methods:{
            createContainer(){
                const container = {
                    currentContent: {
                        type: '',
                        link: '',
                    },
                    coords:{
                        X:0,
                        Y:0
                    },
                    width:200,
                    height:200,
                    counter:0,
                    visible:true,
                    history:[
                        {point:{
                            X:0,
                            Y:0,
                            width:200,
                            height:200,
                            content:{
                              type: '',
                              link: '',
                                },
                                visible:true
                            },
                        }
                    ]
                }
                this.$store.dispatch('addContainer', {container: container})
            },
            removeContainer(){
              this.$store.dispatch('removeContainer',this.$store.getters.getActiveContainer)
            },
            backContainer(){
                this.$store.dispatch('backContainer', this.$store.getters.getActiveContainer)
            },
            forwardContainer(){
                this.$store.dispatch('forwardContainer', this.$store.getters.getActiveContainer)
            },
            saveContainer(){
                this.$store.dispatch('saveContainer', this.$store.getters.getActiveContainer)
            }
        },
        computed:{
            containers(){
                return this.$store.getters.getAllContainers
            },
            index(){
                return this.$store.getters.getActiveContainer
            }
        }

    }
</script>

<style scoped>
    .control-wrap{
        background-color: #ededed;
    }

    .control-list{
        display: flex;
        list-style: none;
    }

</style>
