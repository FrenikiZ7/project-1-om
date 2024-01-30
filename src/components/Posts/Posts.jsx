import { useEffect, useState } from "react"

import styles from './Posts.module.css'

import PostCard from "./PostCard"
import Button from "../Button/Button"
import Loading from "../Loading/Loading"
import Search from "../Search/Search"


function Posts() {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [photos, setPhotos] = useState([])

  
  const [startPage, setStartPage] = useState(0)
  const [endPage, setEndPage] = useState(8)

  const [searchValue, setSearchValue] = useState()
 

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



  function loadMorePosts(start, end) {
    
    start = startPage + 8
    end = endPage + 8

    setStartPage(prevState => prevState + 8)
    setEndPage(prevState => prevState + 8)
    
    const morePosts = allPosts.slice(start, end)
    setPosts([...posts, ...morePosts])
    
  }

  const noMorePosts = posts.length >= allPosts.length




  function handleChange(e) {
    setSearchValue(e.target.value)
  }


  const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
  :
    posts;

    

  return (

    <section className={styles.container}>
  
      <div className={styles.searchContainer}>
        <Search searchValue={searchValue} handleChange={handleChange}/>
      </div>

         { filteredPosts.length > 0 && photos.length > 0 ? ( 
            
           <div className={styles.posts}> 

              {filteredPosts.map(post => (

              
                <PostCard
                title={post.title} 
                key={post.id}
                id={post.id} 
                body={post.body}
                photos={photos}
                />
              

              ))}

           </div>

          ): 
          
            
           <div className={styles.loadingContainer}>
             <Loading searchValue={searchValue}/>
           </div>
            
          
          }
      
     

      <div className={styles.button_container}>
        {filteredPosts.length > 0 && !searchValue && <Button disabled={noMorePosts} text="Load More Posts" onClick={loadMorePosts}/>}
      </div>


    </section>

  )

}

export default Posts