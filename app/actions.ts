'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Carregamos a chave secreta que só existe no lado do servidor
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Este cliente tem privilégios administrativos para gravar no banco de forma segura
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function cadastrarProdutoServer(formData: FormData) {
  const nome = formData.get('nome') as string
  const categoria = formData.get('categoria') as string
  const preco = Number(formData.get('preco'))
  const quantidade = Number(formData.get('quantidade'))

  // 1. O SERVIDOR recalcula e valida tudo, ignorando o cliente
  if (!nome || !categoria || !preco || !quantidade) {
    return { erro: 'Preencha todos os campos.' }
  }
  if (preco < 0 || quantidade < 0) {
    return { erro: 'Preço e quantidade não podem ser negativos.' }
  }

  // 2. O SERVIDOR grava no banco usando a chave secreta (passando pelo bloqueio RLS)
  const { error } = await supabaseAdmin.from('produtos').insert([
    { nome, categoria, preco, quantidade }
  ])

  if (error) return { erro: 'Erro ao cadastrar produto no servidor.' }
  return { sucesso: 'Produto cadastrado com sucesso!' }
}

export async function excluirProdutoServer(id: string) {
  const { error } = await supabaseAdmin.from('produtos').delete().eq('id', id)
  if (error) return { erro: 'Erro ao excluir produto.' }
  return { sucesso: 'Produto excluído.' }
}