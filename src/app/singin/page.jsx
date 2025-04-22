"use client";
import React, { useState } from "react";
import Link from "next/link";
import { singinuser } from "../action/auth/singinUser";

const Singuppage = () => {
    const [imgPreview, setImgPreview] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    const Img_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const image_hosting = `https://api.imgbb.com/1/upload?key=${Img_key}`;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImgFile(file);
        setImgPreview(URL.createObjectURL(file));
    };

    const handlesingup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        let imageUrl = "";

        if (imgFile) {
            const formData = new FormData();
            formData.append("image", imgFile);

            try {
                const res = await fetch(image_hosting, {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                imageUrl = data?.data?.url;
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }

        const userData = {name, email, password, imageUrl };
        console.log("Final Signup Data:", userData);
        singinuser({name, email, password, imageUrl})

        // 🔄 Send userData to your backend here if needed
    };

    return (
        <div className='border my-16 border-gray-500 p-3 w-full rounded-2xl max-w-lg mx-auto flex flex-col items-center justify-center'>
            <h2 className="text-2xl text-[#ffc107] font-bold mb-6 text-center">Register</h2>

            <form onSubmit={handlesingup}>
                <label className="form-control w-full">
                    <span className="label-text font-bold">Name</span>
                    <input type="text" name="name" className="input input-bordered w-full" required />
                </label>

                <label className="form-control mt-4 w-full">
                    <span className="label-text font-bold">Email</span>
                    <input type="email" name="email" className="input input-bordered w-full" required />
                </label>

                <label className="form-control mt-4 w-full">
                    <span className="label-text font-bold">Password</span>
                    <input type="password" name="password" className="input input-bordered w-full" required />
                </label>

                <label className="form-control mt-4 w-full">
                    <span className="label-text font-bold">Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                    {imgPreview && <img src={imgPreview} alt="Preview" className="w-32 rounded-full h-32 mt-2  object-cover" />}
                </label>

                <button type="submit" className="w-full h-12 mt-6 bg-yellow-500 rounded-3xl text-black font-bold">
                    Sign Up
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>Or Sign In with</p>
                <p>
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#ffc107] font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Singuppage;
