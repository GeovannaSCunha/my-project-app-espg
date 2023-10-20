// Arquivo ModalExcluir.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ModalExcluir.scss';

export default function ModalExcluir(props) {
  const { id } = props;
  const [produto, setProduto] = useState(null);
  const navigate = useNavigate();

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
        alert("Produto Excluído com sucesso");
        props.onClose();
        navigate("/produtos");
      })
      .catch((error) => console.log(error));
  };

  if (!produto) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>Confirmação de Exclusão</h2>
        <p className="subtitle">
          Deseja realmente excluir o produto: "<span>{produto.nome}</span>"?
        </p>
        <button onClick={handleExcluir}>Confirmar Exclusão</button>
        <button onClick={props.onClose}>Cancelar</button>
      </div>
    </div>
  );
}
