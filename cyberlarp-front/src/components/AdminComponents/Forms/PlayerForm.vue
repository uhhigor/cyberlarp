<template>
    <v-col>
        <v-row>
            <v-text-field
                v-model="item.name"
                label="Name"></v-text-field>
            </v-row>
            <v-row>
            <v-text-field
                v-model="item.password"
                label="Password"></v-text-field>
            <v-btn class="ml-5"
            @click="randomPassword">
                <v-icon>mdi-dice-5</v-icon>
            </v-btn>
        </v-row>
    </v-col> 
</template>
  
<script lang="ts">
export default {
    props: {
        editedItem: {},
    },
    data() {
        return {
            item: {
                name: '', 
                password: '',
            },
        }
    },
    watch: {
        editedItem: {
            immediate: true,
            handler(newVal) {
                this.item = Object.assign({}, newVal);
            },
        },
        item: {
            deep: true,
            handler() {
                this.$emit('inputChanged', this.item);
            },
        },
    },
    methods: {
        randomPassword() {
            let pass = '';
            for (let i = 0; i < 8; i++) {
                pass += (Math.round(Math.random()*10)).toString();
            }
            this.item.password = pass;
        },
    }
}
</script>
  