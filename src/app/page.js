'use client'

import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import TabDocumentos from '@/components/TabDocumentos'
import TabPerguntas from '@/components/TabPerguntas'
import TabTopicos from '@/components/TabTopicos'

export default function Home() {
  const [solicitacaoId, setSolicitacaoId] = useState('')

  const handleSearch = () => {
    // Aqui você implementará a lógica de busca
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Campo de busca */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="ID da Solicitação"
            value={solicitacaoId}
            onChange={(e) => setSolicitacaoId(e.target.value)}
            className="flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Abas usando Radix UI */}
      <Tabs.Root defaultValue="documentos" className="flex flex-col w-full">
        <Tabs.List className="flex border-b border-gray-200" aria-label="Seções do processo">
          <Tabs.Trigger
            value="documentos"
            className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Documentos
          </Tabs.Trigger>
          <Tabs.Trigger
            value="perguntas"
            className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Perguntas e Respostas
          </Tabs.Trigger>
          <Tabs.Trigger
            value="topicos"
            className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Tópicos da Petição
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="documentos" className="py-6">
          <TabDocumentos solicitacaoId={solicitacaoId} />
        </Tabs.Content>

        <Tabs.Content value="perguntas" className="py-6">
          <TabPerguntas solicitacaoId={solicitacaoId} />
        </Tabs.Content>

        <Tabs.Content value="topicos" className="py-6">
          <TabTopicos solicitacaoId={solicitacaoId} />
        </Tabs.Content>
      </Tabs.Root>
    </main>
  )
}
