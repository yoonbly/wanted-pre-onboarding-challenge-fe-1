import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./route/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList";
import store from "./redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import PageLayout from "./components/PageLayout";

const theme = createTheme({
  typography: {
    fontFamily: "S-CoreDream-3Light",
    fontSize: 16,
  },
});

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route element={<PageLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route
                  path="/todoList"
                  element={
                    <PrivateRoute>
                      <TodoList />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
