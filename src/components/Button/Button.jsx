import styles from './Button.module.css'

function Button({onClick, text, disabled}) {

  return (

    <button disabled={disabled} onClick={onClick} className={styles.btn}>{text}</button>
    
  )

}

export default Button