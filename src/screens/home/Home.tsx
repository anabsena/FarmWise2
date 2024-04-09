import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiCloud, WiNightStormShowers } from 'react-icons/wi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function Home() {
  const [cotacoes, setCotacoes] = useState({
    soja: 10.50,
    trigo: 5.20,
    milho: 3.80,
  });
  const [dolar, setDolar] = useState()
  const [error, setError] = useState(null);
  const [climaAtual, setClimaAtual] = useState(null);
  const [previsaoSemanal, setPrevisaoSemanal] = useState(null);
  const [cidadePesquisada, setCidadePesquisada] = useState('Rio de Janeiro');

  const apiKey = 'ab6a220cac87466da0a141821240904'; // Substitua 'SUA_CHAVE_DE_API' pela sua chave de API do WeatherAPI


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
        data.forecast.forecastday.forEach(dia => {
          console.log("Condição do clima para", dia.date, ":", dia.day.condition.text);
        });
      } catch (err) {
        setError('Erro ao obter a previsão semanal.');
      }
    };

    fetchCotacoesDolar();
    fetchClimaAtual();
    fetchPrevisaoSemanal()
    getUserLocation();
  }, []);

  if (error) {
    return <div className="container mx-auto mt-10 text-red-500">{error}</div>;
  }
  const conditionTranslations = (condition) => {
    const translations = {
      'Sunny': 'Ensolarado',
      'Partly cloudy': 'Parcialmente nublado',
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
    };
    return translations[condition] || condition;
  };
  const getIconByCondition = (condition, className, size) => {
    // Mapeamento detalhado entre condições de clima e ícones
    const conditionIcons = {
      'Sunny': <img src="/img/sol.svg" size={size} />,
      'Partly cloudy': <img src="/img/parcialmente-nublado.svg" size={size} />,
      'Mostly cloudy': <img src="/img/nublado.svg" size={size} />,
      'Cloudy': <img src="/img/nublado.svg" size={size} />,
      'Overcast': <img src="/img/nublado.svg" size={size} />,
      'Light rain': <img src="/img/chuva.svg" size={size} />,
      'Rain': <img src="/img/chuva.svg" size={size} />,
      'Heavy rain': <img src="/img/chuva.svg" size={size} />,
      'Snow': <img src="/img/granizo.svg" size={size} />,
      'Sleet': <img src="/img/granizo.svg" size={size} />,
      'Light snow': <img src="/img/granizo.svg" size={size} />,
      'Heavy snow': <img src="/img/granizo.svg" size={size} />,
      'Thunderstorm': <img src="/img/trovoada.svg" size={size} />,
      'Light thunderstorm': <img src="/img/trovoada.svg" size={size} />,
      'Heavy thunderstorm': <img src="/img/trovoada.svg" size={size} />,
      'Patchy rain nearby': <img src="/img/chuva.svg" size={size} />,
      'Moderate rain': <img src="/img/chuva.svg" size={size} />,
      'Clear': <img src="/img/sol.svg" size={size} />,
      'Scattered clouds': <img src="/img/parcialmente-nublado.svg" size={size} />,
      'Broken clouds': <img src="/img/parcialmente-nublado.svg" size={size} />,
      'Fog': <img src="/img/granizo.svg" size={size} />,
      // Adicione mais condições conforme necessário
    };

    // Retorna o ícone correspondente à condição ou um ícone padrão se a condição não estiver mapeada
    return conditionIcons[condition] || <WiCloudy className={className} size={size} />;
  };
  const formatCurrentDate = () => {
    const currentDate = new Date();
    // Formata a data atual para incluir a quebra de linha entre o dia da semana e a data
    return format(currentDate, 'EEEE', { locale: ptBR }) + '<br />' + format(currentDate, 'dd \'de\' MMMM \'de\' yyyy', { locale: ptBR });
  };
  const formatarDiaDaSemana = (dataISO) => {
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

  const handleCidadeChange = (event) => {
    setCidadePesquisada(event.target.value);
  };



  return (
    <div className='h-[89.4vh] w-full'>
      <Header />
      <div className=' w-full grid grid-cols-2 h-full relative'>
        <div className='mt-4 p-8'>
          <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-4 w-full justify-center items-center mb-4'>
            <label htmlFor="">Digite uma cidade</label>
            <div className='flex  gap-4  justify-center'>

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
              <div className='flex gap-4'>{getIconByCondition(climaAtual.current.condition.text, 'text-4xl text-secondary', '300px')}
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
            <div className='grid grid-cols-4 mt-12 gap-4'>
              {previsaoSemanal.map((dia, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <h3 className='uppercase font-bold text-primary'>{formatarDiaDaSemana(dia.date)}</h3>
                  <div className='flex flex-col items-center border-2 p-4 border-secondary w-full rounded-xl'>
                    {getIconByCondition(dia.day.condition.text, 'width-24 text-secondary', '50px')}
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
          {cotacoes ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
              <div className="p-4 rounded flex flex-col justify-center items-center z-50">
                <div className='flex items-center '>
                  <img src="/img/icon-soja.png" className='object-contain ' alt="" />
                  <h2 className="text-xl mb-2">Soja</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>R$</span>{(cotacoes.soja).toFixed(2)}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center z-50">
                <div className='flex items-center'>
                  <img src="/img/icon-milho.png" alt="" />
                  <h2 className="text-xl mb-2">Milho</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>R$</span>{(cotacoes.milho).toFixed(2)}
                </p>
              </div>
              <div className="p-4 rounded flex flex-col justify-center items-center z-50">
                <div className='flex items-center'>
                  <img src="/img/icon-trigo.png" alt="" />
                  <h2 className="text-xl mb-2">Trigo</h2>
                </div>
                <p className="text-xl">
                  <span className='font-bold text-secondary'>R$</span>{(cotacoes.trigo).toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center mt-5">Carregando...</p>
          )}
          <img src="/img/moeda.svg" className='absolute bottom-0 right-0 opacity-60 z-0' alt="" />
        </div>
      </div>
    </div >
  );
}
