import "./App.css";
import { StyledEngineProvider } from "@mui/material";
import AppRouter from "./ROUTER/AppRouter";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst={true}>
        <AppRouter />
      </StyledEngineProvider>
    </>
  );
}

export default App;
