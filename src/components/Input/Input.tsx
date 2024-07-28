import styles from "./Input.module.css";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
  }

const Input:React.FC<InputProps> = ({ value, onChange, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.text}
        placeholder="Your prompt here..."
        value={value}
        onChange={onChange}
      />
      <button className={styles.btn} onClick={onClick}>
        Go
      </button>
    </div>
  );
}

export default Input