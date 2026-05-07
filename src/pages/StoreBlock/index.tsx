type Props = {
  mensagem: string;
  tipo: "fechado" | "demanda";
};

export function StoreBlock({ mensagem, tipo }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#111",
        color: "#fff",
        padding: 20,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "#1f1f1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 42,
          marginBottom: 24,
        }}
      >
        {tipo === "fechado" ? "🚫" : "⚠️"}
      </div>

      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {tipo === "fechado" ? "Loja Fechada" : "Alta Demanda"}
      </h1>

      <p
        style={{
          opacity: 0.8,
          fontSize: 18,
          lineHeight: 1.6,
          maxWidth: 500,
        }}
      >
        {mensagem || "Voltaremos em breve"}
      </p>
    </div>
  );
}
