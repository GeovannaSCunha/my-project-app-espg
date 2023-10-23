import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AdicionarProdutos.scss';

export default function AdicionarProduto() {
  // Define o título da página
  document.title = "ADICIONAR PRODUTO";

  // Obtém uma função de navegação para redirecionar após a adição do produto
  const navigate = useNavigate();

  // Cria um estado para armazenar informações sobre o novo produto
  const [novoProduto, setNovoProduto] = useState({
    id: '', 
    nome: '',
    desc: '',
    preco: ''
  });
 
  // Função chamada quando um campo do formulário é alterado
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Atualiza o estado com os valores do campo alterado
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  // Função chamada quando o formulário é submetido
  const handleSubmit = (e) => {
    e.preventDefault();

    // Envia uma requisição POST para adicionar o novo produto
    fetch('http://localhost:5000/produtos', {
      method: 'POST',
      body: JSON.stringify(novoProduto),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Após o sucesso, exibe uma mensagem no console e redireciona para a página de produtos
        console.log('Produto adicionado com sucesso:', data);
        navigate("/produtos");
      })
      .catch((error) => console.error('Erro ao adicionar o produto:', error));
  };

  // Renderização do componente
  return (
    <div className="addProduto">
      <h1>ADICIONAR PRODUTO</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        <div className="addProduto">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="Digite o ID do produto"
            value={novoProduto.id}
            onChange={handleChange}
          />
        </div>
        <div className="addProduto">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Digite o nome do produto"
            value={novoProduto.nome}
            onChange={handleChange}
          />
        </div>
        <div className="addProduto">
          <label htmlFor="desc">Descrição</label>
          <input
            type="text"
            name="desc"
            id="desc"
            placeholder="Digite a descrição do produto"
            value={novoProduto.desc}
            onChange={handleChange}
          />
        </div>
        <div className="addProduto">
          <label htmlFor="preco">Preço</label>
          <input
            type="text"
            name="preco"
            id="preco"
            placeholder="Digite o preço do produto"
            value={novoProduto.preco}
            onChange={handleChange}
          />
        </div>
        {/* Botão para submeter o formulário */}
        <div>
          <button type="submit">ADICIONAR</button>
        </div>
      </form>
    </div>
  );
}
