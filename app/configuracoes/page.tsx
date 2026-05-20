'use client';

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Configurações"
        subtitle="Personalize sua empresa e preferências do sistema"
      />

      <div className="p-6 space-y-6 max-w-4xl">
        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Nome da Empresa
                </label>
                <Input
                  defaultValue="LK Comunicação Digital"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  CNPJ
                </label>
                <Input defaultValue="00.000.000/0000-00" className="mt-2" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Email Corporativo
              </label>
              <Input
                defaultValue="contato@lkcomunicacao.com"
                type="email"
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Telefone
              </label>
              <Input defaultValue="(47) 3333-3333" className="mt-2" />
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Visual Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Identidade Visual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Cor Principal
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  defaultValue="#2563eb"
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <Input value="#2563eb" className="flex-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Logo
              </label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  Arraste sua logo aqui ou clique para selecionar
                </p>
              </div>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Integrações e APIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Chave OpenAI
              </label>
              <Input
                type="password"
                placeholder="sk-..."
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Para usar IA integrada em sugestões de preço e conteúdo
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Chave Email (Resend)
              </label>
              <Input
                type="password"
                placeholder="re_..."
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Para envio automático de propostas por email
              </p>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
