import { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";

const PlantationScreen = () => {
  const [quantity, setQuantity] = useState('');
  const [city, setCity] = useState('');
  const [cultura, setCultura] = useState('');
  const [risco, setRisco] = useState('20');  // Risco padrão de 20%
  const [culturas, setCulturas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [zoneamento, setZoneamento] = useState([]);
  const [produtividade, setProdutividade] = useState([]);
  const [cad, setCAD] = useState('')
  const [cultivar, setCultivar] = useState([]);
  const [cultivarData, setCultivarData] = useState({});
  const [produtividadeData, setProdutividadeData] = useState({});

  const AGROAPI_TOKEN = '1bc836cd-5fd5-38e5-8192-93d261c57a77'; // Substitua pela sua chave API

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

        const paranaMunicipios = data.data.filter(municipio => municipio.uf === 'PR');

        setMunicipios(paranaMunicipios);
        console.log(paranaMunicipios)
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

      const groupedZoneamento = {};

      data.data.forEach(item => {
        const key = `${item.cultura}_${item.municipio}_${item.solo}`;
        if (!groupedZoneamento[key]) {
          groupedZoneamento[key] = {
            cultura: item.cultura,
            municipio: item.municipio,
            solo: item.solo,
            periodos: []
          };
        }
        groupedZoneamento[key].periodos.push({
          diaIni: item.diaIni,
          mesIni: item.mesIni,
          diaFim: item.diaFim,
          mesFim: item.mesFim,
          risco: item.risco
        });
      });

      const averagedZoneamento = Object.values(groupedZoneamento).map(item => {
        let bestPeriod = null;
        let bestPeriodLength = 0;

        item.periodos.forEach(periodo => {
          const length = (periodo.mesFim - periodo.mesIni) * 30 + (periodo.diaFim - periodo.diaIni);
          if (length > bestPeriodLength) {
            bestPeriodLength = length;
            bestPeriod = periodo;
          }
        });

        return {
          cultura: item.cultura,
          municipio: item.municipio,
          solo: item.solo,
          diaIni: bestPeriod.diaIni,
          mesIni: bestPeriod.mesIni,
          diaFim: bestPeriod.diaFim,
          mesFim: bestPeriod.mesFim,
          risco: bestPeriod.risco
        };
      });

      setZoneamento(averagedZoneamento);

      const responseCultivar = await fetch(`https://api.cnptia.embrapa.br/agritec/v1/cultivares?safra=2021-2022&idCultura=${cultura}&uf=PR`, {
        headers: {
          'Authorization': `Bearer ${AGROAPI_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const dataCultivar = await responseCultivar.json();
      setCultivar(dataCultivar)
      console.log(cultivar)
      const responseProdutividade = await fetch(`https://api.cnptia.embrapa.br/agritec/v1/produtividade?idCultura=${cultura}&idCultivar=338817&codigoIBGE=${city}&dataPlantio=2023-11-15`, {
        headers: {
          'Authorization': `Bearer ${AGROAPI_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const dataProdutividade = await responseProdutividade.json();
      console.log(dataProdutividade)
      setProdutividadeData(dataProdutividade.data);

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
            placeholder="Quantidade de terra"
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
          <select
            className="border-2 border-gray-300 p-2 rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Selecione o município</option>
            {municipios.map((municipio) => (
              <option key={municipio.codigoIBGE} value={municipio.codigoIBGE}>
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
              <option key={cultura.id} value={cultura.id}>
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
      <div className="border rounded-xl p-4 flex flex-col items-center">
        <h1 className="text-4xl uppercase font-bold text-primary">Zoneamento</h1>
        {zoneamento.length > 0 ? (
          <ul className="text-xl text-primary mt-4">
            {zoneamento.map((z, index) => (
              <li key={index}>
                <strong>Cultura:</strong> {z.cultura},
                <strong> Município:</strong> {z.municipio},
                <strong> Solo:</strong> {z.solo},
                <strong> Período:</strong> {z.diaIni}/{z.mesIni} até {z.diaFim}/{z.mesFim},
                <strong> Risco:</strong> {z.risco}%
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma informação de zoneamento disponível para a seleção atual.</p>
        )}

        <h1 className="text-4xl uppercase font-bold text-primary mt-8">Produtividade</h1>
        {/* {Object.keys(produtividadeData).length > 0 ? (
          <ul className="text-xl text-primary mt-4">
            {produtividadeData.produtividadeAlmejada.map((prod, index) => (
              <li key={index}>
                <strong>Produtividade Almejada:</strong> {prod} ton/ha,
                <strong> Produtividade Média do Município:</strong> {produtividadeData.produtividadeMediaMunicipio[index]} ton/ha,
                <strong> Temperatura Mínima:</strong> {produtividadeData.temperaturaMinima[index]}°C,
                <strong> Temperatura Máxima:</strong> {produtividadeData.temperaturaMaxima[index]}°C,
                <strong> Precipitação:</strong> {produtividadeData.precipitacao[index]} mm,
                <strong> Graus Dia:</strong> {produtividadeData.grausDia[index]},
                <strong> Balanço Hídrico:</strong> {produtividadeData.balancoHidrico[index]} mm,
                <strong> Deficiência Hídrica:</strong> {produtividadeData.deficienciaHidrica[index]} mm,
                <strong> Excedente Hídrico:</strong> {produtividadeData.excedenteHidrico[index]} mm,
                <strong> ISNA:</strong> {produtividadeData.isna[index]}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma informação de produtividade disponível para a seleção atual.</p>
        )} */}
      </div>
    </div>
  );
}

export default PlantationScreen;
