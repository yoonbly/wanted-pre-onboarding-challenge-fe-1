import styled from "@emotion/styled";

const TodoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  border-bottom: 1px solid gray;
  padding: 10px;
`;

const HomeText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  animation: slideInFromBottom 1s ease-in-out;
  @keyframes slideInFromBottom {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

const FormBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const TodoListBox = styled.div`
  margin-top: 10px;
`;

export { TodoBox, HomeText, FormBox, TodoListBox };
