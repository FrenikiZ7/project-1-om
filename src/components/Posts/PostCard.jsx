import styles from './PostCard.module.css'

function PostCard({title, id, body, photos}) {

 return (

  <div className={styles.post}>
            
    <img src={photos[id].url} alt={title}/>

    <div className={styles.post_content}>
        
       <h2>{title} {id}</h2>
       <p>{body}</p>

    </div>
      
  </div>

 )


}


export default PostCard