import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: #2b2d31;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.$bgColor || '#4b5563'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function Header({ onRefresh, onRecalculate }) {
  const location = useLocation();
  const isDashboard =
    location.pathname === '/dashboard' || location.pathname === '/';

  return (
    <HeaderContainer>
      {/* Actions - Only visible on Dashboard/Home if handlers are provided */}
      {isDashboard && onRefresh && (
        <StyledButton onClick={onRefresh}>Atualizar</StyledButton>
      )}
      {isDashboard && onRecalculate && (
        <StyledButton onClick={onRecalculate}>Recalcular Rota</StyledButton>
      )}

      {/* Navigation */}
      <StyledLink to="/">
        <StyledButton $bgColor="#3b82f6">Fazer Pedido</StyledButton>
      </StyledLink>
      <StyledLink to="/dashboard">
        <StyledButton $bgColor="#10b981">Dashboard</StyledButton>
      </StyledLink>
      <StyledLink to="/status">
        <StyledButton $bgColor="#8b5cf6">Ver Status</StyledButton>
      </StyledLink>
    </HeaderContainer>
  );
}
