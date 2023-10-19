import  { useState } from "react";
import {  useNavigate } from "react-router-dom";

import "./Adicionar.scss"
export default function AdicionarProduto() {
  const [nome, setNome] = useState("");
  const [desc, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode fazer a solicitação POST para adicionar o produto ao servidor
    fetch("http://localhost:5000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, desc, preco }),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Produto adicionado")
          navigate("/produtos");
        } else {
          alert("Erro ao adicionar produto")
        }
      });
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="descricao">Descrição:</label>
        <input
          id="descricao"
          value={desc}
          onChange={(e) => setDescricao(e.target.value)}
        ></input>

        <label htmlFor="preco">Preço:</label>
        <input
          type="text"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
}
