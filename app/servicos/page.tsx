'use client';

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Edit, Trash2, Filter, Search, Plus } from "lucide-react";

export default function ServicosPage() {
  const servicos = [
    {
      id: "1",
      nome: "Gestão de Instagram Mensal",
      categoria: "Social Media",
      valor_ideal: 1500,
      valor_minimo: 1200,
      valor_premium: 2000,
      complexidade: "média",
      tempo_medio: 40,
    },
    {
      id: "2",
      nome: "Identidade Visual Completa",
      categoria: "Branding",
      valor_ideal: 3500,
      valor_minimo: 2800,
      valor_premium: 5000,
      complexidade: "alta",
      tempo_medio: 80,
    },
    {
      id: "3",
      nome: "Produção de Vídeo Profissional",
      categoria: "Vídeo",
      valor_ideal: 2000,
      valor_minimo: 1500,
      valor_premium: 3500,
      complexidade: "alta",
      tempo_medio: 60,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Biblioteca de Serviços"
        subtitle="Gerencie sua biblioteca de serviços e precificação padrão"
        action={{
          label: "+ Novo Serviço",
        }}
      />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar serviços..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Serviços Cadastrados</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Serviço
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Categoria
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Mínimo
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Ideal
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Premium
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Complexidade
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {servicos.map((servico) => (
                    <tr
                      key={servico.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-4 px-4 font-medium text-foreground">
                        {servico.nome}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {servico.categoria}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">
                        {formatCurrency(servico.valor_minimo)}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">
                        {formatCurrency(servico.valor_ideal)}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">
                        {formatCurrency(servico.valor_premium)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">
                          {servico.complexidade}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
