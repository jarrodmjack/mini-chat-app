"use client"
import React, {
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from "react"
import io from "socket.io-client"
import { useAuthContext } from "@/hooks/useAuthContext"

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ children }: PropsWithChildren) {
    const { user } = useAuthContext()
    const [socket, setSocket] = useState<any>() // io socket instance
    // // creating a new socket only if we are loading for the first time, or our id changes (different user now logged in)
    useEffect(() => {
        if (!user) return

        const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
            query: { id: user.id },
        })
        setSocket(newSocket)
        const cleanup = () => {
            // socket cleanup whenever this function runs a second time
            newSocket.close()
        }
        return cleanup
    }, [user])


    return (
        <SocketContext.Provider value={{test: "test"}}>
            {children}
        </SocketContext.Provider>
    )
}
