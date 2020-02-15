<template>
    <div v-show="!loading">
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-left">
                    <v-btn color="primary" dark medium icon flat @click="goBack">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-btn v-if='$route.name == "new-slider"' color="primary" dark medium icon flat @click="save">
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
                                    <v-text-field label="Title" data-vv-name="title" v-model="slider.title" outline />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-text-field label="Subtitle" data-vv-name="subtitle" v-model="slider.subtitle" outline />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-text-field label="External-Link" data-vv-name="url" v-model="slider.url" :rules="rules.url" outline />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-layout column>
                                    <v-checkbox label="Open new Window" data-vv-name="blank" type="checkbox" v-model="slider.blank" outline />
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-layout column>
                                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="slider.active" outline />
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4 lg5 pa-4>
                <v-layout column>
                    <MediasManager v-if="renderComponents" ref="medias" :label="'Medias'" :limit="1" :existingMedia="slider.medias.medias ? slider.medias.medias.thumb : []"/>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'
import MediasManager from '../reusable/MediasManager'
import SelectSimple from '../reusable/selects/Simple'

export default{
    components: {
        MediasManager,
        SelectSimple
    },
    props: {
        component: String,
    },
    data(){
        return {
            slider: {
                name: '',
                title: '',
                subtitle: '',
                active: true,
                medias: [],
            },
            rules: {
                title: [
                    v => !!v || 'Title is required',
                ],
                url: [
                    value => {
                        if(value){
                            const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                            return pattern.test(value) || 'Invalid url.'
                        }
                        return true
                    }
                ]
            },
            renderComponents: false,
            totalCustomComponents: 1,
        }
    },
    created(){
        this.$store.commit('SET_LOADING', true);

        eventBus.$on('medias-remove', (media) => {
            this.removeMedia(media);
        });

        eventBus.$once('elem-fetched', (data) => {
            this.slider = data.slider;
            this.$store.commit('SET_LOADING', false);
            this.renderComponents = true;
        });

        eventBus.$on('projects-select-changed', (projects_id) => {
            this.slider.projects_id = projects_id;
        });

        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id);
        }

        if(this.$route.name == 'new-slider'){
            this.$store.commit('SET_LOADING', false);
            this.renderComponents = true;
        }
    },
    methods: {
        save(){
            this.$store.commit('SET_LOADING', true);
            
            if(this.$refs.form.validate()){
                let params = this.slider;
                let formData = new FormData();

                for (var key in params) {
                    formData.append(key, params[key]);
                }

                if(this.$refs.medias.medias.length){
                    this.$refs.medias.medias.forEach((m) => {
                        formData.append('medias[]', m);
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
                let params = this.slider;
                let formData = new FormData();

                for (var key in params) {
                    formData.append(key, params[key]);
                }

                if(this.$refs.medias.medias.length){
                    this.$refs.medias.medias.forEach((m) => {
                        formData.append('medias[]', m);
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
        }
    },
    computed: {
        loading(){ return this.$store.getters.loading },
        projectsUrl() { return this.$store.getters.baseUrl + 'projects' },
    }
}
</script>
