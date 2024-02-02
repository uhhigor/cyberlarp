<template>
    <v-col>
        <v-row>
            <v-select
                v-model="item.player"
                :items="players"
                item-value="id"
                item-title="name"
                label="Player"
                :loading="loadingPlayers"></v-select>
            <v-select
                v-model="item.style"
                :items="styles"
                item-value="id"
                item-title="name"
                label="Style"
                :loading="loadingStyles"></v-select>
            <v-select
                v-model="item.faction"
                :items="factions"
                item-value="id"
                item-title="name"
                label="Faction"
                :loading="loadingFactions"></v-select>
            </v-row>
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
import { getPlayers, getStyles, getFactions } from '../fetchData';
export default {
    props: {
        editedItem: {},
    },
    data() {
        return {
            loadingPlayers: false,
            loadingStyles: false,
            loadingFactions: false,
            item: {
                name: '', 
                description: '',
                reward: 0,
                player: null,
                style: null,
                faction: null,
            },
            players: [{id: Number, name: String, password: String}],
            styles: [{id: Number, name: String, description: String}],
            factions: [{id: Number, name: String, description: String}],
        }
    },
    mounted() {
        this.loadingPlayers = true;
        getPlayers().then((data) => {
            this.players = data;
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            this.loadingPlayers = false;
        });

        this.loadingStyles = true;
        getStyles().then((data) => {
            this.styles = data;
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            this.loadingStyles = false;
        });
        this.loadingFactions = true;
        getFactions().then((data) => {
            this.factions = data;
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            this.loadingFactions = false;
        });
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
  