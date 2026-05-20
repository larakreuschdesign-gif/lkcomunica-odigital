'use client';

import Link from "next/link";
import {
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
  Plus,
  Copy,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  // Mock data - será substituído por dados reais
  const stats = {
    totalRevenue: 125_400,
    propostalCount: 23,
    clientCount: 18,
    conversionRate: 68,
    averageTicket: 5_452,
  };

  const recentProposals = [
    {
      id: "1",
      clientName: "Tech Solutions Inc",
      projectName: "Estratégia Digital Completa",
      value: 8_500,
      status: "enviada",
      date: "2024-05-20",
    },
    {
      id: "2",
      clientName: "E-commerce Plus",
      projectName: "Social Media Mensal",
      value: 3_500,
      status: "aprovada",
      date: "2024-05-19",
    },
    {
      id: "3",
      clientName: "Startup Inovadora",
      projectName: "Branding Completo",
      value: 5_200,
      status: "rascunho",
      date: "2024-05-18",
    },
  ];

  const statusColor: Record<string, string> = {
    rascunho: "bg-slate-100 text-slate-800",
    enviada: "bg-blue-100 text-blue-800",
    visualizada: "bg-purple-100 text-purple-800",
    aprovada: "bg-green-100 text-green-800",
    recusada: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Dashboard"
        subtitle="Bem-vindo! Aqui está um resumo do seu desempenho"
        action={{
          label: "+ Nova Proposta",
          href: "/propostas/nova",
        }}
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard
            title="Receita Total (Mês)"
            value={formatCurrency(stats.totalRevenue)}
            icon={TrendingUp}
            trend={{ value: 24, direction: "up" }}
          />
          <StatsCard
            title="Propostas Criadas"
            value={stats.propostalCount}
            icon={FileText}
            description="Este mês"
          />
          <StatsCard
            title="Clientes Ativos"
            value={stats.clientCount}
            icon={Users}
          />
          <StatsCard
            title="Taxa de Conversão"
            value={`${stats.conversionRate}%`}
            icon={BarChart3}
            trend={{ value: 12, direction: "up" }}
          />
          <StatsCard
            title="Ticket Médio"
            value={formatCurrency(stats.averageTicket)}
            icon={TrendingUp}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Proposals */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Propostas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProposals.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhuma proposta criada ainda</p>
                      <Link href="/propostas/nova" className="text-primary hover:underline mt-2 inline-block">
                        Criar primeira proposta →
                      </Link>
                    </div>
                  ) : (
                    recentProposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {proposal.clientName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {proposal.projectName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(proposal.date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              {formatCurrency(proposal.value)}
                            </p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                statusColor[proposal.status]
                              }`}
                            >
                              {proposal.status.charAt(0).toUpperCase() +
                                proposal.status.slice(1)}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/propostas/nova">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Proposta
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/clientes">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Cliente
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/propostas">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicar Proposta
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximas Ações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium text-foreground">
                        Follow-up em 2 dias
                      </p>
                      <p className="text-muted-foreground">Tech Solutions Inc</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                    <div>
                      <p className="font-medium text-foreground">
                        Proposta expira em 5 dias
                      </p>
                      <p className="text-muted-foreground">E-commerce Plus</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Aumente suas conversões com IA
                </h3>
                <p className="opacity-90">
                  Use sugestões inteligentes de preço e conteúdo para fechar mais
                  vendas
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/propostas/nova">Começar →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
