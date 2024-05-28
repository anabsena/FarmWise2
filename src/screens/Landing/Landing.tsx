import { HeaderLand } from "../../components/Landing/Header/HeaderLand";
import { Button } from "../../components/ui/button";

export default function Landing() {
  const text = "Sobre Nós"; // Texto que queremos dividir em uma linha por letra

  return (
    <div className="w-full">
      <HeaderLand />
      <div className="w-full grid grid-cols-2">
        <div className="col-span-1 w-full flex flex-col items-center justify-center gap-4">
          <img src="/assets/FARMWISE.svg" alt="FarmWise" className="w-72" />
          <h1 className="text-xl font-bold text-gray-800">
            Seu software de sugestões
          </h1>
          <Button variant={"secondary"}>Entrar em Contato</Button>
        </div>
        <div className="col-span-1">
          <img src="/assets/planta1.svg" alt="Planta 1" className="w-full" />
        </div>
      </div>
      <div className="w-full h-screen relative flex  ">
        <img src="/assets/fundo.svg" alt="" className="absolute" />
        <div className="flex items-center justify-center h-full absolute ">
          <h1 className="text-5xl text-center text-white">
            {text.split("").map((letter, index) => (
              <span key={index} className=" flex flex-col  uppercase gap-8">
                {letter}
              </span>
            ))}
          </h1>
        </div>
        <div className="w-full h-full z-50 flex justify-center items-center text-white flex-col gap-4">
          <div className="w-2/3 text-center flex flex-col gap-4">
            <span className="text-3xl">Bem-vindo à FarmWise!</span>
            <span >🌦 Previsão do Tempo: Acompanhe a previsão do tempo para a semana inteira, atualizada em tempo real.</span>

            <span >💵 Cotação do Dólar: Fique por dentro das cotações do dólar, sempre atualizadas para você tomar as melhores decisões financeiras.</span><br />

            <span >🌱 Gestão de Plantações: Preencha as informações da sua plantação e receba sugestões personalizadas e informações essenciais para otimizar o seu cultivo.</span><br />
          </div>
          <Button className="text-green-800" variant={"outline"}>
            Acesse nosso sistema
          </Button>
        </div>
      </div>
      <section
        className="  h-screen flex flex-col justify-center"
      >
        <div className="container mx-auto">
          <h1 className="font-light text-green-700 text-center mb-28 text-7xl">
            Como Funciona
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="flex flex-col items-center border-lime-700 rounded-3xl border-solid border-2 ">
              <h3 className="text-2xl font-semibold mb-4 py-6 px-8 text-gray-500 ">
                Previsão do Tempo
              </h3>
              <p className="text-gray-700 mb-4 text-center py-3 px-8 ">
                Receba previsões meteorológicas precisas e atualizadas para a semana inteira.
              </p>
              <img
                src="/assets/recomendado 1.svg"
                alt=""
                className="w-20 h-20 mb-12 "
              />
            </div>
            <div className="flex flex-col items-center  border-lime-700 rounded-3xl border-solid border-2 ">
              <h3 className="text-2xl font-semibold mb-4 py-6 px-8 text-gray-500">
                Cotação do Dólar
              </h3>
              <p className="text-gray-700 mb-4 text-center py-3 px-8 ">
                Tome decisões financeiras informadas e maximize seus lucros.
              </p>
              <img
                src="/assets/atualizacao-do-sistema 1.svg"
                alt=""
                className="w-20 h-20 mb-12"
              />
            </div>
            <div className="flex flex-col items-center  border-lime-700 rounded-3xl border-solid border-2 ">
              <h3 className="text-2xl font-semibold mb-4 py-6 px-8 text-gray-500">
                Gestão de Plantações
              </h3>
              <p className="text-gray-700 mb-4 text-center py-3 px-8 ">
                Melhore a produtividade e a saúde do seu cultivo com recomendações específicas.
              </p>
              <img
                src="./assets/sugestao 1.svg"
                alt=""
                className="w-20 h-20 mb-12"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-20">
          <a
            href="http://farmwise.vercel.app"
            className="bg-green-700 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition duration-300 "
          >
            Acesse nosso sistema
          </a>
        </div>
      </section>
    </div>
  );
}
