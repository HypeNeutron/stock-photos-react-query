import styled from 'styled-components';

const Modal = styled.div<{ isModalOpen: boolean }>`
  display: ${({ isModalOpen }) => (isModalOpen ? 'grid' : 'none')};
  place-content: center;
  padding: 2% 0;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: rgba(0, 0, 0, 0.9); */
  &:hover {
    cursor: default;
  }

  .bg {
    position: fixed;
    z-index: 49;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.9);
  }

  /* Modal Content (image) */
  .modalImg {
    margin: auto;
    display: block;
    width: 90%;
    z-index: 50;
    max-width: 90vw;
    max-height: 95vh;
    &:hover {
      cursor: default;
    }
  }

  @media only screen and (max-width: 700px) {
    .modalImg {
      width: 90%;
    }
  }

  /* Caption of Modal Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    z-index: 50;
    padding: 10px 0;
    height: 1vh;
    &:hover {
      cursor: auto;
    }
  }

  /**---- Animation----*/
  .modalImg,
  #caption {
    animation: zoom 0.8s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /**---- The Close Button----*/
  .close {
    position: absolute;
    z-index: 51;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
`;
export default Modal;
