import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"

export const SignInScreen = () =>{
    const navigate = useNavigate()
    const handleClickSignUp = () =>{
        navigate("/sign-up")
    }
    return(
        <div className="text-[#4C8630] text-2xl text-center">Bem vindo! Insira seu login!
        <Button onClick={handleClickSignUp}>Não tenho conta</Button></div>
        
    )

}