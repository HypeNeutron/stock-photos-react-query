import styled from 'styled-components';

export default function Error() {
  return (
    <Div>
      <p>
        We&#39;re sorry something wrong on server please try to check your
        connection and try again or report us
      </p>
    </Div>
  );
}

const Div = styled.div`
  p {
    max-width: 85vw;
    font-size: 2rem;
    text-align: center;
    margin: 1em auto;
  }
`;
