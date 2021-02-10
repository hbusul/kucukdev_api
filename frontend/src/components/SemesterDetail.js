import UserConsumer from "../Context"

const SemesterDetail = (props) => {

    const sid = props.match.params.id;

    return (
        <UserConsumer>
            {
                value => {
                    // const { userToken, userID } = value;

                    return (
                        <div className="flex w-screen" >
                            <div className="mx-auto">
                                <div className="flex m-4">
                                    <h1>{sid}</h1>
                                </div>

                            </div>

                        </div>
                    )


                }
            }
        </UserConsumer>
    )
}

export default SemesterDetail