import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

import { useGlobalContext } from '../context';

export default function Search() {
  const { query, isError, handleAutoSearch, handleSearchEnter } =
    useGlobalContext();
  return (
    <SearchSectionWrapper query={query}>
      <form
        className="search-form"
        id="search-form"
        onSubmit={handleSearchEnter}
      >
        <input
          type="text"
          name="search"
          placeholder="search"
          onChange={handleAutoSearch}
          className="search-form__searchInput"
          disabled={isError}
        />
        <button
          type="submit"
          className="search-form__searchBtn"
          disabled={isError}
        >
          <FaSearch />
        </button>
      </form>
    </SearchSectionWrapper>
  );
}

const SearchSectionWrapper = styled.section<{ query: string }>`
  padding-top: 5em;
  width: 80vw;
  max-width: var(--max-width);
  margin: 0 auto;

  .search-form {
    display: flex;
    @media screen and (min-width: 576px) {
      max-width: 620px;
      margin: 0 auto;
    }

    @media screen and (min-width: 960px) {
      margin: ${({ query }) => (query ? '0 auto' : 0)};
    }

    &__searchInput,
    &__searchBtn {
      color: var(--clr-grey-5);
      font-size: 1.4rem;
      letter-spacing: 0.1em;
      text-transform: capitalize;
      background: transparent;
      padding: 0.75em 1.25em;
      border: none;
      border-bottom: 3px solid var(--clr-grey-5);
    }

    &__searchInput {
      width: 100%;
      color: var(--clr-grey-3);
      &::placeholder {
        color: var(--clr-grey-5);
      }
      &:focus {
        outline: 0;
      }
    }

    &__searchBtn {
      &:hover {
        cursor: pointer;
        color: var(--clr-grey-4);
      }
      &:active {
        font-size: 1.35rem;
      }
    }
  }
`;
