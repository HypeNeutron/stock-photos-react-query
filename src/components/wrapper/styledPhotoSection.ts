import styled from 'styled-components';

const PhotoSectionWrapper = styled.section<{ query: string }>`
  width: 100%;
  margin: 0 auto;
  padding: ${({ query }) => (query ? '0' : '4em 0')};

  .photos-container {
    margin: 0 auto;
    width: 92%;
    max-width: 1170px;
    display: grid;
    gap: 2em;
  }

  .notMatching {
    max-width: 85vw;
    font-size: 2rem;
    text-align: center;
    margin: 1em auto;
  }

  .loading {
    margin-top: 30px;
    text-align: center;
  }

  @media screen and (min-width: 576px) {
    padding: ${({ query }) => (query ? '4em 0' : '4em')};
    .photos-container {
      grid-template-columns: repeat(auto-fill, minmax(359px, 1fr));
    }
  }
`;
export default PhotoSectionWrapper;
