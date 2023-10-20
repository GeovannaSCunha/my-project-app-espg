import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModalAction.scss";

export default function ModalAction(props) {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    if (open) {
      fetch(`http://localhost:5000/produtos/${id}`)
        .then((response) => response.json())
        .then((data) => setProduto(data))
        .catch((error) => console.log(error));
    }
  }, [id, open]);

  const handleExcluir = () => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Produto Exluido com sucesso");
        onClose(); // Fecha o modal
        navigate("/produtos");
      })
      .catch((error) => console.log(error));
  };

  if (!open || !produto) {
    return null; // Não renderizar nada se o modal não estiver aberto ou os dados do produto não estiverem prontos
  }

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>Confirmação de Exclusão</h2>
        <p className="subtitle">
          Deseja realmente excluir o produto: <span>{produto.nome}</span>?
        </p>
        <button onClick={handleExcluir}>Confirmar Exclusão</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
