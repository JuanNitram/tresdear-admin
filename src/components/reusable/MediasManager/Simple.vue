<template>
    <div>
        <v-layout row>
            <v-flex xs12 class="text-xs-left">
                <h2>{{ label }}</h2>
            </v-flex>
        </v-layout>
        <v-layout  row>
            <v-flex xs12>
                <div v-if="limit">
                    <div class="text-sm-left">
                        <v-btn v-if="totalMedias < limit" flat icon @click="triggerInputFiles">
                            <v-icon>
                                backup
                            </v-icon>
                        </v-btn>
                        <input type="file" ref="file" multiple="multiple" id="medias" @change="uploadFieldChange" style="display:none;"/>
                    </div>
                </div>
                <div v-else>
                    <div class="text-sm-left">
                        <v-btn flat icon @click="triggerInputFiles">
                            <v-icon>
                                backup
                            </v-icon>
                        </v-btn>
                        <input type="file" ref="file" multiple="multiple" id="medias" @change="uploadFieldChange" style="display:none;"/>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <div v-for="(media, index) in this.existingMedia" :key="index">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-sm-left">
                                <img :src="media.full_url" class="img-thumbnail" :alt="media.filename + ' (' + Number((media.size / 1024 / 1024).toFixed(1)) + 'MB)'"/>
                                <strong>
                                    <span class="label label-primary">{{ media.filename | trunc(25, '...') }}</span>
                                </strong>
                                <span style="cursor: pointer;" @click="removeExistingAttachment(media)">
                                    <v-btn flat icon color="black">
                                        <v-icon>remove</v-icon>
                                    </v-btn>
                                </span>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
                <div v-for="(media, index) in medias" :key="index">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-sm-left">
                                <img :src="media.url" class="img-thumbnail" :alt="media.name + ' (' + Number((media.size / 1024 / 1024).toFixed(1)) + 'MB)'"/>
                                <strong>
                                    <span class="label label-primary">{{ media.name | trunc(25, '...') }}</span>
                                </strong>
                                <span style="cursor: pointer;" @click="removeAttachment(media)">
                                    <v-btn flat icon color="black">
                                        <v-icon>remove</v-icon>
                                    </v-btn>
                                </span>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../../EventBus.js'

export default{
    props:{
        existingMedia: Array,
        label: String,
        limit: Number,
    },
    data(){
        return {
            medias: [],
            totalMedias: 0
        }
    },
    methods: {
        uploadFieldChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            for (var i = files.length - 1; i >= 0; i--) {
                files[i].url = URL.createObjectURL(files[i]);
                this.medias.push(files[i]);
            }
            document.getElementById("medias").value = [];
            eventBus.$emit('medias-change', this.medias);
        },
        removeAttachment(media) {
            eventBus.$emit('medias-change', this.medias);
            this.totalMedias = this.existingMedia.length + this.medias.length
            this.medias.splice(this.medias.indexOf(media), 1);
        },
        triggerInputFiles(){
            this.$refs.file.click()
        },

        removeExistingAttachment(media){
            eventBus.$emit('medias-remove', media)
            this.totalMedias = this.existingMedia.length + this.medias.length
            this.existingMedia.splice(this.existingMedia.indexOf(media), 1);
        }
    },
    watch: {
        existingMedia(){
            this.totalMedias = this.existingMedia.length + this.medias.length
        },
        medias(){
            this.totalMedias = this.existingMedia.length + this.medias.length
        }
    }
}
</script>

<style>
.img-thumbnail {
    width: 80px;
    height: 80px;
    display: inline;
    vertical-align: middle;
    margin: 10px;
    border-radius: 4px;
}
</style>
