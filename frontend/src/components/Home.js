import { useContext } from "react"
import { UserContext } from "../Context"

const Home = () => {
    const [login] = useContext(UserContext)

    return (
        <div className="flex flex-col mt-8 md:mx-40">
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-3 col-span-2 bg-gray-300 flex justify-center">
                    <div className="flex flex-col">
                        <img className="my-4" src="welcome.png" alt="Welcome" />
                        <h1>Welcome to Kucukdev</h1>
                        <h1>Your Personal Student Assistant</h1>
                    </div>
                </div>
                <div className="col-span-1 bg-red-300">2</div>
                <div className="row-span-2 col-span-1 bg-yellow-300">
                    <h1>Updates</h1>
                    <div>
                        <div className="py-2 px-4 bg-white shadow-lg rounded-lg my-8 max-w-sm mx-auto">
                            <div className="flex justify-center">
                                <div className="rounded-full border-2 border-indigo-500">
                                    <i className="object-cover fas fa-wrench fa-3x p-3"></i>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-gray-800 font-semibold">
                                    Update 1
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quae dolores deserunt ea
                                    doloremque natus error, rerum quas odio
                                    quaerat nam ex commodi hic, suscipit in a
                                    veritatis pariatur minus consequuntur!
                                </p>
                            </div>
                            <div className="flex justify-end mt-4">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-500"
                                >
                                    Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
