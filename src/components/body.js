import { useEffect, useState } from "react";
import SearchIcon from "../assets/lupa.png";
import { api } from "../services/api";

export default function Body() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [code, setCode] = useState("");
  const [showData, setShowData] = useState(false);
  useEffect(() => {
    const getData = () => {
      api
        .get("/encomendas")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  const newArray = (element) => {
    setShowData(true);
    element.preventDefault();
    setNewData(
      data.filter((element) => {
        return element.numero === code;
      })
    );
  };
  return (
    <>
      <section id="main-section">
        <h1 id="title">Consulte sua encomenda: </h1>
        <form id="input-wrapper">
          <input
            id="search-input"
            type="text"
            placeholder="Digite o número do pedido"
            onChange={(element) => setCode(element.target.value.toUpperCase())}
          />
          <button
            type="submit"
            id="search-button"
            onClick={(element) => {
              newArray(element);
            }}
          >
            <img alt="search" width="16" height="16" src={SearchIcon} />
          </button>
        </form>
        {newData.length === 0 && showData === true ? (
          <p id="error-message">Encomenda não encontrada! Tente novamente</p>
        ) : (
          newData.map((item) => (
            <article id="grid-container" key={item.id}>
              <div className="grid-items">
                <h3 className="grid-title">{`${item.cliente.id} - ${item.cliente.nome}`}</h3>
                <p className="grid-subtitle">
                  Número de ordem e nome do cliente
                </p>
              </div>
              <div id="value" className="grid-items">
                <h3 className="grid-title">{`R$ ${item.valor}`}</h3>
                <p className="grid-subtitle">Valor do pedido</p>
              </div>
              <div className="grid-items">
                <h3 className="grid-title">
                  {new Date(item.data).toLocaleDateString("pt-BR")}
                </h3>
                <p className="grid-subtitle">Data do pedido</p>
              </div>
              <div className="grid-items">
                <h3 className="grid-title">
                  {item.entregue ? "Entregue" : "Entregar"}
                </h3>
                <p className="grid-subtitle">Situação da encomenda</p>
              </div>
            </article>
          ))
        )}
      </section>
    </>
  );
}
