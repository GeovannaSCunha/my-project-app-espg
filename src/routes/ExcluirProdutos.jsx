import  { useState, useEffect } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import './Excluir.scss'
export default function ExcluirProdutos() {
  document.title = "Excluir Produto";
  const navigate = useNavigate();

  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`)
      .then((response) => response.json())
      .then((data) => setProduto(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleExcluir = () => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Produto Exluido com sucesso")
        navigate("/produtos");
      })
      .catch((error) => console.log(error));
  };

  if (!produto) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Confirmação de Exclusão</h2>
      <p className="subtitle">Tem certeza que deseja excluir o produto "<span>{produto.nome}"?</span></p>
      <button onClick={handleExcluir}>Confirmar Exclusão</button>
    </div>
  );
}
