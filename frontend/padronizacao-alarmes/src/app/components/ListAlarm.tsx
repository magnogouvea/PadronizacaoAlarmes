"use client";

import { useEffect, useState } from "react";
import axios from 'axios';

export default function ListAlarms() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/firewall");
        console.log("casinha")
        console.log(response+ "mansão")
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("casa");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Dados do Firewall</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dispositivo</th>
            <th>Dados Pretendidos</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dispositivo}</td>
              <td>{item.dadosPretendidos}</td>
              <td>{item.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
