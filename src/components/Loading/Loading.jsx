import styles from './Loading.module.css'
import loadingImage from '../../images/loading.svg'

function Loading({searchValue}) {

  return (

    
    searchValue != undefined  ? (
      
    <div>
      <h2 className={styles.text}>Nenhum resultado :/</h2>
    </div>
    ): 
    (<img src={loadingImage} className={styles.loading}/>)
    
    
  )

}

export default Loading