<template>
    <div v-show="!loading">
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-left">
                    <v-btn color="primary" dark medium icon flat @click="goBack">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-btn v-if='$route.name == "new-price"' color="primary" dark medium icon flat @click="save">
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
                                    <v-text-field label="Title" data-vv-name="title" v-model="price.title" outline :rules="rules.title" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-text-field label="Subtitle" data-vv-name="subtitle" v-model="price.subtitle" outline :rules="rules.subtitle" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-textarea label="Details" data-vv-name="details" v-model="price.details" outline :rules="rules.details" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-textarea label="Description" data-vv-name="description" v-model="price.description" outline :rules="rules.description" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-text-field label="Price" data-vv-name="price" v-model="price.price" outline :rules="rules.price" />
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-layout column>
                                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="price.active" outline />
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-layout column>
                                    <v-checkbox label="+ Iva" data-vv-name="iva" type="checkbox" v-model="price.iva" outline />
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4 lg5 pa-4>
                <v-layout column>
                    <!-- <MediasManager :existingMedia="client.media"/> -->
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'

export default{
    props: {
        component: String,
    },
    data(){
        return {
            price: {
                title: '',
                subtitle: '',
                details: '',
                description: '',
                price: '',
                active: true,
                iva: false,
            },
            rules: {
                title: [ 
                    v => !!v || 'Title is required',
                    v => (v && v.length <= 15) || 'Name must be less than 15'

                ],
                subtitle: [ 
                    v => !!v || 'Subtitle is required',
                    v => (v && v.length <= 30) || 'Name must be less than 30'
                ],
                details: [ 
                    v => !!v || 'Details is required',
                    v => (v && v.length <= 120) || 'Name must be less than 120'
                ],
                description: [ 
                    v => !!v || 'Description is required',
                    v => (v && v.length <= 60) || 'Name must be less than 60'
                ],
                price: [ v => !!v || 'Price is required'],
            },
        }
    },
    created(){
        this.$store.commit('SET_LOADING', true);

        eventBus.$once('elem-fetched', (data) => {
            this.price = data.price;
            this.$store.commit('SET_LOADING', false);
        });

        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id);
        }

        if(this.$route.name == 'new-price'){
            this.$store.commit('SET_LOADING', false);
        }
    },
    methods: {
        save(){
            this.$store.commit('SET_LOADING', true);
            
            if(this.$refs.form.validate()){
                let params = this.price;
                let formData = new FormData();

                for (var key in params) {
                    formData.append(key, params[key]);
                }

                eventBus.$emit('save', formData);
            } else {
                this.$store.commit('SET_LOADING', false);
            }
        },
        update(){
            this.$store.commit('SET_LOADING', true);
            
            if(this.$refs.form.validate()){
                let params = this.price;
                let formData = new FormData();

                for (var key in params) {
                    formData.append(key, params[key]);
                }
                
                eventBus.$emit('update', formData);
            } else {
                this.$store.commit('SET_LOADING', false);
            }
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    computed: {
        loading(){ return this.$store.getters.loading },
    }
}
</script>
