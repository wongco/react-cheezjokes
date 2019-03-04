import React from 'react';
import styled from 'styled-components';
import GridChild from './Common/GridChild';
import Joke from './Joke';

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 1em;
`;

const RandomJokes = props => {
  return (
    <GridChild gridArea="main">
      <QuestionsContainer>
        <h1>Random Jokes</h1>
        {props.jokes.map(jokeObj => {
          const { id, joketext, votes } = jokeObj;
          return <Joke key={id} id={id} joketext={joketext} votes={votes} />;
        })}
      </QuestionsContainer>
    </GridChild>
  );
};

RandomJokes.defaultProps = {
  jokes: [
    {
      id: 'Cd2gFdFQKuc',
      joketext: "Child: Dad, make me a sandwich. Dad: Poof! You're a sandwich.",
      votes: 0
    }
  ],
  getNewJokes: () => console.log('Getting new Jokes!')
};

export default RandomJokes;
