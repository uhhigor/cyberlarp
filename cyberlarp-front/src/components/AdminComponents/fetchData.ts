import axios from 'axios';
async function getPlayers() {
    try {
      const response = await axios.get('http://localhost:5005/players');
      let result = []
      for (const obj of response.data) {
        result.push({
          id: obj.id,
          name: obj.name,
          password: obj.password,
        })
      }
      return result;
  } catch (error) {
    return [];
  }
  }
async function getCharacters() {
    try {
    const response = await axios.get('http://localhost:5005/characters');
      let result = []
      console.log(response.data);
      for (const obj of response.data) {
        result.push({
          id: obj.id,
          name: obj.name,
          description: obj.description,
          faction: obj.Faction.name,
          style: obj.Style.name,
          player: obj.Player.name,
        })
      }
      return result;
    } catch (error) {
      return [];
    }
  }
  async function getFactions() {
    try {
      const response = await axios.get('http://localhost:5005/factions');
      let result = []
      for (const obj of response.data) {
        result.push({
          id: obj.id,
          name: obj.name,
          description: obj.description,
        })
      }
      return result;
    } catch (error) {
      return [];
    }
  }
  async function getStyles() {
    try {
      const response = await axios.get('http://localhost:5005/styles');
      let result = []
      for (const obj of response.data) {
        result.push({
          id: obj.id,
          name: obj.name,
          description: obj.description,
        })
      }
      return result;
    } catch (error) {
      return [];
    }
  }
  async function getGigs() {
    try {
      const response = await axios.get('http://localhost:5005/gigs');
      let result = []
      for (const obj of response.data) {
        result.push({
          id: obj.id,
          name: obj.name,
          description: obj.description,
          reward: obj.reward,
        })
      }
      return result;
    } catch (error) {
      return [];
    }
  }
  async function getCharacterGigs() {
    try {
      const response = await axios.get('http://localhost:5005/gigsCharacters');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return [];
    }
  }

export { getPlayers, getCharacters, getFactions, getStyles, getGigs, getCharacterGigs };