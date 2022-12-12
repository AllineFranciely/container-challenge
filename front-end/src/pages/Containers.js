import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableContainer from '../components/TableContainers';

function Containers() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    cliente: '',
    numero: '',
    tipo: 20,
    situacao: 'Cheio',
    categoria: 'Importação',
  });

  const { cliente, numero, tipo, situacao, categoria } = state;

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
    const data = await fetch('http://localhost:8000/containers', obj);
    return data;
  }

  return (
    <div>
      <p>Cadastrar novo container</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cliente"
          value={cliente}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numero"
          value={numero}
          onChange={handleChange}
        />
        <select
          value={tipo}
          name="tipo"
          onChange={handleChange}
        >
          <option value="20">20</option>
          <option value="40">40</option>
        </select>
        <select
          value={situacao}
          name="situacao"
          onChange={handleChange}
        >
          <option value="Cheio">Cheio</option>
          <option value="Vazio">Vazio</option>
        </select>
        <select
          value={categoria}
          name="categoria"
          onChange={handleChange}
        >
          <option value="Importação">Importação</option>
          <option value="Exportação">Exportação</option>
        </select>
        <button
        type="submit"
        onSubmit={handleSubmit}>
          Salvar
        </button>
      </form>
      <TableContainer />
      <button
      type="button"
      onClick={ () => navigate('/movimentacoes')}>
        Movimentações
      </button>
    </div>
  )
}

export default Containers();
