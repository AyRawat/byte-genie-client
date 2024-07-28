import styles from "./Clear.module.css";

interface ClearProps {
    onClick: ()=> void
}

const Clear:React.FC<ClearProps> = ({ onClick }) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      Clear
    </button>
  );
}

export default Clear