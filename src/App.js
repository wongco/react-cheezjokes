import React, { Component } from 'react';
import styled from 'styled-components';
import TopQuestions from './Components/TopQuestions';
import BottomQuestions from './Components/BottomQuestions';
import RandomQuestions from './Components/RandomQuestions';
import Titlebar from './Components/Header';

const GridWrapper = styled.div`
  display: grid;
  grid-template: 10vh 45vh 45vh / 70vw 30vw;
  grid-template-areas:
    'titlebar titlebar'
    'main top'
    'main bottom';
`;

class App extends Component {
  state = {
    randomQuestions: [],
    topQuestions: [],
    bottomQuestions: []
  };

  render() {
    return (
      <GridWrapper>
        <Titlebar />
        <RandomQuestions />
        <TopQuestions />
        <BottomQuestions />
      </GridWrapper>
    );
  }
}

export default App;
