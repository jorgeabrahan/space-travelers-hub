import styles from '../css/Error.module.css';

function ErrorPage() {
  return (
    <div className={styles.error}>
      <h2 className={styles.errorTitle}>Ups...Something went wrong!</h2>
      <p className={styles.errorMessage}>
        404 not found
      </p>
    </div>
  );
}

export default ErrorPage;
