import { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";

const PlantationScreen = () => {
  const [quantity, setQuantity] = useState('');
  const [city, setCity] = useState('');
  const [cultura, setCultura] = useState('');
  // @ts-ignore 
  const [risco, setRisco] = useState('20');  // Risco padrão de 20%
  const [culturas, setCulturas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [zoneamento, setZoneamento] = useState({});
  const [cad, setCAD] = useState('');
  const [expectativaProdutividade, setExpectativaProdutividade] = useState('');
  // @ts-ignore 
  const [cultivar, setCultivar] = useState([]);
  const [produtividadeData, setProdutividadeData] = useState({});

  const AGROAPI_TOKEN = '3685744e-f145-3f69-8cec-2f735041a2ec'; // Substitua pela sua chave API

  useEffect(() => {
    const fetchCulturas = async () => {
      try {
        const response = await fetch('https://api.cnptia.embrapa.br/agritec/v1/culturas', {
          headers: {
            'Authorization': `Bearer ${AGROAPI_TOKEN}`,
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        // @ts-ignore 
        const filteredCulturas = data.data.filter(cultura =>
          cultura.cultura === 'TRIGO' ||
          cultura.cultura === 'MILHO' ||
          cultura.cultura === 'SOJA'
        );
        setCulturas(filteredCulturas);
      } catch (error) {
        console.error('Erro ao buscar culturas:', error);
      }
    };

    const fetchMunicipios = async () => {
      try {
        const response = await fetch('https://api.cnptia.embrapa.br/agritec/v1/municipios', {
          headers: {
            'Authorization': `Bearer ${AGROAPI_TOKEN}`,
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        // @ts-ignore 
        const paranaMunicipios = data.data.filter(municipio => municipio.uf === 'PR');
        setMunicipios(paranaMunicipios);
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
      }
    };

    fetchCulturas();
    fetchMunicipios();
  }, []);

  const fetchZoneamento = async () => {
    try {
      const response = await fetch(`https://api.cnptia.embrapa.br/agritec/v1/zoneamento?idCultura=${cultura}&codigoIBGE=${city}&risco=${risco}`, {
        headers: {
          'Authorization': `Bearer ${AGROAPI_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data)
      // @ts-ignore 
      const aggregatedData = data.data.reduce((acc, item) => {
        const key = `${item.cultura}_${item.municipio}`;
        if (!acc[key]) {
          acc[key] = {
            cultura: item.cultura,
            municipio: item.municipio,
            diaIni: 0,
            mesIni: 0,
            diaFim: 0,
            mesFim: 0,
            risco: 0,
            count: 0
          };
        }
        acc[key].diaIni += item.diaIni;
        acc[key].mesIni += item.mesIni;
        acc[key].diaFim += item.diaFim;
        acc[key].mesFim += item.mesFim;
        acc[key].risco += item.risco;
        acc[key].count += 1;
        return acc;
      }, {});

      const averagedZoneamento = Object.values(aggregatedData).map(item => ({
        // @ts-ignore 
        cultura: item.cultura,
        // @ts-ignore 
        municipio: item.municipio,
        // @ts-ignore 
        diaIni: Math.round(item.diaIni / item.count),
        // @ts-ignore 
        mesIni: Math.round(item.mesIni / item.count),
        // @ts-ignore 
        diaFim: Math.round(item.diaFim / item.count),
        // @ts-ignore 
        mesFim: Math.round(item.mesFim / item.count),
        // @ts-ignore 
        risco: (item.risco / item.count).toFixed(2)
      }));

      setZoneamento(averagedZoneamento[0]);  // Aqui selecionamos a primeira opção média calculada

      const responseCultivar = await fetch(`https://api.cnptia.embrapa.br/agritec/v1/cultivares?safra=2021-2022&idCultura=${cultura}&uf=PR`, {
        headers: {
          'Authorization': `Bearer ${AGROAPI_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const dataCultivar = await responseCultivar.json();
      setCultivar(dataCultivar.data);

      const responseProdutividade = await fetch(`https://api.cnptia.embrapa.br/agritec/v1/produtividade?idCultura=${cultura}&idCultivar=338817&codigoIBGE=${city}&dataPlantio=2023-11-15&cad=${cad}&expectativaProdutividade=${expectativaProdutividade}`, {
        headers: {
          'Authorization': `Bearer ${AGROAPI_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const dataProdutividade = await responseProdutividade.json();

      // Calcular médias para os dados de produtividade
      if (dataProdutividade.data && dataProdutividade.data.produtividadeAlmejada) {
        const totalEntries = dataProdutividade.data.produtividadeAlmejada.length;
        // @ts-ignore 
        const produtividadeMedia = dataProdutividade.data.produtividadeAlmejada.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const produtividadeMediaMunicipio = dataProdutividade.data.produtividadeMediaMunicipio.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const temperaturaMinima = dataProdutividade.data.temperaturaMinima.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const temperaturaMaxima = dataProdutividade.data.temperaturaMaxima.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const precipitacao = dataProdutividade.data.precipitacao.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const grausDia = dataProdutividade.data.grausDia.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const balancoHidrico = dataProdutividade.data.balancoHidrico.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const deficienciaHidrica = dataProdutividade.data.deficienciaHidrica.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const excedenteHidrico = dataProdutividade.data.excedenteHidrico.reduce((acc, val) => acc + val, 0) / totalEntries;
        // @ts-ignore 
        const isna = dataProdutividade.data.isna.reduce((acc, val) => acc + val, 0) / totalEntries;

        setProdutividadeData({
          produtividadeAlmejada: produtividadeMedia.toFixed(2),  // Aqui ajustamos para 2 casas decimais
          produtividadeMediaMunicipio: produtividadeMediaMunicipio.toFixed(2),
          temperaturaMinima: temperaturaMinima.toFixed(2),
          temperaturaMaxima: temperaturaMaxima.toFixed(2),
          precipitacao: precipitacao.toFixed(2),
          grausDia: grausDia.toFixed(2),
          balancoHidrico: balancoHidrico.toFixed(2),
          deficienciaHidrica: deficienciaHidrica.toFixed(2),
          excedenteHidrico: excedenteHidrico.toFixed(2),
          isna: isna.toFixed(2)
        });
      }

    } catch (error) {
      console.error('Erro ao buscar zoneamento:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full pt-12 px-4">
      <div className="h-full w-full items-center justify-center text-center">
        <h1 className="text-4xl uppercase font-bold text-primary">Informações</h1>
        <form action="" className="flex flex-col gap-8">
          <input
            type="text"
            placeholder="Quantidade de terra em m2"
            className="border-2 border-gray-300 p-2 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="CAD (Capacidade de armazenamento de água no solo em ml)"
            className="border-2 border-gray-300 p-2 rounded-md"
            value={cad}
            onChange={(e) => setCAD(e.target.value)}
          />
          <input
            type="text"
            placeholder="Expectativa de Produtividade (ton/ha)"
            className="border-2 border-gray-300 p-2 rounded-md"
            value={expectativaProdutividade}
            onChange={(e) => setExpectativaProdutividade(e.target.value)}
          />
          <select
            className="border-2 border-gray-300 p-2 rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Selecione o município</option>
            {municipios.map((municipio) => (
              // @ts-ignore 
              <option key={municipio.codigoIBGE} value={municipio.codigoIBGE}>
                {/* @ts-ignore  */}
                {municipio.nome}
              </option>
            ))}
          </select>
          <select
            className="border-2 border-gray-300 p-2 rounded-md"
            value={cultura}
            onChange={(e) => setCultura(e.target.value)}
          >
            <option value="">Selecione a cultura</option>
            {culturas.map((cultura) => (
              // @ts-ignore 
              <option key={cultura.id} value={cultura.id}>
                {/* @ts-ignore */}
                {cultura.cultura}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <Button type='button' className="" variant={"secondary"} onClick={() => fetchZoneamento()}>
              Gerar sugestão
            </Button>
          </div>
        </form>
      </div>
      <div className="border rounded-xl p-4 flex flex-col items-start gap-4">
        <h1 className="text-4xl uppercase font-bold text-primary">Zoneamento</h1>
        {zoneamento && Object.keys(zoneamento).length > 0 ? (
          <ul className="text-xl text-primary mt-4">
            <li>
              {/* @ts-ignore */}
              <strong>Cultura:</strong> {zoneamento.cultura},
              {/* @ts-ignore */}
              <strong> Município:</strong> {zoneamento.municipio},
              {/* @ts-ignore */}
              <strong> Período:</strong> {zoneamento.diaIni}/{zoneamento.mesIni} até {zoneamento.diaFim}/{zoneamento.mesFim},
              {/* @ts-ignore */}
              <strong> Risco:</strong> {zoneamento.risco}%
            </li>
          </ul>
        ) : (
          <p>Nenhuma informação de zoneamento disponível para a seleção atual.</p>
        )}

        <h1 className="text-4xl uppercase font-bold text-primary ">Produtividade</h1>
        {/* @ts-ignore */}
        {produtividadeData && produtividadeData.produtividadeAlmejada ? (
          <ul className="text-xl text-primary mt-4">
            <li className='flex flex-col text-start'>
              {/* @ts-ignore */}
              <strong>Produtividade Almejada:</strong> {produtividadeData.produtividadeAlmejada} ton/ha,
              {/* @ts-ignore */}
              <strong> Produtividade Média do Município:</strong> {produtividadeData.produtividadeMediaMunicipio} ton/ha,
              {/* @ts-ignore */}
              <strong> Temperatura Mínima:</strong> {produtividadeData.temperaturaMinima}°C,
              {/* @ts-ignore */}
              <strong> Temperatura Máxima:</strong> {produtividadeData.temperaturaMaxima}°C,
              {/* @ts-ignore */}
              <strong> Precipitação:</strong> {produtividadeData.precipitacao} mm,
              {/* @ts-ignore */}
              <strong> Graus Dia:</strong> {produtividadeData.grausDia},
              {/* @ts-ignore */}
              <strong> Balanço Hídrico:</strong> {produtividadeData.balancoHidrico} mm,
              {/* @ts-ignore */}
              <strong> Deficiência Hídrica:</strong> {produtividadeData.deficienciaHidrica} mm,
              {/* @ts-ignore */}
              <strong> Excedente Hídrico:</strong> {produtividadeData.excedenteHidrico} mm,
              {/* @ts-ignore */}
              <strong> ISNA:</strong> {produtividadeData.isna}
            </li>
          </ul>
        ) : (
          <p>Nenhuma informação de produtividade disponível para a seleção atual.</p>
        )}
      </div>
    </div >
  );
}

export default PlantationScreen;
