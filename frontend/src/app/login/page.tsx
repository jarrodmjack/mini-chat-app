'use client'
import React, { useState } from "react"
import { useLogin } from "@/hooks/useLogin"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
;("use-client")
import { FaArrowLeft } from "react-icons/fa"

const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const [isLoading, setIsLoading] = useState(false)

    const { login, error, isLoading } = useLogin()
    const { user } = useAuthContext()
    const router = useRouter()

    const handleLogin = async () => {
        await login(email, password)
    }

    if (user) {
        router.push("/")
    }

    return (
        <div className="h-screen flex flex-col justify-center gap-4 items-center">
            <h2 className="text-2xl font-semibold">Log in to MoveWeights</h2>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form>
                    <div className="card-body">
                        <Link href="/">
                            <FaArrowLeft />
                        </Link>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                value={email}
                                type="text"
                                placeholder="email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                value={password}
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                            />
                            <label className="label">
                                <Link
                                    href="/forgot-password"
                                    className="text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin()
                                }}
                                disabled={isLoading}
                                className="btn bg-primary-focus text-white"
                            >
                                {isLoading ? (
                                    <span className="loading loading-dots loading-xl"></span>
                                ) : (
                                    <span>Log in</span>
                                )}
                            </button>
                        </div>
                        <p>
                            Don't have an account?{" "}
                            <Link
                                className="text-primary underline"
                                href="/signup"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login
