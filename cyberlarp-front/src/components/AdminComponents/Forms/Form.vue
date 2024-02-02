<template>
    <v-card>   
        <v-card-title>
            <span class="text-h5">{{ selected }}</span>
        </v-card-title>
    <v-card-text>
        <v-container>
            <PlayerForm
                v-if="selected === 'Players'"
                :editedItem="editedItem"
                @inputChanged="inputChanged"
                ></PlayerForm>
            <StyleForm
                v-if="selected === 'Styles'"
                :editedItem="editedItem"
                @inputChanged="inputChanged"
                ></StyleForm>
            <FactionForm
                v-if="selected === 'Factions'"
                :editedItem="editedItem"
                @inputChanged="inputChanged"
                ></FactionForm>
            <GigForm
                v-if="selected === 'Gigs'"
                :editedItem="editedItem"
                @inputChanged="inputChanged"
                ></GigForm>
            <CharacterForm
                v-if="selected === 'Characters'"
                :editedItem="editedItem"
                @inputChanged="inputChanged"
                ></CharacterForm>
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
    components: {
        PlayerForm: import('./PlayerForm.vue'),
        StyleForm: import('./StyleForm.vue'),
        FactionForm: import('./FactionForm.vue'),
        GigForm: import('./GigForm.vue'),
        CharacterForm: import('./CharacterForm.vue'),
    },
    props: {
        editedItem: {},
        selected: String,
    },
    data() {
        return {
            editedId: null,
            item: {} as any,
        }
    },
    computed: {
        selectedLowerCase() {
            if(this.selected)
                return this.selected.toLowerCase();
            console.error('Error: selected is null');
        },
        selectedSingular() {
            if(this.selected)
                return this.selected.slice(0, -1);
            console.error('Error: selected is null');
        },
        selectedSingularLowerCase() {
            if(this.selected)
                return this.selected.slice(0, -1).toLowerCase();
            console.error('Error: selected is null');
        },
    },
    methods: {
        inputChanged(newItem: {}) {
            this.item = newItem;
        },
        close() {
            this.$emit('close');
        },
        async save() {
            if (this.item.id == undefined) {
                try {
                    this.$emit('snackbar', 'info', `Adding new ${this.selectedSingularLowerCase}`);
                    await axios.post(`http://localhost:5005/${this.selectedLowerCase}`, this.item);
                    this.$emit('snackbar', 'success', `Added new ${this.selectedSingularLowerCase} ${this.item.name}`)
                } catch (error: any) {
                    this.$emit('snackbar', 'error', error.response.data.title + ': ' + error.response.data.detail);
                    console.log(error.response.data)
                }
            } else {
                try {
                    this.$emit('snackbar', 'info', `Editing ${this.selectedSingularLowerCase} ${this.item.name}`);
                    await axios.patch(`http://localhost:5005/${this.selectedLowerCase}/${this.item.id}`, this.item);
                    this.$emit('snackbar', 'success', `Edited ${this.selectedSingularLowerCase} ${this.item.name}`)
                } catch (error: any) {
                    this.$emit('snackbar', 'error', error.response.data.title + ': ' + error.response.data.detail);
                    console.log(error.response.data)
                }
            }
            this.$emit('save');
        },
        snackbar(color: string, text: string) {
            this.$emit('snackbar', color, text);
        }
    }
}
</script>