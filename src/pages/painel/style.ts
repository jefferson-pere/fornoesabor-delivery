import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #ececec;
  padding: 20px;
  transition: background 0.25s;

  body.painel-dark & {
    background: #0f172a;
  }

  .topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;

    & > div:first-child,
    .top-actions {
      flex: 1;
    }

    .topo-center {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
      color: #111;
      margin-bottom: 6px;
      body.painel-dark & { color: #f8fafc; }
    }

    p {
      color: #666;
      font-size: 15px;
      body.painel-dark & { color: #94a3b8; }
    }
  }
.top-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}
//
.login-screen{
display:flex;
align-items:center;
justify-content:center;
padding:20px;
}

.login-card{
width:100%;
max-width:420px;
background:#fff;
border-radius:28px;
padding:40px 30px;
box-shadow:0 20px 60px rgba(0,0,0,.25);
display:flex;
flex-direction:column;
align-items:center;
gap:18px;
}

.login-card .icon{
width:80px;
height:80px;
border-radius:50%;
background:#f3f4f6;
display:flex;
align-items:center;
justify-content:center;
font-size:36px;
}

.login-card h2{
font-size:30px;
font-weight:800;
color:#111827;
margin:0;
}

.login-card p{
font-size:15px;
color:#6b7280;
margin:0;
text-align:center;
}

.input-group{
width:100%;
}

.input-group input{
width:100%;
height:55px;
border:none;
outline:none;
border-radius:16px;
background:#f3f4f6;
padding:0 18px;
font-size:16px;
transition:.2s;
}

.input-group input:focus{
background:#fff;
box-shadow:0 0 0 3px rgba(249,115,22,.2);
border:1px solid #fb923c;
}

.login-btn{
width:100%;
height:55px;
border:none;
border-radius:16px;
background:linear-gradient(135deg,#f97316,#ea580c);
color:#fff;
font-size:16px;
font-weight:700;
cursor:pointer;
transition:.2s;
}

.login-btn:hover{
transform:translateY(-2px);
opacity:.95;
}
//
.new-order {
  height: 42px;

  padding: 0 18px;

  border: 0;

  border-radius: 12px;

  background: #2563eb;

  color: white;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.new-order:hover {
  background: #1d4ed8;
}
  .more-menu-wrapper {
    position: relative;
  }

  .more-menu-btn {
    height: 42px;
    padding: 0 18px;
    border: none;
    border-radius: 12px;
    background: #fff;
    color: #111;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);

    &:hover {
      background: #111;
      color: #fff;
    }

    body.painel-dark & {
      background: #1e293b;
      color: #f8fafc;
      box-shadow: none;
      &:hover { background: #334155; }
    }
  }

  .more-menu-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.14);
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 180px;
    z-index: 100;
    animation: fadeDown 0.15s ease;

    body.painel-dark & {
      background: #1e293b;
      box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    }

    button {
      height: 42px;
      padding: 0 16px;
      border: none;
      border-radius: 10px;
      background: transparent;
      color: #111;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      text-align: left;
      transition: 0.15s;

      &:hover {
        background: #f3f4f6;
      }

      body.painel-dark & {
        color: #f8fafc;
        &:hover { background: #334155; }
      }
    }

    .menu-divider {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 4px 0;

      body.painel-dark & { border-color: #334155; }
    }

    .logout-menu {
      color: #dc2626 !important;

      &:hover { background: #fee2e2 !important; }

      body.painel-dark & {
        color: #f87171 !important;
        &:hover { background: #2d1515 !important; }
      }
    }
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .grid {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 20px;

    align-items: flex-start;
  }
  .logout {
    height: 48px;

    padding: 0 20px;

    border: none;

    border-radius: 14px;

    background: #dc2626;

    color: #fff;

    font-weight: 700;

    cursor: pointer;

    transition: 0.2s;
  }

  .logout:hover {
    opacity: 0.92;

    transform: translateY(-2px);
  }
  /* LOGIN */
  .login {
    width: 100%;

    max-width: 420px;

    margin: 80px auto;

    background: #fff;

    border-radius: 24px;

    padding: 40px;

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

    display: flex;

    flex-direction: column;

    gap: 20px;

    text-align: center;

    h2 {
      font-size: 28px;

      color: #111;

      font-weight: 700;
    }

    button {
      height: 52px;

      border: none;

      border-radius: 14px;

      background: #111;

      color: #fff;

      font-size: 16px;

      font-weight: bold;

      cursor: pointer;

      transition: 0.2s;
    }

    button:hover {
      opacity: 0.92;

      transform: translateY(-2px);
    }
  }

  /* SCROLL */
  ::-webkit-scrollbar {
    width: 8px;

    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cfcfcf;

    border-radius: 999px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* RESPONSIVO */
  @media (max-width: 1200px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    padding: 14px;

    .grid {
      grid-template-columns: 1fr;
    }

    .topo {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;

      h1 {
        font-size: 22px;
      }

      p {
        font-size: 13px;
      }
    }

    .top-actions {
      flex-wrap: wrap;
      gap: 8px;

      button {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 13px;
        padding: 0 12px;
      }
    }

    .new-order {
      height: 40px;
    }

    .more-menu-btn {
      height: 40px;
    }

    .logout {
      height: 40px;
      width: 100%;
    }

    .login {
      padding: 24px;
      border-radius: 18px;

      h2 {
        font-size: 22px;
      }
    }
  }
`;
