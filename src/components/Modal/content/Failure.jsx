import styles from './Failure.module.css'

const Failure = () => (
  <>
    <div className={styles['circle-border']}></div>
    <div className={styles.circle}>
      <div className={styles.error}></div>
    </div>
  </>
)

export default Failure
