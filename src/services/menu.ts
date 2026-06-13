const API_URL = import.meta.env.VITE_API_URL;

export type MenuDisponibilidade = {
  combos: Record<string, boolean>;
  sabores: Record<string, boolean>;
  refriLata: Record<string, boolean>;
  refri1l: Record<string, boolean>;
  maionese: boolean;
};

export async function getMenuConfig(): Promise<MenuDisponibilidade> {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw new Error("Erro ao carregar configuração do menu");
  return res.json();
}

export async function updateMenuConfig(
  data: MenuDisponibilidade,
): Promise<MenuDisponibilidade> {
  const res = await fetch(`${API_URL}/menu`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Erro ao atualizar menu");
  return json;
}
