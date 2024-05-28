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
            Seu software de automação
          </h1>
          <Button variant={"secondary"}>Entrar em Contato</Button>
        </div>
        <div className="col-span-1">
          <img src="/assets/planta1.svg" alt="Planta 1" className="w-full" />
        </div>
      </div>
      <section id="sobre" className="sectionondulado">
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
            <p className="w-2/3 text-center">
              Bem-vindos à nossa equipe dedicada! Somos um grupo composto por
              Ana, Caio, Guilherme, Kaue e Kayan. Unimos forças com um propósito
              claro: simplificar e acelerar o processo para os produtores como
              você. Aqui, a promessa é clara - você terá tudo o que precisa,
              exatamente quando precisa, em um único lugar. Estamos
              comprometidos em tornar sua jornada mais fácil e eficiente,
              proporcionando soluções abrangentes para todas as suas
              necessidades. Estamos ansiosos para trabalhar juntos e facilitar
              cada passo do seu caminho!
            </p>
            <Button className="text-green-800" variant={"outline"}>
              Acesse nosso sistema
            </Button>
          </div>
        </div>
      </section>
      <section
        id="comofunciona"
        className="ComoFunciona bg-gray-100 py-16 mt-36 pt-64"
      >
        <div className="container mx-auto">
          <h1 className="text-3xl font-extralight text-green-700 text-center mb-28 text-7xl">
            Como Funciona
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="flex flex-col items-center border-lime-700 rounded-3xl border-solid border-2 ">
              <h3 className="text-2xl font-semibold mb-4 py-6 px-8 text-gray-500 ">
                SESSÃO PARCEIROS
              </h3>
              <p className="text-gray-700 mb-4 text-center py-3 px-8 text-black">
                Possibilidade de mostrar sua marca como recomendação de compra
              </p>
              <img
                src="/assets/recomendado 1.svg"
                alt=""
                className="w-20 h-20 mb-12 "
              />
            </div>
            <div className="flex flex-col items-center  border-lime-700 rounded-3xl border-solid border-2 ">
              <h3 className="text-2xl font-semibold mb-4 py-6 px-8 text-gray-500 text-2xl ">
                CLIMA E COTAÇÕES
              </h3>
              <p className="text-gray-700 mb-4 text-center py-3 px-8 text-black">
                Conte com atualização atual do clima e da cotação do dolar, tudo
                na palma da mão
              </p>
              <img
                src="/assets/atualizacao-do-sistema 1.svg"
                alt=""
                className="w-20 h-20 mb-12"
              />
            </div>
            <div className="flex flex-col items-center  border-lime-700 rounded-3xl border-solid border-2 ">
              <h3 className="text-2xl font-semibold mb-4 py-6 px-8 text-gray-500">
                SUGESTÕES EXCELENTES
              </h3>
              <p className="text-gray-700 mb-4 text-center py-3 px-8 text-black">
                Informações sobre o seu plantio o sistema gera algumas sugestões
                para você
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
