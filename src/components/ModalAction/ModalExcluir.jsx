import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    //Após a confirmação da exclusão, exibe o alerta e fecha o modal, retornando aos produtos
      .then(() => {
        alert("Produto Excluído com sucesso");
        props.onClose(); //Fecha o modal
        navigate("/produtos");
      })
      .catch((error) => console.log(error));
  };

  if (!produto) {
    return <div>Carregando...</div>;
  }
// Criando o formulário de exclusão do produto
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>Confirmação de Exclusão</h2>
        <p className="subtitle">
          Deseja realmente excluir o produto: "<span className="produto">{produto.nome}</span>"?
        </p>
        <h3>Informações do Produto:</h3>
        <ul>
          <li><strong>Descrição: </strong> {produto.desc}</li>
          <li><strong>Preço: </strong> R${produto.preco}</li>
        </ul>
        <button onClick={handleExcluir}>Confirmar Exclusão</button>
        <button onClick={props.onClose}>Cancelar</button>
      </div>
    </div>
  );
}
