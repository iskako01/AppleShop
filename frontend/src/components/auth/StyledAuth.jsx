import styled from "styled-components";

export const StyledLogout = styled.div`
  color: #fff;
  cursor: pointer;
`;

export const StyledLogin = styled.div`
  a {
    &:last-child {
      margin-left: 20px;
    }
    color: #fff;
  }
 
`;

export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 20px auto;

  h2 {
    margin-bottom: 10px;
  }

  button,
  input {
    height: 35px;
    width: 100%;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 10px;

    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }
  button {
    cursor: pointer;
    border: none;
  }

  p {
    color: red;
  }
`;
