import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import PreviewCard from "./PreviewCard";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setProfilePic(user.profilePic || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const saveProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/patchProfile",
        { firstName, lastName, profilePic, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      const status = err?.response?.status;
      if ([401, 403, 404, 500].includes(status)) {
        navigate("/error", { state: { code: status } });
      } else {
        setError(err?.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "First Name",
      value: firstName,
      setter: setFirstName,
      placeholder: "John",
      type: "text",
    },
    {
      label: "Last Name",
      value: lastName,
      setter: setLastName,
      placeholder: "Doe",
      type: "text",
    },
    {
      label: "Photo URL",
      value: profilePic,
      setter: setProfilePic,
      placeholder: "https://...",
      type: "text",
    },
    {
      label: "Age",
      value: age,
      setter: setAge,
      placeholder: "25",
      type: "number",
    },
    {
      label: "Gender",
      value: gender,
      setter: setGender,
      placeholder: "Male / Female / Other",
      type: "text",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">
        <div className="card bg-base-100/80 backdrop-blur-md shadow-xl border border-primary/20 rounded-2xl w-full max-w-md">
          <div className="card-body space-y-3 py-6">

            <div className="flex flex-col items-center gap-1 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="text-primary">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary tracking-wide">
                Edit Profile
              </h2>
              <p className="text-xs text-base-content/50">
                Update your details below
              </p>
            </div>

            {fields.map(({ label, value, setter, placeholder, type }) => (
              <div className="form-control" key={label}>
                <label className="label py-1">
                  <span className="label-text text-base-content/80 text-xs">
                    {label}
                  </span>
                </label>
                <input
                  type={type}
                  value={value}
                  placeholder={placeholder}
                  className="input input-bordered input-sm bg-base-200/60 focus:border-primary focus:outline-none w-full"
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            ))}

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-base-content/80 text-xs">
                  About
                </span>
              </label>
              <textarea
                value={about}
                placeholder="Write a short bio..."
                rows={3}
                className="textarea textarea-bordered textarea-sm bg-base-200/60 focus:border-primary focus:outline-none w-full resize-none"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {error && (
              <label className="label pt-0">
                <span className="label-text-alt text-error flex items-center gap-1">
                  ⚠️ {error}
                </span>
              </label>
            )}

            <div className="pt-1">
              <button
                className="btn btn-primary w-full text-base font-semibold tracking-wide hover:scale-[1.02] transition-all duration-300"
                onClick={saveProfile}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Save Profile"
                )}
              </button>
            </div>
          </div>
        </div>

        <PreviewCard />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;