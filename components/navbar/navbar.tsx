import Link from "next/link"
import styles from './navbar.module.css'
const Navbar = () =>{



    
return <nav className={styles.navbar}>
    <Link href={"/"}>Home</Link>
    <Link href={"/addPost"}>addPost</Link>
    <Link href={"/login"}>Sign in</Link>
    <Link href={"/register"}>Register</Link>
</nav>
}

export default Navbar