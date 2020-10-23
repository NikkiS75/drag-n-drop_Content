<template>
    <b-modal :id="idToString" @ok="Submit($event)" @show="resetModal"
             @hidden="resetModal">
        <div class="d-block">
            <b-button-group  class="mb-3">
                <b-button @click="content.type='text'">Текст</b-button>
                <b-button @click="content.type='img'">Картинка</b-button>
                <b-button @click="content.type='video'">Видео</b-button>
            </b-button-group>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                        :state="nameState"
                        label="Текст"
                        label-for="text"
                        invalid-feedback="Вы не ввели текст"
                        v-if="content.type=='text'"
                >
                    <b-form-textarea
                            id="text"
                            rows="3"
                            v-model="content.url"
                            :state="nameState"
                            required
                    ></b-form-textarea>
                </b-form-group>
                <b-form-group v-if="content.type=='img'">
                <b-form-file
                        ref="file"
                        placeholder="Выберите картинку..."
                        drop-placeholder="Перетащите картинку сюда..."
                        @input="getFile()"
                ></b-form-file>
                <div class="mt-3">Выбранный файл: {{ file ? file.name : '' }}</div>
                </b-form-group>
                <b-form-group v-if="content.type=='video'">
                    <b-form-file
                            ref="file"
                            placeholder="Выберите видео..."
                            drop-placeholder="Перетащите видео сюда..."
                            @input="getFile()"
                    ></b-form-file>
                    <div class="mt-3">Выбранный файл: {{ file ? file.name : '' }}</div>
                </b-form-group>
            </form>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: "Modal",
        data:() => ( {
                content: {
                    type: 'text',
                    url: '',
                },
            file:[],
                nameState: null,
            text2: ''
        }),
        props:['modalID'],
        computed:{
            idToString(){
                return this.modalID.toString()
            }
        },
        methods: {
            addContent() {
                this.$store.dispatch('addContent', {content: this.content, ID: this.modalID})
            },
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.content.url = ''
                this.nameState = null
            },
            Submit(e) {
                e.preventDefault()
                this.handleSubmit()
            },
            handleSubmit() {
                if (!this.checkFormValidity()) {
                    return
                }
                this.addContent()
                this.$nextTick(() => {
                    this.$bvModal.hide(this.modalID.toString())
                })
            },
            getFile() {
                this.file = this.$refs.file.files[0]
                const reader = new FileReader
                console.log(reader)
                reader.onload = e => {
                    this.content.url = e.target.result
                    console.log(this.content.url)
                }
                reader.readAsDataURL(this.file)
                }
            }
        }
</script>

<style scoped>

</style>
