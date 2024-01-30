import styles from './Search.module.css'

function Search({searchValue, handleChange}) {

  return (

    <input type="search" value={searchValue} name="" id="" onChange={handleChange} className={styles.search} placeholder='Pesquise os'/>

  )
}

export default Search