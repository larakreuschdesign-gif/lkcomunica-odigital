# 🎨 UX/UI Guidelines - LK Proposals

Guia completo de design, padrões e melhores práticas para manter consistência visual.

## 📐 Design System

### Paleta de Cores

```
PRIMARY (Azul)
├─ #2563eb - Primary (botões, links, destaques)
├─ #1d4ed8 - Primary Dark (hover)
├─ #dbeafe - Primary Light (background)
└─ #f0f9ff - Primary Very Light (subtle backgrounds)

SECONDARY (Cinza)
├─ #6b7280 - Secondary (text muted)
├─ #d1d5db - Secondary Light (borders)
└─ #f3f4f6 - Secondary Very Light (backgrounds)

STATUS
├─ #16a34a - Success (verde)
├─ #dc2626 - Destructive (vermelho)
├─ #f59e0b - Warning (amarelo)
└─ #3b82f6 - Info (azul)

NEUTRAL
├─ #000000 - Black (text)
├─ #ffffff - White (backgrounds)
├─ #f5f5f5 - Gray 50
└─ #030712 - Foreground (text principal)
```

### Tipografia

```
Fonte: Inter (Google Fonts)

Escalas:
├─ xs: 12px / 16px (help text, labels)
├─ sm: 13px / 18px (secondary text)
├─ base: 14px / 20px (body text)
├─ lg: 16px / 24px (subheadings)
├─ xl: 20px / 28px (headings)
├─ 2xl: 24px / 32px (page titles)
├─ 3xl: 30px / 36px (hero titles)
└─ 4xl: 36px / 44px (landing page)

Pesos:
├─ 400 - Regular (body)
├─ 500 - Medium (labels, links)
├─ 600 - Semibold (subheadings)
└─ 700 - Bold (titles, alerts)
```

### Espaçamento

Sistema de 4px:

```
├─ xs: 2px (very small gaps)
├─ sm: 4px (small gaps)
├─ md: 8px (default gaps)
├─ lg: 12px (medium gaps)
├─ xl: 16px (large gaps)
├─ 2xl: 24px (bigger gaps)
├─ 3xl: 32px (large sections)
├─ 4xl: 48px (page sections)
└─ 5xl: 64px (hero sections)
```

### Raio de Borda

```
├─ none: 0px (sharp)
├─ sm: 2px (subtle)
├─ base: 4px (default)
├─ md: 8px (normal)
├─ lg: 12px (rounded)
└─ full: 9999px (pills, circles)
```

## 🎯 Componentes Principais

### Button

```typescript
// Variantes
<Button variant="default">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destruir</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grande</Button>
<Button size="icon">Ícone</Button>

// Estados
<Button disabled>Desabilitado</Button>
<Button isLoading>Carregando...</Button>
```

**Regras:**
- Botão primário em CTAs
- Botão outline para ações secundárias
- Botão ghost em menus/sidebars
- Sempre com gap-2 para ícones
- Mínimo 44px de altura (mobile accessibility)

### Input

```typescript
// Variações
<Input placeholder="Normal" />
<Input value="" disabled />
<Input type="email" />
<Input type="password" />
<Input type="number" />
<Input type="search" />
<Input type="date" />

// Com label
<div>
  <label className="text-sm font-medium">Email</label>
  <Input type="email" className="mt-1" />
</div>
```

**Regras:**
- Altura mínima 40px
- Padding 8px 12px
- Border color muda on focus
- Clearable icon para inputs com valor
- Error state: border red, message below

### Card

```typescript
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter>Rodapé</CardFooter>
</Card>
```

**Regras:**
- Shadow mínimo (sm)
- Hover: shadow-md
- Radius padrão 8px
- Padding padrão 24px
- Border 1px gray-200

### Modal/Dialog

```typescript
<Dialog>
  <DialogTrigger>Abrir</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
    <DialogFooter>
      <Button>Fechar</Button>
      <Button>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Regras:**
- Max width: 600px (desktop)
- Centered na tela
- Overlay escuro com 40% opacity
- Close button no canto superior direito
- Escape key fecha o modal

### Table

```typescript
<table>
  <thead>
    <tr className="border-b">
      <th>Coluna 1</th>
      <th>Coluna 2</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b hover:bg-muted">
      <td>Dado 1</td>
      <td>Dado 2</td>
    </tr>
  </tbody>
</table>
```

**Regras:**
- Hover: bg-muted
- Striped rows: alternativo (não recomendado)
- Sortable columns: ícone na header
- Responsive: scroll horizontal em mobile
- Sticky header em tabelas longas

## 📱 Layout Responsivo

### Breakpoints

```
xs: 320px   (mobile small)
sm: 640px   (mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (wide desktop)
2xl: 1536px (very wide)
```

### Grid Responsivo

```
Mobile (xs):     1 coluna
Tablet (md):     2 colunas
Desktop (lg):    3+ colunas

Exemplo:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Sidebar

```
Mobile:   Hamburger menu (collapse)
Tablet:   Sidebar colapsável
Desktop:  Sidebar sempre visível
```

## 🎨 Padrões de Design

### Card com Hover

```tsx
<Card className="hover:shadow-md transition-shadow cursor-pointer">
  {/* Conteúdo */}
</Card>
```

### Stats Card

```tsx
<Card>
  <CardContent className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Label</p>
        <p className="text-2xl font-bold text-foreground mt-2">Valor</p>
      </div>
      <Icon className="w-6 h-6 text-primary" />
    </div>
  </CardContent>
</Card>
```

### Form Layout

```tsx
<form className="space-y-4">
  <div>
    <label className="text-sm font-medium">Campo 1</label>
    <Input className="mt-1" />
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-medium">Campo 2</label>
      <Input className="mt-1" />
    </div>
    <div>
      <label className="text-sm font-medium">Campo 3</label>
      <Input className="mt-1" />
    </div>
  </div>
  <Button className="w-full">Enviar</Button>
</form>
```

### Empty State

```tsx
<div className="text-center py-12">
  <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
  <h3 className="text-lg font-semibold mb-2">Nenhum resultado</h3>
  <p className="text-muted-foreground mb-4">
    Comece criando seu primeiro item
  </p>
  <Button>Criar</Button>
</div>
```

### Alert/Notification

```tsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex gap-3">
    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
    <div>
      <p className="font-medium text-blue-900">Título</p>
      <p className="text-sm text-blue-800 mt-1">Mensagem</p>
    </div>
  </div>
</div>
```

### Loading State

```tsx
<div className="flex items-center justify-center py-8">
  <div className="animate-spin">
    <Loader className="w-6 h-6 text-primary" />
  </div>
</div>
```

## ♿ Acessibilidade

### Cores

- ✅ Contraste mínimo 4.5:1 para texto
- ✅ Não usar cor como único indicador (também usar ícone, texto)
- ✅ Testar com Colblind Vision

### Navegação

- ✅ Ordem de tab lógica
- ✅ Focus states visíveis (outline 2px)
- ✅ Breadcrumbs para navegação
- ✅ Skip link para conteúdo principal

### Textos

- ✅ Descrições em alt text para imagens
- ✅ Labels visíveis para inputs
- ✅ Instruções claras
- ✅ Erros descritivos

### Exemplo Acessível

```tsx
<div>
  <label htmlFor="email" className="text-sm font-medium">
    Email *
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-error"
    className="mt-1 w-full px-3 py-2 border border-input rounded-md"
  />
  {error && (
    <p id="email-error" className="text-xs text-destructive mt-1">
      Email inválido
    </p>
  )}
</div>
```

## 🚀 Performance

### Imagens

```tsx
// Optimizar imagens
<Image
  src="/image.jpg"
  alt="Descrição"
  width={400}
  height={300}
  priority={false}
  loading="lazy"
/>
```

### Code Splitting

```tsx
// Lazy load componentes pesados
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Carregando...</p>,
})
```

## 📊 Temas

### Light Mode (Padrão)

```
Background: #ffffff
Text: #030712
Borders: #e5e7eb
```

### Dark Mode (Futuro)

```
Background: #0f172a
Text: #f8fafc
Borders: #334155
```

## 🎬 Animações

### Transições Padrão

```css
/* 200ms ease-in-out para interações */
transition: background-color 200ms ease-in-out;
transition: color 200ms ease-in-out;
transition: border-color 200ms ease-in-out;

/* 300ms ease-in-out para modais/sidebars */
transition: transform 300ms ease-in-out;
transition: opacity 300ms ease-in-out;
```

### Easing Functions

```
ease-in-out:   padrão, uso geral
ease-in:       entradas (modais abrindo)
ease-out:      saídas (modais fechando)
linear:        raramente
```

### Durações

```
150ms:  hover effects
200ms:  button interactions
300ms:  transitions
500ms:  page transitions
```

## 📝 Exemplo de Página Completa

```tsx
export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Título</h1>
          <Button>Ação</Button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Métrica 1"
            value="1.234"
            icon={Icon1}
          />
          <StatsCard
            title="Métrica 2"
            value="5.678"
            icon={Icon2}
          />
          <StatsCard
            title="Métrica 3"
            value="90%"
            icon={Icon3}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Seção 1</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Conteúdo */}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Seção 2</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Conteúdo */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
```

## 📚 Referências

- [Shadcn/UI Docs](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Web Accessibility](https://www.w3.org/WAI/)
- [Material Design](https://material.io/design)

---

**Mantenha consistência visual em todo o sistema! 🎨**
