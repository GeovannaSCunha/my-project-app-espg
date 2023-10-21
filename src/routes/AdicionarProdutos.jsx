
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdicionarProduto() {

    //Recuperando o parâmetro ID com o HOOK useParams();
    document.title = "EDITAR PRODUTOS";
    const navigate = useNavigate();
    const [novoProduto, setNovoProduto] = useState({
        id: '', 
        nome: '',
        desc: '',
        preco: ''
      });
     
      const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto({ ...novoProduto, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:5000/produtos', {
          method: 'POST',
          body: JSON.stringify(novoProduto),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Produto adicionado com sucesso:', data);
            navigate("/produtos");
          })
          .catch((error) => console.error('Erro ao adicionar o produto:', error));

      };


      return (
        <div>
          <h1>ADICIONAR PRODUTO</h1>
          <form onSubmit={handleSubmit}>
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
              <button type="submit">ADICIONAR</button>
            </div>
          </form>
        </div>
      );
    }