'use client';

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ChevronLeft,
  Save,
  FileText,
  AlertCircle,
  Zap,
  CheckCircle
} from "lucide-react";

// Estados do wizard
type Step = 'cliente' | 'servicos' | 'precificacao' | 'finalizacao';

export default function NovaPropostaPage() {
  const [currentStep, setCurrentStep] = useState<Step>('cliente');
  const [formData, setFormData] = useState({
    clienteId: '',
    nomeCliente: '',
    email: '',
    whatsapp: '',
    nomeProjeto: '',
    objetivo: '',
    descricaoEscopo: '',
    servicos: [] as any[],
    prazo: 30,
    urgencia: 'normal',
    condicoesPagamento: 'À vista',
  });

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'cliente', label: 'Cliente', icon: <FileText className="w-4 h-4" /> },
    { id: 'servicos', label: 'Serviços', icon: <Zap className="w-4 h-4" /> },
    { id: 'precificacao', label: 'Precificação', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'finalizacao', label: 'Finalizar', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const goNext = () => {
    const stepOrder: Step[] = ['cliente', 'servicos', 'precificacao', 'finalizacao'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    const stepOrder: Step[] = ['cliente', 'servicos', 'precificacao', 'finalizacao'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Nova Proposta Comercial"
        subtitle="Crie uma proposta profissional em poucos minutos"
      />

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                      currentStep === step.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {step.icon}
                  </button>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      currentStep !== step.id ? 'bg-muted' : 'bg-primary'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {steps.find(s => s.id === currentStep)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {currentStep === 'cliente' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Nome da Empresa *
                    </label>
                    <Input
                      name="nomeCliente"
                      value={formData.nomeCliente}
                      onChange={handleInputChange}
                      placeholder="Tech Solutions Inc"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contato@empresa.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    WhatsApp
                  </label>
                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Nome do Projeto *
                  </label>
                  <Input
                    name="nomeProjeto"
                    value={formData.nomeProjeto}
                    onChange={handleInputChange}
                    placeholder="Estratégia Digital Completa"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Objetivo do Cliente
                  </label>
                  <textarea
                    name="objetivo"
                    value={formData.objetivo}
                    onChange={handleInputChange}
                    placeholder="Descreva o objetivo principal deste projeto..."
                    className="mt-1 w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 'servicos' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecione os serviços que farão parte desta proposta
                </p>
                <div className="space-y-2">
                  {['Gestão de Instagram', 'Produção de Reels', 'Identidade Visual', 'Tráfego Pago'].map(service => (
                    <label key={service} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      <span className="text-sm font-medium text-foreground">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'precificacao' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Valor Mínimo</p>
                    <p className="text-2xl font-bold text-foreground">R$ 5.200</p>
                  </div>
                  <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                    <p className="text-xs text-muted-foreground mb-1">Valor Recomendado</p>
                    <p className="text-2xl font-bold text-primary">R$ 8.500</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Valor Premium</p>
                    <p className="text-2xl font-bold text-foreground">R$ 12.000</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-900">✓ Seu valor está na média de mercado</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Valor Total da Proposta</label>
                    <Input value="R$ 8.500" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Prazo (dias)</label>
                      <Input type="number" name="prazo" value={formData.prazo} onChange={handleInputChange} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Urgência</label>
                      <select name="urgencia" value={formData.urgencia} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-input rounded-md text-sm">
                        <option>Normal</option>
                        <option>Alta</option>
                        <option>Crítica</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-blue-900">💡 Sugestões de IA</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Este cliente é ideal para adicionar gestão de tráfego pago</li>
                    <li>• Seu valor está 12% abaixo da média para sua região</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 'finalizacao' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-green-900 mb-2">Proposta Pronta!</h3>
                  <p className="text-green-800">
                    Sua proposta está pronta para ser visualizada, compartilhada ou enviada
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Próximas ações:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Visualizar proposta em PDF</li>
                    <li>✓ Copiar link para compartilhamento</li>
                    <li>✓ Enviar por email</li>
                    <li>✓ Salvar como rascunho</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentStep === 'cliente'}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar Rascunho
            </Button>
            {currentStep !== 'finalizacao' && (
              <Button onClick={goNext}>
                Próximo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {currentStep === 'finalizacao' && (
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                Gerar PDF e Enviar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
