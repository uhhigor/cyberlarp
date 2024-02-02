<template>
    <v-col>
        <v-row>
            <v-text-field
                v-model="item.name"
                label="Name"></v-text-field>
            </v-row>
            <v-row>
            <v-text-field
                v-model="item.description"
                label="Description"></v-text-field>
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
                description: '',
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
    }
}
</script>
  