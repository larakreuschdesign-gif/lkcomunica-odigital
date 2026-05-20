'use client';

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  Mail,
  MessageCircle,
  Globe,
  MoreVertical,
  Filter,
  Search,
} from "lucide-react";

export default function ClientesPage() {
  const clientes = [
    {
      id: "1",
      nome: "Tech Solutions Inc",
      responsavel: "João Silva",
      email: "joao@techsolutions.com",
      whatsapp: "(11) 99999-9999",
      website: "techsolutions.com",
      cidade: "São Paulo",
      estado: "SP",
      propostas: 3,
      valor_total: 18_200,
    },
    {
      id: "2",
      nome: "E-commerce Plus",
      responsavel: "Maria Santos",
      email: "maria@ecommerce.com",
      whatsapp: "(21) 88888-8888",
      website: "ecommerceplus.com.br",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      propostas: 2,
      valor_total: 8_700,
    },
    {
      id: "3",
      nome: "Startup Inovadora",
      responsavel: "Carlos Costa",
      email: "carlos@startup.com",
      whatsapp: "(47) 77777-7777",
      website: "startupinov.com",
      cidade: "Blumenau",
      estado: "SC",
      propostas: 1,
      valor_total: 5_200,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Clientes"
        subtitle="Gerencie seu portfólio de clientes e histórico de propostas"
        action={{
          label: "+ Novo Cliente",
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
                  placeholder="Buscar por nome, email ou cidade..."
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

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientes.map((cliente) => (
            <Card
              key={cliente.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {cliente.nome}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cliente.responsavel}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cliente.cidade}, {cliente.estado}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={`mailto:${cliente.email}`}
                      className="text-primary hover:underline text-xs flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                    <a
                      href={`https://wa.me/${cliente.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </a>
                    {cliente.website && (
                      <a
                        href={`https://${cliente.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs flex items-center gap-1"
                      >
                        <Globe className="w-3 h-3" />
                        Website
                      </a>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {cliente.propostas}
                        </p>
                        <p className="text-xs text-muted-foreground">Propostas</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(cliente.valor_total)}
                        </p>
                        <p className="text-xs text-muted-foreground">Total</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <MoreVertical className="w-4 h-4 mr-2" />
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
