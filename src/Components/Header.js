import React from 'react';
import styled from 'styled-components';
import GridChild from './Common/GridChild';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 400%;
`;

const Titlebar = props => {
  return (
    <GridChild gridArea="titlebar">
      <StyledHeader>CheeZJokes</StyledHeader>
    </GridChild>
  );
};

export default Titlebar;
