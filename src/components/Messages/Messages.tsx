import styles from "./Messages.module.css";
import bot from "../../icons/bot.png"
import user from "../../icons/user.png"

interface MessageProps{
 role: string;
 content: string;
}

const Message:React.FC<MessageProps> = ({role, content})=>{
 return( <div className={styles.wrapper}>
    <div>
      <img
        src={role === "assistant" ? bot : user}
        className={styles.avatar}
        alt="profile avatar"
      />
    </div>
    <div>
      <p>{content}</p>
    </div>
  </div>)
}

export default Message;