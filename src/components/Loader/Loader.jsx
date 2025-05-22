import { RingLoader } from 'react-spinners'
import styles from './Loader.module.css'


export default function Loader () {

  return (
    <RingLoader className={styles.loader} />
  )
  }