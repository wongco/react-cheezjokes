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

const TopJokes = props => {
  return (
    <GridChild gridArea="bottom">
      <QuestionsContainer>
        <h1>Unpopular Jokes</h1>
        {props.jokes.reverse().map(jokeObj => {
          const { id, joketext, votes, upVote, downVote } = jokeObj;
          return (
            <Joke
              key={id}
              id={id}
              joketext={joketext}
              votes={votes}
              upVote={upVote}
              downVote={downVote}
            />
          );
        })}
      </QuestionsContainer>
    </GridChild>
  );
};

export default TopJokes;
