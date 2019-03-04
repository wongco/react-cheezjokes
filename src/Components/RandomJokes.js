import React from 'react';
import styled from 'styled-components';
import GridChild from './Common/GridChild';
import CheezApi from '../Helpers/CheezApi';
import Joke from './Joke';

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const StyledButton = styled.button`
  height: 80px;
  width: 150px;
  /* background-color: orange; */
`;

const StyledTitle = styled.h1`
  display: flex;
`;

const RandomJokes = props => {
  return (
    <GridChild gridArea="main">
      <QuestionsContainer>
        <StyledButton onClick={props.getNewJokes}>Get New Jokes</StyledButton>
        <StyledTitle>Random Jokes</StyledTitle>
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
    },
    {
      id: 'ClGY8xc2EBd',
      joketext: 'Why are graveyards so noisy? Because of all the coffin.',
      votes: 0
    },
    {
      id: 'CtWgqjbMeib',
      joketext: 'What kind of bagel can fly? A plain bagel.',
      votes: 0
    },
    {
      id: 'D5E6USfNmb',
      joketext: 'How many apples grow on a tree? All of them!',
      votes: 0
    },
    {
      id: 'D5wAA5o4TCd',
      joketext: 'What do you call a careful wolf? Aware wolf.',
      votes: 0
    },
    {
      id: 'DAskq4oWSvc',
      joketext:
        'I was just looking at my ceiling. Not sure if it’s the best ceiling in the world, but it’s definitely up there.',
      votes: 0
    },
    {
      id: 'DIeFtkVvHlb',
      joketext:
        "Why do valley girls hang out in odd numbered groups? Because they can't even.",
      votes: 0
    },
    {
      id: 'DIeaUDlbUDd',
      joketext: '“My Dog has no nose.” “How does he smell?” “Awful”',
      votes: 0
    },
    {
      id: 'DImrciqWSCd',
      joketext: 'What do you call a cow with no legs? Ground beef.',
      votes: 0
    },
    {
      id: 'DY8UvkqHexc',
      joketext:
        "Why did the half blind man fall in the well? Because he couldn't see that well!",
      votes: 0
    },
    {
      id: 'DYLukyIY8Ed',
      joketext:
        'As I suspected, someone has been adding soil to my garden. The plot thickens.',
      votes: 0
    },
    {
      id: 'Dt4hNJJmykb',
      joketext:
        'It’s hard to explain puns to kleptomaniacs, because they take everything literally.',
      votes: 0
    },
    {
      id: 'DtWSnydN7h',
      joketext:
        "It's difficult to say what my wife does, she sells sea shells by the sea shore.",
      votes: 0
    },
    {
      id: 'DtcaMmWDImb',
      joketext:
        'Why did Dracula lie in the wrong coffin? He made a grave mistake.',
      votes: 0
    },
    {
      id: 'EBAsPfiNuzd',
      joketext: 'What did one plate say to the other plate? Dinner is on me!',
      votes: 0
    },
    {
      id: 'EBQfiyXD5ob',
      joketext:
        'what do you call a dog that can do magic tricks? a labracadabrador',
      votes: 0
    },
    {
      id: 'EIJmGY8Etrc',
      joketext:
        "Doctor: Do you want to hear the good news or the bad news?\r\nPatient: Good news please.\r\nDoctor: we're naming a disease after you.",
      votes: 0
    },
    {
      id: 'EQKZDIeah',
      joketext: 'Atheism is a non-prophet organisation.',
      votes: 0
    },
    {
      id: 'EdpjyXSfNCd',
      joketext: 'What do you call a monkey in a mine field? A babooooom!\n',
      votes: 0
    },
    {
      id: 'ElbaF6wHlyd',
      joketext:
        'I cut my finger cutting cheese. I know it may be a cheesy story but I feel grate now.',
      votes: 0
    }
  ],
  getNewJokes: () => console.log('Getting new Jokes!')
};

export default RandomJokes;
