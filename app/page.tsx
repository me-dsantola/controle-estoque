'use client'

import { useState, useEffect } from 'react'
import { cadastrarProdutoServer, excluirProdutoServer } from './actions'
import { buscarProdutosService } from './services'

export default function ControleEstoque() {
  const [produtos, setProdutos] = useState<any[]>([])
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  async function carregarProdutos() {
    const dados = await buscarProdutosService()
    setProdutos(dados)
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  async function formAction(formData: FormData) {
    setErro('')
    setSucesso('')

    const response = await cadastrarProdutoServer(formData)

    if (response.erro) {
      setErro(response.erro)
    } else if (response.sucesso) {
      setSucesso(response.sucesso)
      carregarProdutos()
    }
  }

  async function handleDelete(id: string) {
    const response = await excluirProdutoServer(id)
    if (response.sucesso) {
      carregarProdutos()
    } else {
      alert(response.erro)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Controle de Estoque</h1>

      <form action={formAction} className="bg-white p-6 rounded shadow mb-8 max-w-xl">
        <h2 className="text-xl mb-4">Novo Produto</h2>
        {erro && <p className="text-red-500 mb-2">{erro}</p>}
        {sucesso && <p className="text-green-500 mb-2">{sucesso}</p>}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="border p-2 rounded" name="nome" placeholder="Nome" required />
          <input className="border p-2 rounded" name="categoria" placeholder="Categoria" required />
          <input className="border p-2 rounded" name="preco" type="number" step="0.01" placeholder="Preço (R$)" required />
          <input className="border p-2 rounded" name="quantidade" type="number" placeholder="Quantidade" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>

      <div className="bg-white rounded shadow max-w-4xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Produto</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Preço</th>
              <th className="p-4">Qtd.</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-4">{p.nome}</td>
                <td className="p-4">{p.categoria}</td>
                <td className="p-4">R$ {p.preco}</td>
                <td className={`p-4 font-bold ${p.quantidade < 5 ? 'text-red-600' : 'text-green-600'}`}>
                  {p.quantidade} {p.quantidade < 5 && '(Estoque Baixo)'}
                </td>
                <td className="p-4">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}