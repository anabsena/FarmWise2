import Auth from "../Auth"
import { SignUpScreen } from "./SignUpScreen"

export const SignUp = () =>{
    return(
        <div className="grid grid-cols-2 bg-[#FBFFF9]">
            <Auth/>
            <SignUpScreen/>
        </div>
    )

}