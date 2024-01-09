"use client"


import { signOut } from "next-auth/react"



const UserInfo = () => {
    return (
        <div>
            <div>user info</div>
            <div>user info</div>
            <button onClick={() => signOut()}>LogOut</button>
        </div>
    )
}
export default UserInfo