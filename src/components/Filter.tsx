import styled from 'styled-components';

export default function Filter({
  query,
  handleFilter,
}: {
  query: string;
  handleFilter: (value: string, type: string) => void;
}) {
  return (
    <FilterSection query={query}>
      <div className="filter-container">
        <select
          name="orderBy"
          onChange={(e) => handleFilter(e.target.value, 'orderBy')}
        >
          <option value="relevant">relevant</option>
          <option value="latest">latest</option>
        </select>
        <select
          name="color"
          onChange={(e) => handleFilter(e.target.value, 'color')}
        >
          <option value="">color</option>
          <option value="black_and_white">black_and_white</option>
          <option value="black">black</option>
          <option value="white">white</option>
          <option value="yellow">yellow</option>
          <option value="orange">orange</option>
          <option value="red">red</option>
          <option value="purple">purple</option>
          <option value="magenta">magenta</option>
          <option value="green">green</option>
          <option value="teal">teal</option>
          <option value="blue">blue</option>
        </select>
        <select
          name="orientation"
          onChange={(e) => handleFilter(e.target.value, 'orientation')}
        >
          <option value="">orientation</option>
          <option value="landscape">landscape</option>
          <option value="portrait">portrait</option>
          <option value="squarish">squarish</option>
        </select>
      </div>
    </FilterSection>
  );
}

const FilterSection = styled.section<{ query: string }>`
  max-width: 100%;
  padding: 3em 0;
  .filter-container {
    position: sticky;
    top: 40px;
    display: ${({ query }) => (query ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    select {
      width: 17em;
      height: 2em;
      background-color: transparent;
      border: 1px solid grey;
      border-radius: 5px;
      margin-bottom: 1em;
    }
  }

  @media screen and (min-width: 576px) {
    margin: 0 auto;
    padding: 4em 0;
    width: 100%;
    max-width: 90%;
    .filter-container {
    }
    select {
      max-width: 90%;
    }
  }
`;
