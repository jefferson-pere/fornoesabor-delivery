import { supabase } from "../lib/supabase";

export type StoreStatusType = {
  aberto: boolean;
  altaDemanda: boolean;
  mensagem: string;
};

export async function getStoreStatus(): Promise<StoreStatusType> {
  const { data, error } = await supabase
    .from("store_config")
    .select("aberto, altaDemanda, mensagem")
    .eq("id", 1)
    .single();

  if (error) throw new Error("Erro ao carregar status da loja");

  return {
    aberto: data.aberto,
    altaDemanda: data.altaDemanda,
    mensagem: data.mensagem,
  };
}

export async function updateStoreStatus(data: StoreStatusType): Promise<StoreStatusType> {
  const { data: updated, error } = await supabase
    .from("store_config")
    .update({
      aberto: data.aberto,
      altaDemanda: data.altaDemanda,
      mensagem: data.mensagem,
    })
    .eq("id", 1)
    .select("aberto, altaDemanda, mensagem")
    .single();

  if (error) throw new Error(error.message || "Erro ao atualizar status");

  return {
    aberto: updated.aberto,
    altaDemanda: updated.altaDemanda,
    mensagem: updated.mensagem,
  };
}
