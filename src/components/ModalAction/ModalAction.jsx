import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModalAction.scss";

export default function ModalAction(props) {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  // UseEffect para buscar informações do produto quando o modal é aberto ou o ID muda
  useEffect(() => {
    if (open) {
      fetch(`http://localhost:5000/produtos/${id}`)
        .then((response) => response.json())
        .then((data) => setProduto(data))
        .catch((error) => console.log(error));
    }
  }, [id, open]);

  // Função para lidar com a exclusão do produto
  const handleExcluir = () => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Após a exclusão bem-sucedida, exibe um alerta, fecha o modal e navega de volta para a página de produtos
        alert("Produto Excluído com sucesso");
        onClose(); // Fecha o modal
        navigate("/produtos"); // Navega para a página de produtos
      })
      .catch((error) => console.log(error));
  };

  // Verifica se o modal não está aberto ou os dados do produto não estão disponíveis
  if (!open || !produto) {
    return null; // Não renderizar nada se o modal não estiver aberto ou os dados do produto não estiverem prontos
  }

  // Renderização do formulário de confirmação de exclusão
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
