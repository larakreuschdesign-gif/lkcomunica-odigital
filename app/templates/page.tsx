'use client';

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Trash2, Plus } from "lucide-react";

export default function TemplatesPage() {
  const templates = [
    {
      id: "1",
      nome: "Social Media Mensal",
      descricao: "Proposta padrão para gestão mensal de redes sociais",
      categoria: "Social Media",
      usos: 12,
    },
    {
      id: "2",
      nome: "Branding Completo",
      descricao: "Pacote completo de identidade visual e branding",
      categoria: "Branding",
      usos: 8,
    },
    {
      id: "3",
      nome: "Produção de Vídeo",
      descricao: "Serviço de produção e edição de vídeos profissionais",
      categoria: "Vídeo",
      usos: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Templates de Propostas"
        subtitle="Crie e gerencie templates para agilizar a criação de propostas"
        action={{
          label: "+ Novo Template",
        }}
      />

      <div className="p-6 space-y-6">
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {template.nome}
                    </h3>
                    <p className="text-xs text-primary mt-1">
                      {template.categoria}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {template.descricao}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Usado {template.usos} vezes
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="w-4 h-4 mr-1" />
                      Usar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
