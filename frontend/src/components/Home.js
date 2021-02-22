import { useContext } from 'react'
import { UserContext } from "../Context";

const Home = () => {
    const [login] = useContext(UserContext);

    return (
        <div>
            {
                login ?
                    <div className="flex h-full">
                        <h1 className="text-md mx-auto mt-48">{login.userToken}</h1>
                        <h1 className="text-md mx-auto mt-48">{login.userID}</h1>
                    </div > :
                    <div>
                        <h1 className="text-xl mx-auto mt-48">Welcome to Kucukdev.org!</h1>

                    </div>
            }

        </div>

    )
}

export default Home
