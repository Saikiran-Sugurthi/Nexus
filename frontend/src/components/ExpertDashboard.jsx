import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ExpertDashboard = () => {
    // State for form fields with proper initial values
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userInfoString = localStorage.getItem("UserInfo");
            if (!userInfoString) {
                toast.error("You must be logged in to create a webinar.");
                setLoading(false);
                return;
            }

            const userInfo = JSON.parse(userInfoString);

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            const webinarData = { title, description, dateTime, isPrivate };

            const { data } = await axios.post(
                "http://localhost:3000/api/webinars",
                webinarData,
                config
            );

            if (data) {
                toast.success("Webinar Created Successfully!");
                setTitle("");
                setDescription("");
                setDateTime("");
                setIsPrivate(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to Create Webinar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h1 className="mb-4">Expert Dashboard</h1>

                    {/* Create Webinar Form Card */}
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title h4 mb-4">Create a New Webinar</h2>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Title Input */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        placeholder="e.g., Introduction to React Hooks"
                                    />
                                </div>

                                {/* Description Input */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder="Describe what your webinar is about..."
                                    />
                                </div>

                                {/* Date and Time Input */}
                                <div className="mb-3">
                                    <label htmlFor="dateTime" className="form-label">Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        id="dateTime"
                                        className="form-control"
                                        value={dateTime}
                                        onChange={(e) => setDateTime(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* isPrivate Checkbox */}
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        id="isPrivate"
                                        className="form-check-input"
                                        checked={isPrivate}
                                        onChange={(e) => setIsPrivate(e.target.checked)}
                                    />
                                    <label htmlFor="isPrivate" className="form-check-label">Make this a private webinar</label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100"
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="ms-2">Creating...</span>
                                        </>
                                    ) : (
                                        'Create Webinar'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertDashboard;
