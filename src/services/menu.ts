import { supabase } from "../lib/supabase";

export type MenuDisponibilidade = {
  combos: Record<string, boolean>;
  sabores: Record<string, boolean>;
  refriLata: Record<string, boolean>;
  refri1l: Record<string, boolean>;
  maionese: boolean;
};

export async function getMenuConfig(): Promise<MenuDisponibilidade> {
  const { data, error } = await supabase
    .from("menu_config")
    .select("disponibilidade")
    .eq("id", 1)
    .single();

  if (error) throw new Error("Erro ao carregar configuração do menu");

  return data.disponibilidade as MenuDisponibilidade;
}

export async function updateMenuConfig(disponibilidade: MenuDisponibilidade): Promise<MenuDisponibilidade> {
  const { data, error } = await supabase
    .from("menu_config")
    .update({ disponibilidade })
    .eq("id", 1)
    .select("disponibilidade")
    .single();

  if (error) throw new Error(error.message || "Erro ao atualizar menu");

  return data.disponibilidade as MenuDisponibilidade;
}
