<template>
  <v-container class="fill-height">
    <v-row class="align-center justify-center">
      <v-col cols="3" class="align-center justify-center" >
        <h1 class="text-h3">Cyberlarp</h1>
        <h2 class="text-h5 font-weight-bold">Admin Panel</h2>
      </v-col>
      <v-col class="ml-5">
        <v-card>
        <v-select
          v-model="selected"
          :items="options"
          label="Show"
        ></v-select>
        <v-data-table 
          :headers="headers"
          :items="tableData"
          :items-per-page="10"
          class="elevation-1">
          <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
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
import axios from "axios";
export default {
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
    }),
    watch: {
      async selected(newVal) {
        let data = await this.fetchData(newVal);
        this.tableData = data;
        if (data.length > 0) {
          this.headers = Object.keys(data[0]);
          this.headers = this.convertHeaders(this.headers);
        }
      }
    },
    async mounted() {
      let data = await this.fetchData(this.selected);
        this.tableData = data;
        if (data.length > 0) {
          this.headers = Object.keys(data[0]);
          this.headers = this.convertHeaders(this.headers);
        }
  },
  methods: {
    editItem(item: any) {
      console.log(item);
    },
    deleteItem(item: any) {
      console.log(item);
    },
    convertHeaders(headers: any) {
      function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      let result = [];
      for (const header of headers) {
        result.push({'title': capitalizeFirstLetter(header), 'key': header});
      }
      result.push({'title': 'Actions', 'key': 'actions'});
      return result;
    },
    async fetchData(option: string) {
      if (option === 'Players') {
        return await this.getPlayers();
    }
    if (option === 'Characters') {
      return await this.getCharacters();
    }
    if (option === 'Factions') {
      return await this.getFactions();
    }
    if (option === 'Styles') {
      return await this.getStyles();
    }
    if (option === 'Gigs') {
      return await this.getGigs();
    }
    if (option === 'Character Gigs') {
      return await this.getCharacterGigs();
    }
  },
  async getPlayers() {
    try {
      const response = await axios.get('http://localhost:5005/players');
      let result = []
      for (const player of response.data) {
        result.push({
          id: player.id,
          name: player.name,
          password: player.password,
        })
      }
      return result;
  } catch (error) {
    return [];
  }
  },
  async getCharacters() {
    try {
      const response = await axios.get('http://localhost:5005/characters');
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getFactions() {
    try {
      const response = await axios.get('http://localhost:5005/factions');
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getStyles() {
    try {
      const response = await axios.get('http://localhost:5005/styles');
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getGigs() {
    try {
      const response = await axios.get('http://localhost:5005/gigs');
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getCharacterGigs() {
    try {
      const response = await axios.get('http://localhost:5005/character_gigs');
      return response.data;
    } catch (error) {
      return [];
    }
  },
}
}
</script>
