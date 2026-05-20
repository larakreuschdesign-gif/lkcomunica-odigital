import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, BarChart3, Lock, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 px-12">
        <div className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-foreground">LK Proposals</span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-foreground hover:text-primary transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Começar Grátis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Propostas Comerciais em{" "}
            <span className="text-primary">Segundos</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistema inteligente e automático para gerar orçamentos profissionais,
            propostas comerciais e simulações de preço com precisão de mercado
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/cadastro"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Iniciar Agora <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#demo"
              className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Ver Demo
            </Link>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              ⚡ Rápido e Intuitivo
            </h3>
            <p className="text-muted-foreground">
              Crie propostas profissionais em menos de 5 minutos com nossa
              interface intuitiva e autocompletamento inteligente
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              🎯 Precificação Inteligente
            </h3>
            <p className="text-muted-foreground">
              Sistema automático calcula preços baseado em média de mercado,
              complexidade e região do cliente
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Recursos Poderosos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-primary" />,
                title: "Dashboard Completo",
                description:
                  "Visualize métricas em tempo real, propostas enviadas, aprovadas e receita total",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-primary" />,
                title: "IA Integrada",
                description:
                  "Sugestões inteligentes de preço, conteúdo e estratégias comerciais",
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Automações",
                description:
                  "Envio automático de emails, follow-up inteligente e versionamento",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-primary" />,
                title: "Templates Profissionais",
                description:
                  "Modelos prontos para todos os tipos de serviços e nichos",
              },
              {
                icon: <Lock className="w-8 h-8 text-primary" />,
                title: "Segurança em Primeiro Lugar",
                description:
                  "Autenticação segura, encriptação de dados e backup automático",
              },
              {
                icon: <ArrowRight className="w-8 h-8 text-primary" />,
                title: "Integrações",
                description:
                  "Email, WhatsApp, PDF digital e mais integrações em breve",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-slate-50 rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Planos Simples e Transparentes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Iniciante",
                price: "Grátis",
                features: [
                  "Até 10 propostas/mês",
                  "1 usuário",
                  "Dashboard básico",
                  "Suporte por email",
                ],
              },
              {
                name: "Profissional",
                price: "R$ 99",
                period: "/mês",
                highlighted: true,
                features: [
                  "Propostas ilimitadas",
                  "3 usuários",
                  "IA integrada",
                  "Templates avançados",
                  "Suporte prioritário",
                  "Automações",
                ],
              },
              {
                name: "Empresa",
                price: "R$ 299",
                period: "/mês",
                features: [
                  "Tudo do Profissional",
                  "Usuários ilimitados",
                  "Integrações customizadas",
                  "White-label",
                  "Suporte 24/7",
                  "Analytics avançado",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg border transition-all ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 scale-105 shadow-lg"
                    : "border-border bg-white"
                } p-8`}
              >
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-slate-100 text-foreground hover:bg-slate-200"
                  }`}
                >
                  Escolher Plano
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para aumentar suas conversões?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Comece grátis. Sem cartão de crédito. Sem compromisso.
          </p>
          <Link
            href="/cadastro"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Criar Conta Grátis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-8 text-center text-muted-foreground">
        <p>© 2024 LK Comunicação Digital. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
