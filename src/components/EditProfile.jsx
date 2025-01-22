import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showUserCard, setShowUserCard] = useState(true); // Track UserCard visibility
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth < 390 || window.innerHeight < 560;
            setShowUserCard(!isSmallScreen);
        };

        // Check on initial load and add listener
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setError("");
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        } catch (err) {
            setError(err.response?.data || "An error occurred");
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        if (error) setError("");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500 py-8 px-4 sm:px-8">
            {/* Responsive Layout */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Edit Profile Card */}
                <div className="card bg-base-100 shadow-lg rounded-lg p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">Edit Profile</h2>
                    <form>
                        {[
                            { label: "First Name", value: firstName, setter: setFirstName },
                            { label: "Last Name", value: lastName, setter: setLastName },
                            { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
                            { label: "Age", value: age, setter: setAge, type: "number" },
                            { label: "Gender", value: gender, setter: setGender },
                            { label: "About", value: about, setter: setAbout, textarea: true },
                        ].map(({ label, value, setter, type = "text", textarea }, index) => (
                            <label key={index} className="block mb-4">
                                <span className="block text-sm sm:text-base font-semibold text-gray-700">{label}:</span>
                                {textarea ? (
                                    <textarea
                                        value={value}
                                        className="textarea textarea-bordered w-full mt-2 bg-white text-gray-900"
                                        onChange={handleInputChange(setter)}
                                    ></textarea>
                                ) : (
                                    <input
                                        type={type}
                                        value={value}
                                        className="input input-bordered w-full mt-2 bg-white text-gray-900"
                                        onChange={handleInputChange(setter)}
                                    />
                                )}
                            </label>
                        ))}
                        {/* Error Message */}
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {/* Save Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                className="btn btn-primary w-full sm:w-auto px-6 py-2 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>

                {/* User Card (Dynamically Hidden) */}
                {showUserCard && (
                    <div className="card bg-base-100 shadow-lg rounded-lg p-6 sm:p-8 flex items-center justify-center">
                        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} showActions={false} />
                    </div>
                )}
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
