import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"

export const SignUpScreen = () =>{
    const navigate = useNavigate()
    const handleClickSignIn = () =>{
        navigate("/sign-in")
    }
    return(
        <div className="text-[#4C8630] text-2xl text-center">Cadastre-se
        <Button onClick={handleClickSignIn}>Login</Button></div>
    )

}