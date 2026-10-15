# 💡 Light Monitoration — Monitoramento Inteligente de Iluminação Pública

Sistema IoT desenvolvido para monitoramento e controle inteligente de iluminação pública, utilizando ESP32, sensores e um dashboard web.

O projeto tem como objetivo demonstrar uma solução capaz de monitorar postes de iluminação, identificar falhas e controlar a intensidade luminosa de acordo com a presença de pessoas ou veículos.

> 🚧 Projeto acadêmico em desenvolvimento.

---

## 📌 Sobre o projeto

O **Light Monitoration** é uma solução de Internet das Coisas (IoT) voltada ao monitoramento de iluminação pública.

Cada poste monitorado contará com um dispositivo baseado em **ESP32**, responsável por coletar informações dos sensores e enviar os dados para o sistema.

O sistema possui dois comportamentos principais:

- 💡 **Controle automático da iluminação:** quando não há movimento, a intensidade da iluminação é reduzida para 50%. Quando o sensor detecta movimento, a intensidade aumenta para 100%.
- 🚨 **Monitoramento de falhas:** um botão físico será utilizado para simular uma falha no poste, permitindo testar a identificação e o registro de ocorrências.

As informações coletadas serão disponibilizadas em um **dashboard web**, permitindo visualizar o estado dos postes, suas localizações e as ocorrências registradas.

---

## 🎯 Objetivos

### Objetivo geral

Desenvolver um protótipo de sistema IoT para monitoramento e controle inteligente da iluminação pública.

### Objetivos específicos

- Desenvolver um sistema embarcado utilizando ESP32;
- Detectar movimento utilizando um sensor PIR;
- Controlar a intensidade de uma luminária de acordo com a presença detectada;
- Reduzir a intensidade da iluminação para 50% quando não houver movimento;
- Aumentar a intensidade para 100% quando houver movimento;
- Simular falhas utilizando um botão físico;
- Registrar ocorrências de falha;
- Desenvolver um dashboard para acompanhamento dos postes;
- Armazenar os dados coletados;
- Permitir a visualização do status dos postes;
- Demonstrar a comunicação entre dispositivo IoT, backend, banco de dados e aplicação web.

---

## 🏗️ Arquitetura planejada

A arquitetura prevista para o sistema é:

```text
             ┌─────────────────┐
             │      ESP32      │
             │                 │
             │ Sensor PIR      │
             │ Botão            │
             │ LED/Luminária   │
             └────────┬────────┘
                      │
                      │ MQTT
                      ▼
             ┌─────────────────┐
             │   MQTT Broker   │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │     API C#      │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │   SQL Server    │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │    Dashboard    │
             │      React      │
             └─────────────────┘
```

*Observação: a arquitetura representa o planejamento do projeto e poderá sofrer alterações durante o desenvolvimento.*

---

## 🛠️ Tecnologias previstas

- **Hardware:** ESP32;
- **Sensores:** sensor de movimento PIR e botão físico para simulação de falhas;
- **Frontend:** React, JavaScript, HTML e CSS;
- **Backend:** API em C#;
- **Banco de dados:** SQL Server;
- **Comunicação IoT:** MQTT.

> As tecnologias de backend, banco de dados e comunicação representam a arquitetura planejada e poderão ser ajustadas conforme a implementação.

---

## 📊 Dashboard

O dashboard web tem como finalidade apresentar informações sobre o funcionamento dos postes monitorados, incluindo:

- Quantidade de postes monitorados;
- Quantidade de postes operacionais;
- Quantidade de postes com falha;
- Listagem e identificação dos postes;
- Visualização de ocorrências;
- Gráficos para acompanhamento dos dados.

---

## 🚀 Como executar o frontend

### Pré-requisitos

- Node.js instalado;
- npm instalado;
- Git instalado, caso deseje clonar o repositório.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/GiovannaPadilha/lightmonitoration.git
```

Entre na pasta do frontend:

```bash
cd lightmonitoration/frontend/dashboard
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse o endereço local exibido no terminal, geralmente `http://localhost:5173/`.

---

## 📌 Status do desenvolvimento

- [x] Criação inicial do frontend com