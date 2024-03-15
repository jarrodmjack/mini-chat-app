"use client"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload }
		case "LOGOUT":
			return { user: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, () => {
		try {
			return JSON.parse(localStorage.getItem("user")) || { user: null }
		} catch (error) {
			return { user: null }
		}
	})
	const router = useRouter()
	const pathname = usePathname()
	// check for token in local storage to see if there is already a user logged in
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))
		console
		if (user) {
			dispatch({ type: "LOGIN", payload: user })
		} else {
			if (
				pathname === "/reset-password/[userId]/[token]" ||
				pathname === "/forgot-password"
			) {
				return
			} else {
				if (pathname !== "/") {
					router.push("/login")
				}
			}
		}
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
