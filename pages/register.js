import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const RegisterForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link href = {"/login"} className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Login</Link>
                </p>
                <div className='bg-gray-800 text-white w-full py-2 mt-6 rounded-full transition-transform hover:bg-gray-900 active:scale-95 flex justify-center items-center gap-2 cursor-pointer group'>
                    <FcGoogle size={22}/>
                    <span>Login with Google</span>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Name</label>
                        <input type="text" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500' required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Email</label>
                        <input type="email" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500' required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Password</label>
                        <input type="password" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500' required autoComplete="on"/>
                    </div>
                    <button className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Sign Up</button>
                </form>
            </div>
        </main>
    );
};

export default RegisterForm;
