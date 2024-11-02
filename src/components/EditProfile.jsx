import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState(""); 
    const [showToast,setShowtoast]=useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { 
                firstName, lastName, photoUrl, age, gender, about 
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowtoast(true);
            setError(""); 
            setTimeout(()=>{
              setShowtoast(false);
            },5000);
        } catch (err) {
            // Access the error response and set the error state accordingly
                setError(err.response.data || "An error occurred");
            
        }
    };

    // Reset error message when the user interacts with the input fields
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        if (error) {
            setError(""); // Clear the error message when input changes
        }
    };

    return (
        <>
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500 py-20 space-x-8">
            {/* Edit Profile Card */}
            <div className="card bg-base-100 w-96 shadow-2xl rounded-lg">
                <div className="card-body p-8">
                    <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">Edit Profile</h2>
                    <form>
                        <label className="form-control w-full max-w-xs my-4">
                            <span className="label-text text-base font-semibold text-white-700">First Name:</span>
                            <input 
                                type="text" 
                                value={firstName}
                                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                                onChange={handleInputChange(setFirstName)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-4">
                            <span className="label-text text-base font-semibold text-white-700">Last Name:</span>
                            <input 
                                type="text" 
                                value={lastName}
                                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                                onChange={handleInputChange(setLastName)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-4">
                            <span className="label-text text-base font-semibold text-white-700">Photo:</span>
                            <input 
                                type="text" 
                                value={photoUrl}
                                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                                onChange={handleInputChange(setPhotoUrl)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-4">
                            <span className="label-text text-base font-semibold text-white-700">Age:</span>
                            <input 
                                type="text" 
                                value={age}
                                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                                onChange={handleInputChange(setAge)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-4">
                            <span className="label-text text-base font-semibold text-white-700">Gender:</span>
                            <input 
                                type="text" 
                                value={gender}
                                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                                onChange={handleInputChange(setGender)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-4">
                            <span className="label-text text-base font-semibold text-white-700">About:</span>
                            <input 
                                type="text" 
                                value={about}
                                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                                onChange={handleInputChange(setAbout)}
                            />
                        </label>
                        {/* Error Message Display */}
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex justify-center mt-6">
                            <button 
                                type="button" 
                                className="btn btn-primary w-full max-w-xs text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600" 
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* UserCard with same size as Edit Profile Card */}
            <div className="card bg-base-100 w-96 shadow-2xl">
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
        </div>
        {showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved Successfully.</span>
  </div>
</div>)}
        </>
    );
};

export default EditProfile;
