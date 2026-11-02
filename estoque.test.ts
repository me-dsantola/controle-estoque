import { describe, it, expect, vi } from 'vitest'
import { cadastrarProdutoServer, excluirProdutoServer } from './app/actions'

// Mock (simulação) do Supabase para o teste passar direto sem precisar de banco!
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      insert: () => Promise.resolve({ error: null }),
      delete: () => ({
        eq: () => Promise.resolve({ error: null })
      })
    })
  })
}))

describe('Fluxo de Cadastro de Produto', () => {
  it('Quando envio dados válidos, então o sistema deve gravar e retornar sucesso', async () => {
    const formData = new FormData()
    formData.append('nome', 'Produto Teste')
    formData.append('categoria', 'Teste')
    formData.append('preco', '10.50')
    formData.append('quantidade', '20')

    const resposta = await cadastrarProdutoServer(formData)
    expect(resposta.sucesso).toBe('Produto cadastrado com sucesso!')
  })

  it('Quando envio valores negativos, então deve recusar e retornar erro', async () => {
    const formData = new FormData()
    formData.append('nome', 'Produto Errado')
    formData.append('categoria', 'Teste')
    formData.append('preco', '-5')
    formData.append('quantidade', '-1')

    const resposta = await cadastrarProdutoServer(formData)
    expect(resposta.erro).toBe('Preço e quantidade não podem ser negativos.')
  })

  it('Quando envio o formulário com campos vazios, então deve bloquear', async () => {
    const formData = new FormData()
    const resposta = await cadastrarProdutoServer(formData)
    expect(resposta.erro).toBe('Preencha todos os campos.')
  })
})

describe('Fluxo de Exclusão de Produto', () => {
  it('Quando solicito a exclusão fornecendo o ID, então deve remover e retornar sucesso', async () => {
    const resposta = await excluirProdutoServer('id-ficticio-123')
    expect(resposta.sucesso).toBe('Produto excluído.')
  })
})