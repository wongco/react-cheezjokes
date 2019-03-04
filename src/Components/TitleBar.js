import React from 'react';
import styled from 'styled-components';
import GridChild from './Common/GridChild';

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 400%;
`;

const StyledButton = styled.button`
  height: 80px;
  width: 150px;
  font-size: 0.25em;
  font-weight: 600;
  border-radius: 5px;
  margin: 0 5em;
  transition: background-color 1s ease, color 1s ease;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const Titlebar = props => {
  return (
    <GridChild gridArea="titlebar">
      <StyledHeaderContainer>
        <h1>CheeZJokes</h1>
        <StyledButton onClick={props.getNewJokes}>Get New Jokes</StyledButton>
      </StyledHeaderContainer>
    </GridChild>
  );
};

export default Titlebar;
