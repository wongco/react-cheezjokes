import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';

const JokeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  border: 1px solid black;
`;

const JokeTextContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid blue; */
  width: 70%;
  /* flex-basis: 4 4 100%; */
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  /* border: 1px solid orange; */
  width: 150px;
  /* flex-basis: 1 1 100%; */
`;

const Joke = props => {
  const { id, joketext, votes } = props;

  return (
    <AppContext.Consumer>
      {({ upVote, downVote }) => {
        return (
          <JokeContainer key={id}>
            <JokeTextContainer>{joketext}</JokeTextContainer>
            <VoteContainer>
              <div>{`Vote Total: ${votes}`}</div>
              <FontAwesomeIcon
                onClick={() => upVote(id)}
                icon={faThumbsUp}
                style={{ color: 'orange' }}
              />
              <FontAwesomeIcon
                onClick={() => downVote(id)}
                icon={faThumbsDown}
                style={{ color: 'red' }}
              />
            </VoteContainer>
          </JokeContainer>
        );
      }}
    </AppContext.Consumer>
  );
};

Joke.defaultProps = {
  id: '1123abc',
  joketext: 'This is the best joke ever',
  votes: 100
};

export default Joke;
