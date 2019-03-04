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
  padding: 1em;
  margin: 0.5em;
  border-radius: 15px;
  border: 1px solid black;
  width: 80%;
  box-shadow: 0px 2px 10px gray;
`;

const JokeTextContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0;
  padding: 1em;
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 150px;
`;

const StyledFai = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;

const Joke = props => {
  const { id, joketext, votes } = props;

  return (
    <AppContext.Consumer>
      {({ upVote, downVote, votedJokes }) => {
        return (
          <JokeContainer key={id}>
            <JokeTextContainer>{joketext}</JokeTextContainer>
            <VoteContainer>
              <div>{`Vote Total: ${votes}`}</div>
              {!votedJokes.has(id) && (
                <>
                  <StyledFai
                    onClick={() => upVote(id)}
                    icon={faThumbsUp}
                    style={{ color: 'orange' }}
                  />
                  <StyledFai
                    onClick={() => downVote(id)}
                    icon={faThumbsDown}
                    style={{ color: 'red' }}
                  />
                </>
              )}
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
