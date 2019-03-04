import React, { Component } from 'react';
import styled from 'styled-components';
import TopJokes from './Components/TopJokes';
import BottomJokes from './Components/BottomJokes';
import RandomJokes from './Components/RandomJokes';
import Titlebar from './Components/TitleBar';
import CheezApi from './Helpers/CheezApi';

const GridWrapper = styled.div`
  display: grid;
  grid-template: 150px 25% 50% / 50vw 50vw;
  grid-template-areas:
    'titlebar titlebar'
    'main top'
    'main bottom';
`;

const IsLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: red;
`;

// create Context to Tunnel voteHandlers to Jokes
export const AppContext = React.createContext();
class App extends Component {
  state = {
    votedJokes: new Set(),
    isLoading: true,
    randomJokes: [],
    topJokes: [],
    bottomJokes: []
  };

  componentDidMount() {
    // else pull from API
    setTimeout(async () => {
      // extract jokes that have been votedOn
      const votedJokes = new Set(
        JSON.parse(localStorage.getItem('votedJokes'))
      );

      // extract jokeLists if they exist
      let randomJokes = JSON.parse(localStorage.getItem('randomJokes'));
      let topJokes = JSON.parse(localStorage.getItem('topJokes'));
      let bottomJokes = JSON.parse(localStorage.getItem('bottomJokes'));

      // if jokeLists don't exist in localStorage, pull from API
      if (!randomJokes) {
        const jokelistPromises = [
          CheezApi.getJokes('random'),
          CheezApi.getJokes('top'),
          CheezApi.getJokes('bottom')
        ];

        // get all jokeLists and update State
        const jokelists = await Promise.all(jokelistPromises);
        randomJokes = jokelists[0];
        topJokes = jokelists[1];
        bottomJokes = jokelists[2];
      }

      this.setState(
        {
          votedJokes,
          randomJokes,
          topJokes,
          bottomJokes,
          isLoading: false
        },
        () => {
          this.saveStateToLocalStorage();
        }
      );
    }, 0);
  }

  // adds or deletes a vote for a specific joke
  vote = async (id, direction) => {
    let updatedJokeData;
    if (direction === 'up') {
      updatedJokeData = await CheezApi.upVote(id);
    } else {
      updatedJokeData = await CheezApi.downVote(id);
    }

    const jokelistPromises = [
      CheezApi.getJokes('top'),
      CheezApi.getJokes('bottom')
    ];

    // get all jokeLists and update State
    const jokelists = await Promise.all(jokelistPromises);
    const topJokes = jokelists[0];
    const bottomJokes = jokelists[1];

    this.setState(
      state => {
        // updates local vote for obj
        const newRandomJokes = state.randomJokes.map(jokeObj => {
          if (jokeObj.id === id) {
            const newJokeObj = {
              ...jokeObj,
              votes: updatedJokeData.votes
            };
            return newJokeObj;
          }
          return jokeObj;
        });

        // add voted items to LocalStorage
        const votedJokes = new Set(
          JSON.parse(localStorage.getItem('votedJokes'))
        );
        if (votedJokes.size > 0) {
          votedJokes.add(id);
          localStorage.setItem(
            'votedJokes',
            JSON.stringify(Array.from(votedJokes))
          );
        } else {
          localStorage.setItem('votedJokes', JSON.stringify([id]));
        }

        // TODO: Update localStorage with Lists

        return {
          votedJokes,
          randomJokes: newRandomJokes,
          topJokes,
          bottomJokes,
          isLoading: false
        };
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  // upvotes a specific joke
  upVote = async id => this.vote(id, 'up');

  // downvotes a specific joke
  downVote = async id => this.vote(id, 'down');

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

    this.setState(
      {
        randomJokes,
        topJokes,
        bottomJokes,
        isLoading: false
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  // save jokeLists to localStorage to cache
  saveStateToLocalStorage = () => {
    const { randomJokes, topJokes, bottomJokes } = this.state;
    localStorage.setItem('randomJokes', JSON.stringify(randomJokes));
    localStorage.setItem('topJokes', JSON.stringify(topJokes));
    localStorage.setItem('bottomJokes', JSON.stringify(bottomJokes));
  };

  render() {
    return (
      <GridWrapper>
        <AppContext.Provider
          value={{
            ...this.state,
            upVote: this.upVote,
            downVote: this.downVote
          }}
        >
          {this.state.isLoading ? (
            <IsLoading />
          ) : (
            <>
              <Titlebar getNewJokes={this.getNewJokes} />
              <RandomJokes jokes={this.state.randomJokes} />
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
