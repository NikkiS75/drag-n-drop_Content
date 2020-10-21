<template>
<div class="control-wrap">
    <ul class="control-list">
        <li class="control-list__item">
            <button type="button" @click="backContainer" class="btn button__backward"><i class="fas fa-undo"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__forward"><i class="fas fa-redo"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__save"><i class="far fa-save"></i></button>
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
                    content: 'dkjcbdjbc',
                    movements: [],
                    coords:{
                        X:undefined,
                        Y:undefined
                    },
                    history:[]
                }
                this.$store.dispatch('addContainer', {container: container})
            },
            removeContainer(){
              this.$store.dispatch('removeContainer',this.$store.getters.getActiveContainer)
            },
            backContainer(){
                this.$store.dispatch('backContainer', this.$store.getters.getActiveContainer)
            }
        },

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
