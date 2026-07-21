import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { supabase } from "../../lib/supabase";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%);
    top: -120px;
    right: -120px;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
    bottom: -100px;
    left: -80px;
    pointer-events: none;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.4s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 36px 24px;
    border-radius: 22px;
  }
`;

const IconWrap = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316, #ea580c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.4);
`;

const Brand = styled.p`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #f97316;
  margin: 0 0 8px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 32px;
  text-align: center;
  line-height: 1.5;
`;

const InputWrap = styled.div<{ $shake: boolean }>`
  width: 100%;
  position: relative;
  margin-bottom: 12px;
  animation: ${({ $shake }) => ($shake ? shake : "none")} 0.4s ease;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 54px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 0 18px;
  font-size: 16px;
  color: #fff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  letter-spacing: 2px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
    letter-spacing: 0;
  }

  &:focus {
    border-color: #f97316;
    background: rgba(249, 115, 22, 0.07);
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.18);
  }
`;

const ErrorMsg = styled.p`
  font-size: 13px;
  color: #f87171;
  margin: 0 0 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &::before {
    content: "✕";
    font-size: 11px;
    background: rgba(248, 113, 113, 0.2);
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.35);
  margin-top: 4px;
  letter-spacing: 0.3px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(249, 115, 22, 0.45);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Footer = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.2);
  margin: 28px 0 0;
  text-align: center;
`;

export function PasswordGuard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (authenticated === null) return null;
  if (authenticated) return <Outlet />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (authError) {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 450);
    }
  }

  return (
    <Page>
      <Card>
        <IconWrap>🍕</IconWrap>
        <Brand>Forno e Sabor</Brand>
        <Title>Área Restrita</Title>
        <Subtitle>
          Somente colaboradores autorizados
          <br />
          podem acessar este painel.
        </Subtitle>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <InputWrap $shake={false}>
            <InputLabel>E-mail</InputLabel>
            <Input
              type="email"
              placeholder="admin@email.com"
              value={email}
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
            />
          </InputWrap>

          <InputWrap $shake={shaking}>
            <InputLabel>Senha de acesso</InputLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />
          </InputWrap>

          {error && <ErrorMsg>E-mail ou senha incorretos. Tente novamente.</ErrorMsg>}

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar no painel"}
          </Button>
        </form>

        <Footer>Sessão gerenciada com segurança</Footer>
      </Card>
    </Page>
  );
}
