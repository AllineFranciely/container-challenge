import React, { useState, useEffect } from 'react';
import { getContainers } from '../helpers/api';

function TableContainers() {
  const [containers, setContainers] = useState([]);
  const [filterByCategoria, setFilterByCategoria] = useState([
    {
      param: 'categoria',
      comparison: 'Importação',
    },
  ]);
  const { param, comparison } = filterByCategoria[0];
  const [filterByCliente, setFilterByCliente] = useState('');

  async function getAllContainers() {
    const allContainers = await getContainers();
    setContainers(allContainers)
  }

  useEffect(() => {
    getAllContainers();
  }, []);

  const filterDataResults = () => containers.filter((container) => {
    if (comparison.includes('Importação')) {
      return (container[param] === 'Importação');
    }
    if (comparison.includes('Exportação')) {
      return (container[param] === 'Exportação');
    }
    return container;
  });

  return (
    <div>
      <p>Filtrar</p>
      <input
        type="text"
        className="search"
        placegolder="Pesquiser por cliente"
        onChange={(event) => setFilterByCliente(event.target.value)}
      />
      <select
        name="comparison"
        className="filterOption"
        onChange={(event) => setFilterByCategoria([{
          ...filterByCategoria[0],
          comparison: event.target.value,
        }])}
      >
        <option value="Importação">Importação</option>
        <option value="Exportação">Exportação</option>
      </select>
      <button
        type="button"
        className="button"
        onClick={() => {
          setContainers(() => filterDataResults());
        }}
      >
        Filtrar
      </button>
      <button
        type="button"
        className="button"
        onClick={() => {
          var url = window.location.href + "?filter=true";
          window.location.href = url;
        }}
      >
        Limpar Filtros
      </button>
      <table>
        <thead>
          <tr>
            <th>Container ID</th>
            <th>Cliente</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {containers && containers.filter((filterContainer) => filterContainer.cliente
          .includes(filterByCliente))
          .map((container) => (
            <tr>
              <td>{container.id}</td>
              <td>{container.cliente}</td>
              <td>{container.numero}</td>
              <td>{container.tipo}</td>
              <td>{container.situacao}</td>
              <td>{container.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableContainers;
