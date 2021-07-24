export default class API {
  constructor() {
    // API URL
    this.API_URL = 'https://breakingbadapi.com/api';
  }
  // GET LIST OF CHARACTER
  async getCharacters() {
    try {
      const response = await fetch(`${this.API_URL}/characters`);
      const json = await response.json();
      return json;
      
    }catch(err) {
      console.log(err);

    }
    
  }
  // GET SINGLE CHARACTER
  async getCharacterByName(name) {
    try {
      const response = await fetch(`${this.API_URL}/characters?name=${name}`);
      const json = await response.json();
      return json;
    }catch {
      console.log(err.message);
    }

  }
  async getCharacterById(id) {
    try {
      const response = await fetch(`${this.API_URL}/characters/${id}`)
      const json = await response.json();
      return json;
    }catch {
      console.log(err.message);
    }
  }

}