import { useEffect } from "react"
import { useAuth } from 'react-oauth2-pkce'

const Login = (props) => {
    const { authService } = useAuth();
    const authLogin = async () => authService.authorize();

    useEffect(() => {
        if (authService.isAuthenticated()) {
            props.history.push('/');
        } else {
            authLogin();
        }
    }, [])

    return <h1>Redirecting</h1>
}

export default Login
