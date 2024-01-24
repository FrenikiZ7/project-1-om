import { useEffect, useState } from "react"

import styles from './Posts.module.css'

import PostCard from "./PostCard"
import Button from "../Button/Button"
import Loading from "../Loading/Loading"


function Posts() {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [photos, setPhotos] = useState([])

  
  const [startPage, setStartPage] = useState(0)
  const [endPage, setEndPage] = useState(4)
 

  useEffect(() => {
   
   fetch('https://jsonplaceholder.typicode.com/posts', {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
   })
   .then(resp => resp.json())
   .then(data => {

    setAllPosts(data)
    setPosts(data.slice(startPage, endPage))
    
   })
   .catch((err) => console.log(err))

  }, [])


  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/photos', {
      method: 'GET',
      headers: {
       'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(data => {

      setPhotos(data)

    })

    .catch((err) => console.log(err))

  }, [])

  const loadMorePosts = (e) => {
   
    e.preventDefault()

    console.log(`antes do state alterar o startpage é ${startPage} e o endpage é ${endPage}`)

    setStartPage(startPage + 4)
    setEndPage(endPage + 4)

    console.log(` após o state alterar o startpage é ${startPage} e o endpage é ${endPage}`)
    console.log('RUN FINALIZADA')
    
    const morePosts = allPosts.slice(startPage, endPage)
    posts.push(...morePosts)
    
  }



  return (

    <section className={styles.container}>

      <div className={styles.posts}>

         {
          posts.length > 0 && photos.length > 0 ? (

            posts.map(post => (

              <PostCard
               title={post.title} 
               key={post.id}
               id={post.id} 
               body={post.body}
               photos={photos}
              />
                
            ))

          ): 
          
          <Loading/>


         }
      
      </div>

      <div className={styles.button_container}>
        <Button disabled={false} text="Load More Posts" onClick={loadMorePosts}/>
      </div>


    </section>

  )

}

export default Posts