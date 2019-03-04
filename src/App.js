import React, { Component } from 'react';
import styled from 'styled-components';
import TopJokes from './Components/TopJokes';
import BottomJokes from './Components/BottomJokes';
import RandomJokes from './Components/RandomJokes';
import Titlebar from './Components/Header';
import CheezApi from './Helpers/CheezApi';

const GridWrapper = styled.div`
  display: grid;
  grid-template: 100px 600px 600px / 48vw 48vw;
  grid-template-areas:
    'titlebar titlebar'
    'main top'
    'main bottom';
`;

const IsLoading = styled.div`
  width: 40px;
  height: 40px;
  background-color: red;
`;

export const AppContext = React.createContext();
class App extends Component {
  state = {
    isLoading: true,
    randomJokes: [],
    topJokes: [],
    bottomJokes: []
  };

  componentDidMount() {
    // check if lists exists in LocalStorage, if so retrieve from cache

    // else pull from API
    setTimeout(async () => {
      const jokelistPromises = [
        CheezApi.getJokes('random'),
        CheezApi.getJokes('top'),
        CheezApi.getJokes('bottom')
      ];

      // get all jokeLists and update State
      const jokelists = await Promise.all(jokelistPromises);
      const randomJokes = jokelists[0];
      const topJokes = jokelists[1];
      const bottomJokes = jokelists[2];

      // TODO: Update localStorage with Lists

      this.setState({
        randomJokes,
        topJokes,
        bottomJokes,
        isLoading: false
      });
    }, 0);
  }

  // upvotes a specific joke
  upVote = async id => {
    await CheezApi.upVote(id);

    const jokelistPromises = [
      CheezApi.getJokes('top'),
      CheezApi.getJokes('bottom')
    ];

    // get all jokeLists and update State
    const jokelists = await Promise.all(jokelistPromises);
    const topJokes = jokelists[0];
    const bottomJokes = jokelists[1];

    this.setState(state => {
      // updates local vote for obj
      const newRandomJokes = state.randomJokes.map(jokeObj => {
        if (jokeObj.id === id) {
          const newJokeObj = { ...jokeObj, votes: jokeObj.votes + 1 };
          return newJokeObj;
        }
        return jokeObj;
      });

      // placeholder to add id to localStorage to prevent further voting

      // TODO: Update localStorage with Lists

      return {
        randomJokes: newRandomJokes,
        topJokes,
        bottomJokes,
        isLoading: false
      };
    });
  };

  // downvotes a specific joke
  downVote = async id => {
    // call api helper and decrement vote
    await CheezApi.downVote(id);

    const jokelistPromises = [
      CheezApi.getJokes('top'),
      CheezApi.getJokes('bottom')
    ];

    // get all jokeLists and update State
    const jokelists = await Promise.all(jokelistPromises);
    const topJokes = jokelists[0];
    const bottomJokes = jokelists[1];

    this.setState(state => {
      // updates local vote for obj
      const newRandomJokes = state.randomJokes.map(jokeObj => {
        if (jokeObj.id === id) {
          const newJokeObj = { ...jokeObj, votes: jokeObj.votes - 1 };
          return newJokeObj;
        }
        return jokeObj;
      });

      // placeholder to add id to localStorage to prevent further voting

      // TODO: Update localStorage with Lists

      return {
        randomJokes: newRandomJokes,
        topJokes,
        bottomJokes,
        isLoading: false
      };
    });
  };

  // gets new Jokes and updates all windows
  getNewJokes = async () => {
    // make api call to get new jokes
    const jokelistPromises = [
      CheezApi.getJokes('random'),
      CheezApi.getJokes('top'),
      CheezApi.getJokes('bottom')
    ];

    // get all jokeLists and update State
    const jokelists = await Promise.all(jokelistPromises);
    const randomJokes = jokelists[0];
    const topJokes = jokelists[1];
    const bottomJokes = jokelists[2];

    this.setState({
      randomJokes,
      topJokes,
      bottomJokes,
      isLoading: false
    });
  };

  render() {
    return (
      <GridWrapper>
        <AppContext.Provider
          value={{
            upVote: this.upVote,
            downVote: this.downVote
          }}
        >
          {this.state.isLoading ? (
            <IsLoading />
          ) : (
            <>
              <Titlebar />
              <RandomJokes
                getNewJokes={this.getNewJokes}
                jokes={this.state.randomJokes}
              />
              <TopJokes jokes={this.state.topJokes} />
              <BottomJokes jokes={this.state.bottomJokes} />
            </>
          )}
        </AppContext.Provider>
      </GridWrapper>
    );
  }
}

export default App;
