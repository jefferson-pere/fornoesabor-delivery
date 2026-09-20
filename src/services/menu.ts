import { supabase } from "../lib/supabase";
import { combosDisponiveis, saboresLista, saboresRefri } from "../data/menu";
import { getMenuResetDate } from "./menuResetDate";

export type MenuDisponibilidade = {
  combos: Record<string, boolean>;
  sabores: Record<string, boolean>;
  refriLata: Record<string, boolean>;
  refri1l: Record<string, boolean>;
  maionese: boolean;
  maioneseTemperada: boolean;
  maioneseBacon: boolean;
  ultimoReset?: string;
};

export function buildDefaultConfig(): MenuDisponibilidade {
  return {
    combos: Object.fromEntries(combosDisponiveis.map((c) => [String(c.id), true])),
    sabores: Object.fromEntries(saboresLista.map((s) => [s, true])),
    refriLata: Object.fromEntries(saboresRefri.lata.map((r) => [r, true])),
    refri1l: Object.fromEntries(saboresRefri["1l"].map((r) => [r, true])),
    maionese: true,
    maioneseTemperada: true,
    maioneseBacon: true,
    ultimoReset: getMenuResetDate(),
  };
}

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

export async function resetMenuConfig(): Promise<MenuDisponibilidade> {
  return updateMenuConfig(buildDefaultConfig());
}

export async function checkAndAutoReset(): Promise<void> {
  try {
    const config = await getMenuConfig();
    const today = getMenuResetDate();
    if (!config.ultimoReset || config.ultimoReset < today) {
      await resetMenuConfig();
    }
  } catch {
    // falha silenciosa para não bloquear o painel
  }
}
