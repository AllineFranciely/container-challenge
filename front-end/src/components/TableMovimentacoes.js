import React, { useState, useEffect } from 'react';
import { getMovimentacoes } from '../helpers/api';

function TableMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [filterByTipo, setFilterByTipo] = useState('');

  async function getAllMovimentacoes() {
    const allMovimentacoes = await getMovimentacoes();
    setMovimentacoes(allMovimentacoes)
  }

  useEffect(() => {
    getAllMovimentacoes();
  }, []);

  function handleDelete(id) {
    fetch('http://localhost:8000/movimentacoes/' + id, {
      method: 'DELETE',
      header: {
        'Accpet': 'application/json',
        'Content-type': 'application/json'
      }
    })
  }

  return (
    <div>
      <p>Buscar</p>
      <input
        type="text"
        className="search"
        placegolder="Pesquiser por tipo de movimentação"
        onChange={(event) => setFilterByTipo(event.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Movimentação ID</th>
            <th>Tipo de movimentação</th>
            <th>Data de início</th>
            <th>Data de fim</th>
            <th>Container ID</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes && movimentacoes.filter((filterMovimentacao) => filterMovimentacao.tipo
            .includes(filterByTipo))
            .map((movimentacao) => (
              <tr>
                <td>{movimentacao.id}</td>
                <td>{movimentacao.tipo}</td>
                <td>{movimentacao.dataInicio}</td>
                <td>{movimentacao.dataFim}</td>
                <td>{movimentacao.container}</td>
                <td>
                  <buttonn
                    type="button"
                    onClick={() => handleDelete(movimentacao.id)}
                  >
                    Deletar
                  </buttonn>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableMovimentacoes;
