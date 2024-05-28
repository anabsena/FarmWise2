import { HeaderLand } from '../../components/Landing/Header/HeaderLand';
import { Button } from '../../components/ui/button';

export default function Landing() {
    const text = "Sobre Nós"; // Texto que queremos dividir em uma linha por letra

    return (
        <div className='w-full'>
            <HeaderLand />
            <div className="w-full grid grid-cols-2">
                <div className="col-span-1 w-full flex flex-col items-center justify-center gap-4">
                    <img src="/assets/FARMWISE.svg" alt="FarmWise" className="w-72" />
                    <h1 className="text-xl font-bold text-gray-800">Seu software de automação</h1>
                    <Button variant={'secondary'}>Entrar em Contato</Button>
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
                    <p className="w-2/3 text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae cupiditate vero sed quaerat nesciunt facere ipsa excepturi molestiae, velit, tempore repudiandae explicabo veritatis dolorem itaque iusto, culpa autem. Explicabo, nesciunt.</p>
                    <Button className="text-green-800" variant={'outline'}>Acesse nosso sistema</Button>
                </div>

            </div>
        </div>
    );
}
