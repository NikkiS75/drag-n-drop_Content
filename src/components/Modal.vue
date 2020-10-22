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
                        label="Text"
                        label-for="text"
                        invalid-feedback="Вы не ввели текст"
                        v-if="content.type=='text'"

                >
                    <b-form-textarea
                            id="text"
                            rows="3"
                            v-model="content.text"
                            :state="nameState"
                            required
                    ></b-form-textarea>
                </b-form-group>
                <b-form-file
                        v-if="content.type=='img'"
                        ref="file"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        @change="getFile()"
                ></b-form-file>
                <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
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
                    text: URL,
                },
            file:[],
                nameState: null,
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
                this.content.text = ''
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
                // const reader = new FileReader
                // console.log(reader)
                // reader.onload = function (e) {
                //     this.text = e.target.result
                // }
                // reader.readAsDataURL(this.file)
                this.content.text = window.URL.createObjectURL(this.file)
                console.log(this.content.text)
                }
            }
        }
</script>

<style scoped>

</style>
