import styled from 'styled-components';

import Filter from './components/Filter';
import PhotoSection from './components/PhotoSection';
import Search from './components/Search';
import ToTopBtn from './components/ToTopBtn';
import { useGlobalContext } from './context';

function App() {
  const { query, handleFilter } = useGlobalContext();
  return (
    <>
      <Search />
      <MainWrapper query={query}>
        {query && <Filter {...{ query, handleFilter }} />}
        <PhotoSection />
      </MainWrapper>
      <ToTopBtn />
    </>
  );
}

const MainWrapper = styled.main<{ query: string }>`
  max-width: 1400px;
  margin: 0 auto;
  display: ${({ query }) => (query ? 'grid' : 'block')};
  grid-template: 1fr 20fr/1fr;

  @media screen and (min-width: 576px) {
    grid-template: ${({ query }) =>
      query ? '1fr/20% 80%' : '1fr/1fr 4fr 1fr'};
  }

  @media screen and (min-width: 1400px) {
    grid-template: 1fr/300px 1fr;
  }
`;

export default App;
