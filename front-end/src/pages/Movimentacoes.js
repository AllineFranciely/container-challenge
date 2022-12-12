import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableMovimentacoes from '../components/TableMovimentacoes';

function Movimentacoes() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    tipo: 'Embarque',
    dataInicio: '',
    dataFim: '',
    container: 0,
  });
  const { tipo, dataInicio, dataFim, container } = state;

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    
    setState((prevSt) => ({
      ...prevSt,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state),
    };
    const data = await fetch('http://localhost:8000/movimentacoes', obj);
      return data;
  }

  return (
    <div>
      <p>Cadastrar nova movimentação</p>
      <form onSubmit={handleSubmit}>
        <select
          value={tipo}
          name="tipo"
          onChange={handleChange}
        >
          <option value="Embarque">Embarque</option>
          <option value="Descarga">Descarga</option>
          <option value="Gate in">Gate in</option>
          <option value="Gate out">Gate out</option>
          <option value="Reposicionamento">Reposicionamento</option>
          <option value="Pesagem">Pesagem</option>
          <option value="Scanner">Scanner</option>
        </select>
        <input
          type="text"
          name="dataInicio"
          value={dataInicio}
          onChange={handleChange}
          placeholder="Data da inicio"
        />
        <input
          type="text"
          name="dataFim"
          value={dataFim}
          onChange={handleChange}
          placeholder="Data de fim"
        />
        <input
          type="number"
          name="container"
          value={container}
          onChange={handleChange}
          placeholder="ID do container"
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
        >
          Salvar
        </button>
      </form>
      <TableMovimentacoes />
      <button
      type="button"
      onClick={() => navigate('/')}>
        Continers
      </button>
    </div >
  );
}

export default Movimentacoes;
