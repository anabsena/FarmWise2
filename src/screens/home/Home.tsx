import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ClimaAtual {
  current: {
    condition: {
      text: string;
    };
    temp_c: number;
    humidity: number;
  };
}
interface PrevisaoSemanal {
  date: string;
  day: {
    condition: {
      text: string;
    };
    maxtemp_c: number;
    mintemp_c: number;
  };
}
interface Cotacoes {
  soja: number;
  milho: number;
  trigo: number;
}

export function Home() {
  const [cotacoes, setCotacoes] = useState<Cotacoes | null>(null);
  const [dolar, setDolar] = useState()
  const [error, setError] = useState('');
  const [climaAtual, setClimaAtual] = useState<ClimaAtual | null>(null);
  const [previsaoSemanal, setPrevisaoSemanal] = useState<PrevisaoSemanal[] | null>(null);
  const [cidadePesquisada, setCidadePesquisada] = useState('Ivaiporã');

  const apiKey = 'ab6a220cac87466da0a141821240904';
  const apiKeyAlphaVantage = 'BF07LIMDCDMSOT41';


  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
            const data = await response.json();
            setCidadePesquisada(data.location.name);
          } catch (err) {
            console.log(err);
            setError('Erro ao obter a localização do usuário.');
          }
        });
      } else {
        setError('Geolocalização não suportada neste navegador.');
      }
    };


    async function fetchCotacoesDolar() {
      try {
        const responseDolar = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.10813/dados/ultimos/1?formato=json');
        const data = await responseDolar.json();
        setDolar(data[0].valor);
      } catch (err) {
        console.log(err);
        setError('Erro ao obter cotação do dólar.');
      }
    }

    const fetchClimaAtual = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidadePesquisada}`);
        const data = await response.json();
        setClimaAtual(data);
      } catch (err) {
        setError('Erro ao obter o clima atual.');
      }
    };

    const fetchPrevisaoSemanal = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidadePesquisada}&days=7`);
        const data = await response.json();
        setPrevisaoSemanal(data.forecast.forecastday);
      } catch (err) {
        setError('Erro ao obter a previsão semanal.');
      }
    };
    // async function fetchCotacoesGranos() {
    //   const symbols = ['SOYB', 'WHEAT', 'CORN']; // Símbolos para Soja, Trigo e Milho

    //   try {
    //     const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbols}&apikey=${apiKeyAlphaVantage}`)
    //     const data = await response.json();
    //     console.log('graos', data)

    //     // const results = await Promise.all(promises);
    //     // const cotacoes = results.reduce((acc, result, index) => {
    //     //   const symbol = symbols[index];
    //     //   const price = result['Global Quote'] ? result['Global Quote']['05. price'] : 'N/A';
    //     //   acc[symbol.toLowerCase()] = parseFloat(price);
    //     //   return acc;
    //     // }, {});

    //     setCotacoes(cotacoes);
    //   } catch (err) {
    //     console.log(err);
    //     setError('Erro ao obter cotações dos grãos.');
    //   }
    // }

    fetchCotacoesDolar();
    fetchClimaAtual();
    fetchPrevisaoSemanal()
    getUserLocation();
    // fetchCotacoesGranos()
  }, []);

  if (error) {
    return <div className="container mx-auto mt-10 text-red-500">{error}</div>;
  }
  const conditionTranslations = (condition: string) => {
    const translations = {
      'Sunny': 'Ensolarado',
      'Partly Cloudy ': 'Parcialmente nublado',
      'Mostly cloudy': 'Muito nublado',
      'Cloudy': 'Nublado',
      'Overcast': 'Céu cerrado',
      'Light rain': 'Chuva leve',
      'Rain': 'Chuva',
      'Heavy rain': 'Chuva forte',
      'Snow': 'Neve',
      'Sleet': 'Granizo',
      'Light snow': 'Neve leve',
      'Heavy snow': 'Neve forte',
      'Thunderstorm': 'Tempestade',
      'Light thunderstorm': 'Tempestade leve',
      'Heavy thunderstorm': 'Tempestade forte',
      'Patchy rain nearby': 'Possibilidade de chuva',
      'Moderate rain': 'Chuva moderada',
      'Clear': 'Limpo',
      'Scattered clouds': 'Nuvens dispersas',
      'Broken clouds': 'Nuvens quebradas',
      'Fog': 'Névoa',
      'Mist': 'Neblina'
    };
    //@ts-ignore
    return translations[condition] || condition;
  };
  const getIconByCondition = (condition: string, className: string) => {
    // Mapeamento detalhado entre condições de clima e ícones
    const conditionIcons = {
      'Sunny': <img src="/img/sol.svg" className={className} />,
      'Partly Cloudy ': <img src="/img/parcialmente-nublado.svg" className={className} />,
      'Mostly cloudy': <img src="/img/nublado.svg" className={className} />,
      'Cloudy': <img src="/img/nublado.svg" className={className} />,
      'Overcast': <img src="/img/nublado.svg" className={className} />,
      'Light rain': <img src="/img/chuva.svg" className={className} />,
      'Rain': <img src="/img/chuva.svg" className={className} />,
      'Heavy rain': <img src="/img/chuva.svg" className={className} />,
      'Snow': <img src="/img/granizo.svg" className={className} />,
      'Sleet': <img src="/img/granizo.svg" className={className} />,
      'Light snow': <img src="/img/granizo.svg" className={className} />,
      'Heavy snow': <img src="/img/granizo.svg" className={className} />,
      'Thunderstorm': <img src="/img/trovoada.svg" className={className} />,
      'Light thunderstorm': <img src="/img/trovoada.svg" className={className} />,
      'Heavy thunderstorm': <img src="/img/trovoada.svg" className={className} />,
      'Patchy rain nearby': <img src="/img/chuva.svg" className={className} />,
      'Moderate rain': <img src="/img/chuva.svg" className={className} />,
      'Clear': <img src="/img/sol.svg" className={className} />,
      'Scattered clouds': <img src="/img/parcialmente-nublado.svg" className={className} />,
      'Broken clouds': <img src="/img/parcialmente-nublado.svg" className={className} />,
      'Fog': <img src="/img/granizo.svg" className={className} />,
      // Adicione mais condições conforme necessário
    };

    //@ts-ignore
    return conditionIcons[condition] || <img src="/img/parcialmente-nublado.svg" className={className} />;
  };
  const formatCurrentDate = () => {
    const currentDate = new Date();
    // Formata a data atual para incluir a quebra de linha entre o dia da semana e a data
    return format(currentDate, 'EEEE', { locale: ptBR }) + '<br />' + format(currentDate, 'dd \'de\' MMMM \'de\' yyyy', { locale: ptBR });
    
  };
  const formatarDiaDaSemana = (dataISO: string) => {
    // Converte a string ISO para um objeto Date
    const data = new Date(dataISO);
    // Formata a data para exibir apenas o dia da semana
    return format(data, 'EEEE', { locale: ptBR });
  };
  const handleBuscarClima = async () => {
    if (!cidadePesquisada) return;

    try {
      const responseClima = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidadePesquisada}`);
      const dataClima = await responseClima.json();
      setClimaAtual(dataClima);

      const responsePrevisao = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidadePesquisada}&days=7`);
      const dataPrevisao = await responsePrevisao.json();
      setPrevisaoSemanal(dataPrevisao.forecast.forecastday);
    } catch (err) {
      setError('Erro ao buscar o clima e previsão semanal.');
    }
  };

  const handleCidadeChange = (event: any) => {
    setCidadePesquisada(event.target.value);
  };

  const handleAtualizarCotacoesGranos = async () => {
    const symbols = ['SOYB', 'WHEAT', 'CORN'];

    try {
      const promises = symbols.map(async (symbol) => {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKeyAlphaVantage}`);
        const data = await response.json();

        if (data.Information) {
          console.error(`Resposta da API para ${symbol}:`, data);
          throw new Error(`Dados de cotação para ${symbol} inválidos. Limite de uso gratuito atingido.`);
        }

        if (!data['Time Series (Daily)']) {
          console.error(`Resposta da API para ${symbol}:`, data);
          throw new Error(`Dados de cotação para ${symbol} inválidos.`);
        }

        const latestDate = Object.keys(data['Time Series (Daily)'])[0];
        return {
          symbol: symbol.toLowerCase(),
          price: parseFloat(data['Time Series (Daily)'][latestDate]['4. close'])
        };
      });

      const results = await Promise.all(promises);

      const cotacoesAtualizadas = {
        soja: results.find(item => item.symbol === 'soyb')?.price || 0,
        milho: results.find(item => item.symbol === 'corn')?.price || 0,
        trigo: results.find(item => item.symbol === 'wheat')?.price || 0
      };

      setCotacoes(cotacoesAtualizadas);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar cotações dos grãos. Limite de uso gratuito atingido.');
    }
  };



  return (
    <div className=' w-full'>
      <Header />
      <div className=' w-full grid grid-cols-1 md:grid-cols-2 h-full relative'>
        <div className='mt-4 p-8'>
          <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-4 w-full justify-center items-center mb-4'>
            <label htmlFor="">Digite uma cidade</label>
            <div className='flex flex-col sm:flex-row gap-4  justify-center'>

              <input
                type="text"
                placeholder="Digite o nome da cidade"
                value={cidadePesquisada}
                onChange={handleCidadeChange}
                className="border-2 border-gray-300 p-2 rounded-md"
              />
              <button type="submit" onClick={handleBuscarClima} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buscar Clima
              </button>
            </div>
          </form>
          {climaAtual && (
            <div>
              <p className='text-primary text-xl '> {conditionTranslations(climaAtual.current.condition.text)}</p>
              <div className='flex flex-col sm:flex-row gap-4'>{getIconByCondition(climaAtual.current.condition.text, 'text-4xl text-secondary w-52')}
                <div>
                  <h2 className='uppercase text-6xl font-bold text-primary'>{cidadePesquisada}</h2>
                  <p className='text-center text-2xl' dangerouslySetInnerHTML={{ __html: formatCurrentDate() }}></p>
                  <p className='bg-secondary p-2 text-white flex justify-center text-6xl font-bold relative rounded-xl'><span className='font-normal text-[12px] absolute top-2 left-2'>Agora</span> {climaAtual.current.temp_c}°C</p>
                  <p className='uppercase font-bold text-xl text-center'>Umidade: {climaAtual.current.humidity}%</p>
                </div>
              </div>

            </div>
          )}
          <div className='w-full flex justify-center'>
            <hr className='h-0.5 rounded-full w-[90%] border-none bg-primary' />
          </div>

          {previsaoSemanal && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-12 gap-4'>
              {previsaoSemanal.map((dia, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <h3 className='uppercase font-bold text-primary'>{formatarDiaDaSemana(dia.date)}</h3>
                  <div className='flex flex-col items-center border-2 p-4 border-secondary w-full rounded-xl h-full justify-between'>
                    {getIconByCondition(dia.day.condition.text, 'width-24 text-secondary w-24')}
                    <p className='text-center text-sm text-primary'> {conditionTranslations(dia.day.condition.text)}</p>
                    <p className='bg-secondary p-1 text-white rounded-lg'> {dia.day.maxtemp_c}°C - {dia.day.mintemp_c}°C</p>
                    <p></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="container mx-auto mt-10 relative h-full">
          <div className="p-4 rounded flex flex-col items-end" >
            <div className='flex items-center ' >
              <h2 className="text-4xl uppercase font-bold text-primary mb-2" >Cotação do dólar</h2>
            </div>
            <p className="text-3xl font-normal">
              <span className=' text-secondary font-bold'>R$</span>{dolar}
            </p>
          </div>
          <h1 className="text-3xl mb-5">Cotações de grãos</h1>
          <button
            onClick={handleAtualizarCotacoesGranos}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Atualizar Cotações de Grãos
          </button>
          {cotacoes ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
              <div className="p-4 rounded flex flex-col justify-center items-center z-50">
                <div className='flex items-center '>
                  <img src="/img/icon-soja.png" className='object-contain ' alt="" />
                  <h2 className="text-xl mb-2">Soja</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>R$</span>{cotacoes.soja ? cotacoes.soja.toFixed(2) : 'Carregando...'}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center z-50">
                <div className='flex items-center'>
                  <img src="/img/icon-milho.png" alt="" />
                  <h2 className="text-xl mb-2">Milho</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>R$</span>{cotacoes.milho ? cotacoes.milho.toFixed(2) : 'Carregando...'}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center z-50">
                <div className='flex items-center'>
                  <img src="/img/icon-trigo.png" alt="" />
                  <h2 className="text-xl mb-2">Trigo</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>R$</span>{cotacoes.trigo ? cotacoes.trigo.toFixed(2) : 'Carregando...'}
                </p>
              </div>

            </div>
          ) : (
            <p className="text-center mt-5">Carregando...</p>
          )}
          <img src="/img/moeda.svg" className='absolute bottom-0 right-0 opacity-60 z-0 hidden md:flex' alt="" />
        </div>
      </div>
    </div >
  );
}
