<template>
    <v-card>   
    <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
        <v-container>
            <v-col>
                <v-text-field
                    v-model="item.name"
                    label="Name"></v-text-field>

                <v-text-field
                    v-model="item.password"

                    label="Password"></v-text-field>
            </v-col>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="close"
        >
            Cancel
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="save"
        >
            Save
        </v-btn>
    </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">
import axios from "axios";
export default {
    props: {
        editedItem: {},
    },
    data() {
        return {
            item: {
                name: '', 
                password: ''
            },
            editedId: null,
        }
    },
    watch: {
        editedItem: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.item['name'] = newVal.name;
                    this.item['password'] = newVal.password;
                    this.editedId = newVal.id;
                }
            },
        },
    },
    computed: {
        formTitle() {
            return this.editedId == null ? 'New Player' : 'Edit Player'
        },
    },
    methods: {
        close() {
            this.$emit('close');
            this.editedId = null;
        },
        async save() {
            if (this.editedId == null) {
                try {
                    this.$emit('snackbar', 'info', 'Adding new player');
                    await axios.post(`http://localhost:5005/players`, this.item);
                    this.$emit('snackbar', 'success', `Added new player ${this.item.name}`)
                } catch (error: any) {
                    this.$emit('snackbar', 'error', error.response.data.title + ': ' + error.response.data.detail);
                    console.log(error.response.data)
                }
            } else {
                try {
                    this.$emit('snackbar', 'info', `Editing player ${this.item.name}`);
                    await axios.patch(`http://localhost:5005/players/${this.editedId}`, this.item);
                    this.$emit('snackbar', 'success', `Edited player ${this.item.name}`)
                } catch (error: any) {
                    this.$emit('snackbar', 'error', error.response.data.title + ': ' + error.response.data.detail);
                    console.log(error.response.data)
                }
            }
            this.$emit('save');
            this.$emit('close');
            this.editedId = null;
        },
    }
}
</script>
  