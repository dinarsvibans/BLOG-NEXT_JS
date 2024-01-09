"use client"
import styles from './page.module.css'
import AllBlogsRender from '../../components/allBlogsRender'

export default function Home() {
  return (
    <div className={styles.container}>
  
      <AllBlogsRender/>
    </div>
    
  )
}
