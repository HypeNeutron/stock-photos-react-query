import { useEffect, useMemo, useRef } from 'react';
import { IconContext } from 'react-icons';
import { IoCaretUpOutline } from 'react-icons/io5';
import styled from 'styled-components';

export default function ToTopBtn() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let toTopClassList: DOMTokenList;
    if (btnRef.current) toTopClassList = btnRef.current.classList;

    const scroll = () => {
      if (toTopClassList) {
        if (window.pageYOffset > 200) {
          if (!toTopClassList.contains('btnEntrance') && btnRef.current) {
            toTopClassList.add('btnEntrance');
            toTopClassList.remove('btnExit');
            btnRef.current.style.display = 'block';
          }
        } else if (toTopClassList.contains('btnEntrance')) {
          toTopClassList.remove('btnEntrance');
          toTopClassList.add('btnExit');
          setTimeout(() => {
            if (btnRef.current) btnRef.current.style.display = 'none';
          }, 250);
        }
      }
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  const returnValue = useMemo(() => ({ className: 'iconTop' }), []);

  return (
    <Wrapper>
      <IconContext.Provider value={returnValue}>
        <button
          onClick={scrollToTop}
          type="button"
          onKeyDown={scrollToTop}
          ref={btnRef}
          className="toTop btnExit"
        >
          <IoCaretUpOutline size="3em" />
        </button>
      </IconContext.Provider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  font-size: 2.2rem;
  width: 1.5em;
  height: 1.5em;
  bottom: 1em;
  right: 0.5em;
  z-index: 99;

  button.toTop {
    display: none;
    cursor: pointer;
    margin-left: auto;
    width: 100%;
    height: 100%;
    color: #303e4b;
    border-radius: 50%;
    border: 4px solid #303e4b;
    transition: background-color, color 0.2s ease-in-out;
    &:hover,
    &:focus {
      background-color: #303e4b;
      color: #fff;
    }
    svg.iconTop {
      position: absolute;
      top: 0em;
      left: 1.5px;
    }
  }

  button.btnEntrance {
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: btnEntrance;
  }

  button.btnExit {
    animation-duration: 0.25s;
    animation-fill-mode: both;
    animation-name: btnExit;
  }

  /* fadeInUp */
  @keyframes btnEntrance {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  /* fadeOutDown */
  @keyframes btnExit {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }
`;
