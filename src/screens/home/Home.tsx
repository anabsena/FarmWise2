import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../../components/Header';

export function Home() {
  const [cotacoes, setCotacoes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCotacoes() {
      try {
        const response = await axios.get('http://localhost:3001/cotacao');
        setCotacoes(response.data);
      } catch (err) {
        setError('Erro ao obter cotações.');
      }
    }

    fetchCotacoes();
  }, []);

  if (error) {
    return <div className="container mx-auto mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className='h-full w-full'>
      <Header />
      <div className=' w-full grid grid-cols-2 h-full'>
        <div className='mt-4'>
          <img src="/img/clima-tempo.svg" alt="" />
        </div>
        <div className="container mx-auto mt-10 relative h-full">
          <img src="/img/moeda.svg" className='absolute bottom-0 right-0 opacity-60' alt="" />

          <h1 className="text-3xl mb-5">Cotações de grãos</h1>
          {cotacoes ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded flex flex-col justify-center items-center">
                <div className='flex items-center'>
                  <img src="/img/icon-soja.png" className='object-contain ' alt="" />
                  <h2 className="text-xl mb-2">Soja</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>$</span>{cotacoes.soja.valor.toFixed(2)}
                  <span className='font-bold text-secondary'> | R$</span>{cotacoes.soja.valorEmReais.toFixed(2)}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center">
                <div className='flex items-center'>
                  <img src="/img/icon-milho.png" alt="" />
                  <h2 className="text-xl mb-2">Milho</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>$</span>{cotacoes.milho.valor.toFixed(2)}
                  <span className='font-bold text-secondary'> | R$</span>{cotacoes.milho.valorEmReais.toFixed(2)}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center">
                <div className='flex items-center'>
                  <img src="/img/icon-trigo.png" alt="" />
                  <h2 className="text-xl mb-2">Trigo</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>$</span>{cotacoes.trigo.valor.toFixed(2)}
                  <span className='font-bold text-secondary'> | R$</span>{cotacoes.trigo.valorEmReais.toFixed(2)}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center">
                <div className='flex items-center'>
                  <img src="/img/icon-dolar.png" alt="" />
                  <h2 className="text-xl mb-2">Dólar</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>$</span>{cotacoes.dolar.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center mt-5">Carregando...</p>
          )}
        </div>
      </div>
    </div>
  );
}
