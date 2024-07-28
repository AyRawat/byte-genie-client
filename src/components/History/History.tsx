import styles from "./History.module.css"

interface HistoryProps{
    onClick: () => void;
    question: string;
}

const History:React.FC<HistoryProps> = ({question, onClick})=> {
return (
    <div className={styles.wrapper} onClick={onClick}>
    <p>{question.substring(0, 15)}...</p>
  </div>
)
} 

export default History