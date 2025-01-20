import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connection", {
                withCredentials: true,
            });
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) return <h1 className="flex justify-center my-10">No Connections Found!</h1>;

    return (
        <div className="text-center my-10 pb-20">
            <h1 className="font-bold text-white text-3xl mb-5">Connections</h1>
            {connections.filter(connection => connection !== null).map((connection) => {
                const { _id, firstName, lastName, photoUrl, skills, about, age, gender } = connection;
                return (
                    <div
                        key={_id}
                        className="flex m-4 p-4 rounded-lg bg-base-300 max-w-3xl mx-auto mb-5 w-full"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-7 flex-grow">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;
