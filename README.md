# 💡 Light Monitoration — Monitoramento Inteligente de Iluminação Pública

Sistema IoT desenvolvido para monitoramento e controle inteligente de iluminação pública, utilizando ESP32, sensores e um dashboard web.

O projeto tem como objetivo demonstrar uma solução capaz de monitorar postes de iluminação, identificar falhas e realizar o controle da intensidade luminosa de acordo com a presença de pessoas ou veículos.

> 🚧 Projeto acadêmico em desenvolvimento.

---

## 📌 Sobre o projeto

O **Light Monitoration** é uma solução de Internet das Coisas (IoT) voltada ao monitoramento de iluminação pública.

Cada poste monitorado possui um dispositivo baseado em **ESP32**, responsável por coletar informações dos sensores e enviar os dados para o sistema.

O sistema possui dois comportamentos principais:

- 💡 **Controle automático da iluminação:** quando não há movimento, a iluminação é reduzida para 50%. Quando o sensor detecta movimento, a iluminação aumenta para 100%.
- 🚨 **Monitoramento de falhas:** um botão físico será utilizado para simular uma falha no poste, permitindo testar o fluxo de identificação e registro de ocorrências no sistema.

As informações coletadas serão disponibilizadas em um **dashboard web**, permitindo visualizar o estado dos postes, suas localizações, ocorrências e informações de monitoramento.

---

## 🎯 Objetivos

### Objetivo geral

Desenvolver um protótipo de sistema IoT para monitoramento e controle inteligente da iluminação pública.

### Objetivos específicos

- Desenvolver um sistema embarcado utilizando ESP32;
- Detectar movimento utilizando sensor PIR;
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

## 🏗️ Arquitetura do projeto

A arquitetura planejada para o sistema é:

```text
                    ┌───────────────┐
                    │     ESP32     │
                    │               │
                    │ Sensor PIR    │
                    │ Botão         │
                    │ LED/Luminária │
                    └───────┬───────┘
                            │
                            │ MQTT
                            ▼
                    ┌───────────────┐
                    │ MQTT Broker   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    API C#     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  SQL Server   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Dashboard   │
                    │    React      │
                    └───────────────┘
