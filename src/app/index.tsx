import { Outlet } from "react-router-dom";
import { Container } from "./styles";

export function App() {
  return (
    <Container>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
