# 🏃‍♀️원티드 프리온보딩 챌린지 1월 사전과제
## 👀프로젝트 소개
`로그인, 회원가입이 가능한 TodoApp`
### 1. 사용 언어 및 라이브러리
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black">  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Typescript&logoColor=black">  <img src="https://img.shields.io/badge/MUI-007FFF?style=flat&logo=MUI&logoColor=black">   
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=black">   <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=ReactQuery&logoColor=black">   

### 2. 기능 설명 => 🔨1차 리팩토링 => ⚒️ 2차 리팩토링
- 로그인
  - 이메일 및 비밀번호 유효성 확인하여 메시지 출력
  - 로그인 성공 시 홈화면으로 이동  => ⚒️ redux-toolkit으로 로그인 상태 관리 : Header, Home에서 사용
  - 로그인 실패 시 alert창으로 에러메세지 출력 => 🔨 axios error type 변경
- 회원가입
  - 이메일 및 비밀번호, 비밀번호 확인 유효성 확인하여 메시지 출력
  - 이미 가입된 유저일 경우 alert창으로 메시지 출력 => 🔨 axios error type 변경
- TodoList
  - TodoList조회 => 🔨 React query를 이용해 서버상태관리 
  - Todo 추가 및 수정 기능(모달창으로 구현) => 🔨 React query mutation을 이용해 처리 => ⚒️ redux-toolkit으로 추가 및 수정, id값 관리
  - 삭제 즉시 반영 => 🔨 confirm창으로 확인 후 삭제
- ⚒️ UI
  - Header, Footer, Main Layout 구현
  - 모바일 우선, 반응형 구현
### 3. 시연 영상
<img src="https://user-images.githubusercontent.com/81467705/212958051-11385eb5-46d5-47c1-ace4-fe85f14fcb2d.gif">

### 4. 실행 방법
서버
``` 
1. 디렉토리 이동 api
2. yarn start
```
프론트
```
1. 디렉토리 이동 fe
2. npm i 
3. npm start
```
## 🔨1차 리팩토링
1. axios error type 변경   
`why?` axios error타입이 unknown으로 나와 있어서, 타입을 지정해줘야하는데 뭔가 찝찝했다.
- 기존    
```
  class CustomError_Class extends Error {
  response?: {
    data: any;
  };
  
  catch (err: unknown) {
    if (err instanceof CustomError_Class) {
      alert(err?.response?.data.details);
      
```
- 변경 : 따로 class나 interface를 지정하지 않고 error타입인걸 명시하고, response가 있을때 error 메세지를 띄우도록 했다.
```
  catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.details);
    }
  }
```
2. React query를 이용해 서버상태관리   
`why?` React query를 사용하지 않고 api통신으로만 Todo CRUD를 구현했었다.   
useEffect의 dependency array안에 todos 배열을 넣어줬었는데, network를 까보니 서버와 계속 통신을 하고 있었다.   
dependency array안에 reference type을 넣어줄 경우, 값이 같더라도 매번 새로운 reference를 가져서 계속 실행되고 있었던것..   
그래서 다시 원시타입으로 바꿔주고, 수정과 삭제 로직도 state값으로 관리했더니 props가 너무 많아지고, 복잡해보였다.   
결국 전역상태로 Todo를 관리하기로 결정했고, react query를 적용해보기로 했다.   
- 변경 : useQuery를 이용해서 get을하고, Invalidate Queries(쿼리 무효화)를 이용해서 초기화시켜주는 방식으로 mutation을 시켜줬다.
```
// TodoCreate.tsx
	const queryClient = useQueryClient();

  const addMutation = useMutation((data: Data) => createTodo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const editMutation = useMutation((data: Data) => updateTodo(data, id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const onCreateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addMutation.mutate(data);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  const onUpdateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      editMutation.mutate(data);
      setIsEdit(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };
```
```
// TodoList.tsx
	const { data } = useQuery("todos", getTodo);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const onDeleteHandler = (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };
```
3. 삭제 클릭 시 한번 확인받기
`why`강의 때 삭제나 무언가를 파괴하는 행위는 한번 더 확인을 거쳐야한다고 하셔서, 삭제 버튼 클릭 시 confirm창으로 한번 확인 후 삭제 처리하도록 했다.
## ⚒️2차 리팩토링
1. redux-toolkit으로 로그인 상태 관리   
`why?`redux-toolkit을 처음 배우는터라, 연습 삼아 작성해보았다.   
사실 localStorage에서 토큰을 받아와 확인해도 되는 부분인데, 굳이 구현할 필요가 있을까..? 싶은 생각이 들었다.  
코드 보기 : [05b140f](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api/commit/05b140f6f6d5c464310c0932e107a97a0e2aa909)
2. redux-toolkit으로 추가 및 수정, id값 관리   
`why?`추가, 수정 모드와 id값은 TodoList컴포넌트에서 TodoCreate컴포넌트 props로 내려주고 있는 부분인데, 두 컴포넌트 모두 사용하고 있어서 전역상태관리가 필요했다.   
- 코드
```
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todosReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

```
```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isEdit: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    editMode(state) {
      state.isEdit = true;
    },
    addMode(state) {
      state.isEdit = false;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { editMode, addMode, setId } = todoSlice.actions;
export default todoSlice.reducer;
```
3. UI 구현   
`why?`기능구현에만 초점을 둬서 UI의 완성도가 떨어졌었다.   
우선 헤더, 푸터, 메인으로 감싸주는 레이아웃을 설정해주었다.
내용이 많지 않아 모바일에 적합하다고 생각했기에, 모바일 우선으로 디자인을 했고 반응형으로 구현했다.   
코드 보기 : [a7ca9ec](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api/commit/a7ca9ec5d7b79fd7b4a912ba35278dce055bd888)
## ✍️개발 일지
👉[개발 일지 보러가기](https://surgedev.notion.site/1-940b36989e8f411fa57c09f6cb69479b)
## 👩‍💻작성자 소개
👉[포트폴리오 보러가기](https://www.notion.so/surgedev/b37ace1e2bab4d328e1ab9bbba944c34)
