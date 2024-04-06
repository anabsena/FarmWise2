import Auth from "../Auth"
import { SignInScreen } from "./SignInScreen"

export const SignIn = () => {
    return (
        <div className="grid grid-cols-2 bg-[#FBFFF9]">
            <Auth />
            <SignInScreen />
        </div>
    )

}