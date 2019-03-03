import styled from 'styled-components';

const GridChild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: ${props => props.gridArea};
`;

export default GridChild;
