import axios from 'axios';

const CHEEZAPI_BASE_URL = 'http://localhost:3001';

class CheezApi {
  // gets jokes from the backend, type is either random, top, bottom
  static async getJokes(type = 'random') {
    try {
      const apiResults = await axios({
        url: `${CHEEZAPI_BASE_URL}/jokes/`,
        method: 'get',
        params: {
          type
        }
      });
      return apiResults.data;
    } catch (error) {
      console.log(error);
    }
  }

  // upvotes a specific jokeId
  static async upVote(jokeId) {
    try {
      const apiResults = await axios({
        url: `${CHEEZAPI_BASE_URL}/jokes/${jokeId}/upvote`,
        method: 'patch'
      });
      return apiResults.data;
    } catch (error) {
      console.log(error);
    }
  }

  // downvotes a specific jokeId
  static async downVote(jokeId) {
    try {
      const apiResults = await axios({
        url: `${CHEEZAPI_BASE_URL}/jokes/${jokeId}/downvote`,
        method: 'patch'
      });
      return apiResults.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CheezApi;
