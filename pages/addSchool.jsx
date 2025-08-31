"use client";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSchool() {
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // ✅ loading state

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("contact", data.contact);
        formData.append("email_id", data.email_id);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            setLoading(true); // ✅ start loading
            const res = await fetch("/api/addSchool", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            setMessage(result.message || result.error);
            reset();
        } catch (err) {
            setMessage("Something went wrong");
        } finally {
            setLoading(false); // ✅ stop loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
            <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Add School</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    <input
                        {...register("name")}
                        placeholder="School Name"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register("address")}
                        placeholder="Address"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register("city")}
                        placeholder="City"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register("state")}
                        placeholder="State"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register("contact", {
                            required: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Only digits are allowed"
                            }
                        })}
                        placeholder="Contact"
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register("email_id")}
                        placeholder="Email"
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register("image")}
                        type="file"
                        accept="image/*"
                        required
                        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-blue-600 file:text-white 
                       hover:file:bg-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading} // ✅ disable while loading
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition duration-200 flex items-center justify-center"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Add School"
                        )}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-sm text-green-400">{message}</p>
                )}
            </div>
             {/* Footer */}
             <Footer/>
      
        </div>
    );
}
