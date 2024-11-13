import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { logPrint } from "./logPrint";

export const LoginPage = (props) => {
    const onLoginSuccess = props.onLoginSuccess;

    return (
        <GoogleOAuthProvider clientId="431821786411-18o4aeiuqavsik193277pofu37jtma9i.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={() => {
                    logPrint("@LoginBtnClick", "Login Failed");
                }}
            />
        </GoogleOAuthProvider>
    );
};
