<template>
  <v-container class="fill-height">
    <v-row class="align-center justify-center">
      <v-col class="align-center justify-center" >
        <h1 class="text-h3">Cyberlarp</h1>
        <h2 class="text-h5 font-weight-bold">Admin Panel</h2>
        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          :timeout="3000">
          {{ snackbarText }}
        </v-snackbar>
        <v-card>
        <v-select
          v-model="selected"
          :items="options"
          label="Show">
        </v-select>
        <v-data-table 
          :loading="loading"
          :headers="headers"
          :items="tableData"
          :items-per-page="10"
          >
          <template v-slot:top>
            <v-toolbar>
              <v-btn
              @click="playerFormDialog = true">
                  <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
            <v-dialog 
            v-model="playerFormDialog">
              <Form 
              :editedItem="editedItem"
              :selected="selected"
              @save="handleSave"
              @close="handleClose"
              @snackbar="handleSnackbar"
              ></Form>
            </v-dialog>

          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="small"
              class="me-2"
              @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon
              size="small"
              @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import axios from 'axios';
import { getPlayers, getCharacters, getFactions, getStyles, getGigs, getCharacterGigs } from './AdminComponents/fetchData.js';
export default {
  components: {
    PlayerForm: () => import('./AdminComponents/Forms/PlayerForm.vue'),
    Form: () => import('./AdminComponents/Forms/Form.vue'),
  },
    data: () => ({
      options: [
        'Players',
        'Characters',
        'Factions',
        'Styles',
        'Gigs',
        'Character Gigs'
      ],
      selected: 'Players',
      tableData: undefined as any,
      headers: undefined as any,
      editedItem: {} as any,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      loading: false,
      playerFormDialog: false,
    }),
    watch: {
      selected(newVal) {
        this.updateData(newVal);
      }
    },
    mounted() {
      this.updateData(this.selected);
    },
    methods: {
      
      async handleSave() {
        this.updateData(this.selected);
        this.editedItem = {} as any;
      },
      handleClose() {
        this.playerFormDialog = false;
        this.editedItem = {} as any;
      },
      handleSnackbar(color: string, text: string) {
        this.snackbarColor = color;
        this.snackbarText = text;
        this.snackbar = true;
      },
      updateData(selection: string) {
        this.loading = true;
        this.fetchData(selection).then((data) => {
          if (data.length > 0) {
            this.tableData = data;
            this.headers = Object.keys(data[0]);
            this.headers = this.convertHeaders(this.headers);
          }
          else {
            this.tableData = [];
            this.headers = [];
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          this.loading = false;
        });
      },
      editItem(item: any) {
        this.editedItem = item;
        this.playerFormDialog = true;
      },
      deleteItem(item: any) {
          this.handleSnackbar('info', `Deleting ${item.name} from ${this.selected}`);
          axios.delete(`http://localhost:5005/${this.selected.toLowerCase()}/${item.id}`).then(() => {
            this.handleSnackbar('success', `Deleted ${item.name} from ${this.selected}`);
          }).catch((error) => {
            this.handleSnackbar('error', error.response.data.title + ': ' + error.response.data.detail);
            console.log(error.response.data)
          }).finally(() => {
            this.updateData(this.selected);
          });
        },
      capitalizeFirstLetter(str: string) {
          return str.charAt(0).toUpperCase() + str.slice(1);
      },
      convertHeaders(headers: any) {
        let result = [];
        for (const header of headers) {
          result.push({'title': this.capitalizeFirstLetter(header), 'key': header});
        }
        result.push({'title': 'Actions', 'key': 'actions'});
        return result;
      },
    async fetchData(option: string) {
      switch(option) {
        case 'Players':
          return await getPlayers();
        case 'Characters':
          return await getCharacters();
        case 'Factions':
          return await getFactions();
        case 'Styles':
          return await getStyles();
        case 'Gigs':
          return await getGigs();
        case 'Character Gigs':
          return await getCharacterGigs();
      }
  },
}
}
</script>
