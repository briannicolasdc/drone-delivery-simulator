import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const FormContainer = styled.div`
  background-color: #2b2d31;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 300px;
  color: #e0e0e0;
`;

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 0.9em;
  color: #aaa;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #383a40;
  color: white;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #383a40;
  color: white;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  text-align: center;
  color: ${(props) => (props.$error ? '#ef4444' : '#22c55e')};
`;

const BackLink = styled.a`
  color: #61dafb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BackLinkContainer = styled.div`
  margin-top: 20px;
`;

export default function OrdersPage() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [peso, setPeso] = useState(1);
  const [prioridade, setPrioridade] = useState('media');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const order = await api.createOrder({
        x: Number(x),
        y: Number(y),
        peso: Number(peso),
        prioridade
      });
      setMsg(`Pedido criado: ${order.id}`);
    } catch (err) {
      setMsg('Erro ao criar pedido');
      console.error(err);
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <Title>Criar Pedido</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Coordenada X:</Label>
            <Input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Coordenada Y:</Label>
            <Input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Peso (kg):</Label>
            <Input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Prioridade:</Label>
            <Select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </Select>
          </FormGroup>
          <SubmitButton type="submit">Enviar Pedido</SubmitButton>
        </Form>
        {msg && <Message $error={msg.includes('Erro')}>{msg}</Message>}
      </FormContainer>
      <BackLinkContainer>
        <BackLink href="/dashboard">Voltar para Dashboard</BackLink>
      </BackLinkContainer>
    </PageContainer>
  );
}
