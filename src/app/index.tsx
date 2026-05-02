import { Outlet } from "react-router-dom";
import { Container } from "./styles";
import { Header } from "../components/Layout/header";
import { Footer } from "../components/Layout/footer";

export function App() {
  return (
    <Container>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </Container>
  );
}
