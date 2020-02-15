<template>
    <div v-show="!loading">
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-left">
                    <v-btn color="primary" dark medium icon flat @click="goBack">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-btn v-if='$route.name == "new-project"' color="primary" dark medium icon flat @click="save">
                        <v-icon>
                            done
                        </v-icon>
                    </v-btn>
                    <v-btn v-else @click="update"  color="primary" dark medium icon flat>
                        <v-icon>
                            done
                        </v-icon>
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md8 lg7 pa-4>
                <v-layout column>
                    <v-form ref="form">
                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-text-field label="Name" data-vv-name="name" v-model="project.name" outline :rules="rules.name" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-textarea  label="Description" data-vv-name="description" v-model="project.description" outline :rules="rules.description" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row pb-4>
                            <v-flex xs12>
                                <v-layout column>
                                    <quill-editor v-if="renderComponents" ref="myTextEditor" v-model="quill.content" :options="quill.editorOption"
                                        @change="onEditorChange($event)" @ready="onEditorReady($event)"/>
                                </v-layout>
                            </v-flex>
                        </v-layout>

                         <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-text-field label="Link-Tour" data-vv-name="link" v-model="project.link" outline :rules="rules.link" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-layout column>
                                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="project.active" />
                                </v-layout>
                            </v-flex>

                            <v-flex xs4>
                                <v-layout column>
                                    <v-checkbox label="Highlighted" data-vv-name="highlighted" type="checkbox" v-model="project.highlighted" />
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4 lg5 pa-4>  
                <v-layout column>
                    <MediasManager v-if="renderComponents" ref="thumbnail" :label="'Thumbnail'" :limit="1" :existingMedia="project.medias.thumbnail ? project.medias.thumbnail.thumb : []"/>
                    <MediasManager v-if="renderComponents" ref="breadcrumb" :label="'Breadcrumb'" :limit="5" :existingMedia="project.medias.breadcrumb ? project.medias.breadcrumb.thumb : []"/>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'
import MediasManager from '../reusable/MediasManager'

export default{
    components: {
        MediasManager,
    },
    props: {
        component: String,
    },
    data(){
        return {
            project: {
                name: '',
                description: '',
                description_quill: null,
                categories_id: null,
                subcategories: [],
                link: '',
                active: true,
                highlighted: false,
                medias: [],
            },
            renderComponents: false,
            totalCustomComponents: 0,
            quill: {
                content: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['link'],
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                }
            },
            rules: {
                name: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 15) || 'Name must be less than 15'
                ],
                description: [
                    v => !!v || 'Description is required',
                    v => (v && v.length <= 140) || 'Description must be less than 140'
                ],
                link: [
                    v => !!v || 'Link-Tour is required',
                    value => {
                        if(value){
                            const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                            return pattern.test(value) || 'Invalid url.'
                        }
                        return true
                    }
                ]
            },
        }
    },
    created(){
        this.$store.commit('SET_LOADING', true);

        eventBus.$on('medias-remove', (media) => {
            this.removeMedia(media);
        })

        eventBus.$once('elem-fetched', (data) => {
            this.project = data.project;

            this.renderComponents = true;
            this.$store.commit('SET_LOADING', false);
        });

        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id); // Captured on components/form/Form
        }

        if(this.$route.name == 'new-project'){
            this.renderComponents = true;
            this.$store.commit('SET_LOADING', false);
        }
    },
    methods: {
        save(){
            this.$store.commit('SET_LOADING', true);

            if(this.$refs.form.validate()){
                let params = this.project;
                let formData = new FormData();

                for (var key in params) {
                    formData.append(key, params[key]);
                }

                if(this.$refs.thumbnail.medias.length){
                    this.$refs.thumbnail.medias.forEach((m) => {
                        formData.append('thumbnail[]', m);
                    });
                }

                if(this.$refs.breadcrumb.medias.length){
                    this.$refs.breadcrumb.medias.forEach((m) => {
                        formData.append('breadcrumb[]', m);
                    });
                }

                eventBus.$emit('save', formData);
            } else {
                this.$store.commit('SET_LOADING', false);
            }
        },
        update(){
            this.$store.commit('SET_LOADING', true);
            
            if(this.$refs.form.validate()){
                let params = this.project;
                let formData = new FormData();

                for (var key in params) {
                    formData.append(key, params[key]);
                }

                if(this.$refs.thumbnail.medias.length){
                    this.$refs.thumbnail.medias.forEach((m) => {
                        formData.append('thumbnail[]', m);
                    });
                }

                if(this.$refs.breadcrumb.medias.length){
                    this.$refs.breadcrumb.medias.forEach((m) => {
                        formData.append('breadcrumb[]', m);
                    });
                }

                eventBus.$emit('update', formData);
            } else {
                this.$store.commit('SET_LOADING', false);
            }
        },
        removeMedia(media){
            let formData = new FormData();
            formData.append('media_id', media.id);

            eventBus.$emit('removeMedia', formData);
        },
        goBack(){
            this.$router.go(-1);
        },
        onEditorReady(quill) {
            if(this.project.description_quill)
                quill.setContents(JSON.parse(this.project.description_quill));
        },
        onEditorChange({ quill, html, text }) {
            this.project.description_quill = JSON.stringify(quill.getContents());
            this.quill.content = html
        },
    },
    computed: {
        loading(){ return this.$store.getters.loading },
    }
}
</script>

<style>
    .quill-editor {
        border: 2px solid rgba(0,0,0,.54);
        border-radius: 4px;
    }

    .ql-container {
        border-top: 2px solid rgba(0,0,0,.54);
        border-radius: 0px;
        height: 70vh!important;
    }
</style>
