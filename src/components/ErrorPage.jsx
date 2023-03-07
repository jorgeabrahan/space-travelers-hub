import styles from '../css/Error.module.css';

function ErrorPage() {
  return (
    <div className={styles.error}>
      <h2 className={styles.h2}>Ups...Something went wrong!</h2>
      <p className={styles.p}>
        404 not found
      </p>
    </div>
  );
}

export default ErrorPage;
