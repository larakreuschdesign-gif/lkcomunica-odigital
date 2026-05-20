'use client';

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  FileText,
  Eye,
  Download,
  MoreVertical,
  Filter,
  Search,
} from "lucide-react";

export default function PropostasPage() {
  const propostas = [
    {
      id: "1",
      numero: "PROP-001",
      cliente: "Tech Solutions Inc",
      projeto: "Estratégia Digital Completa",
      valor: 8_500,
      status: "enviada",
      data: "2024-05-20",
      visualizacoes: 2,
    },
    {
      id: "2",
      numero: "PROP-002",
      cliente: "E-commerce Plus",
      projeto: "Social Media Mensal",
      valor: 3_500,
      status: "aprovada",
      data: "2024-05-19",
      visualizacoes: 1,
    },
    {
      id: "3",
      numero: "PROP-003",
      cliente: "Startup Inovadora",
      projeto: "Branding Completo",
      valor: 5_200,
      status: "rascunho",
      data: "2024-05-18",
      visualizacoes: 0,
    },
  ];

  const statusColors: Record<string, { bg: string; text: string }> = {
    rascunho: { bg: "bg-slate-100", text: "text-slate-800" },
    enviada: { bg: "bg-blue-100", text: "text-blue-800" },
    visualizada: { bg: "bg-purple-100", text: "text-purple-800" },
    aprovada: { bg: "bg-green-100", text: "text-green-800" },
    recusada: { bg: "bg-red-100", text: "text-red-800" },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Propostas Comerciais"
        subtitle="Gerencie todas as suas propostas e orçamentos"
        action={{
          label: "+ Nova Proposta",
          href: "/propostas/nova",
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
                  placeholder="Buscar por cliente, projeto ou número..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Suas Propostas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Número
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Cliente
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Projeto
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                      Valor
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propostas.map((proposta) => {
                    const colors = statusColors[proposta.status];
                    return (
                      <tr
                        key={proposta.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">
                              {proposta.numero}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground">
                          {proposta.cliente}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {proposta.projeto}
                        </td>
                        <td className="py-4 px-4 text-right font-semibold text-foreground">
                          {formatCurrency(proposta.valor)}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${colors.bg} ${colors.text}`}
                          >
                            {proposta.status.charAt(0).toUpperCase() +
                              proposta.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
