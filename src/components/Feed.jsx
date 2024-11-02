import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // State to track loading status

    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            console.log('Response data:', res.data);
            dispatch(addFeed(res.data));
        } catch (err) {
            console.error('Error fetching feed:', err);
        } finally {
            setLoading(false); // Stop loading after request
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (loading) return <h1 className="flex justify-center my-10">Loading...</h1>; // Loading state
    if (!feed || feed.length === 0) return <h1 className="flex justify-center my-10">No new users found!</h1>;

    return (
        <div className="flex justify-center my-10 pb-20">
            <UserCard user={feed[0]} />
        </div>
    );
};

export default Feed;
