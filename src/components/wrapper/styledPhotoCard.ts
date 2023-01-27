import styled from 'styled-components';

const PhotoCard = styled.figure<{ isTouch: boolean }>`
  height: 17.5rem;
  position: relative;
  overflow: hidden;

  img,
  input[type='image'] {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    &:hover {
      cursor: pointer;
    }
  }

  /*=================
PhotoCard info part
=================*/
  .photo-info {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0.8em;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    display: flex;
    justify-content: space-between;
    transition: all 0.1s;
    align-items: center;

    .namePhoto {
      margin-bottom: 0.5rem;
    }

    .like-container {
      display: flex;
      align-items: center;
      margin-bottom: 0;
      .heartIcon {
        display: flex;
        color: #f44336;
      }
      .amLike {
        margin-left: 0.2em;
        margin-bottom: 0;
      }
    }

    img.profileImg {
      width: 2.5em;
      height: 2.5em;
      border-radius: 50%;
      transition: all 0.1s;
      &:hover {
        transform: scale(1.1);
      }
    }

    img.popping {
      animation: popping 0.8s;
    }

    @keyframes popping {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  @media screen and (min-width: 1280px) {
    &:hover .photo-info {
      transform: ${({ isTouch }) => (isTouch ? '' : 'translateY(0)')};
    }
    .photo-info {
      transform: ${({ isTouch }) => (isTouch ? '' : 'translateY(100%)')};
      transition: var(--transition);
    }
  }
`;
export default PhotoCard;
