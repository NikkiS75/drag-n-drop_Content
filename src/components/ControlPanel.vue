<template>
<div class="control-wrap">
    <ul class="control-list">
        <li class="control-list__item">
            <button type="button" class="btn button__backward"><i class="fas fa-undo"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__forward"><i class="fas fa-redo"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__save"><i class="far fa-save"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__save"><i class="fas fa-plus"></i></button>
        </li>
        <li class="control-list__item">
            <button type="button" class="btn button__remove"><i class="fas fa-trash-alt"></i></button>
        </li>
    </ul>
</div>
</template>
<script>

    export default {
        name: "ControlPanel"
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
