import { useState } from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

import Message from '../src/components/Messages/Messages'
import Input from '../src/components/Input/Input'
import History from '../src/components/History/History'
import Clear from '../src/components/Clear/Clear'

interface IMessages {
    role: string
    content: string
}
interface IHistory {
    question: string
    answer: string
}
import './App.css'

const App: React.FC = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<IMessages[]>([])
    const [history, setHistory] = useState<IHistory[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
      if (input.trim() === '') return 
        setLoading(true)
        const prompt = {
            role: 'user',
            content: input,
        }
        const payload = {
            question: input,
            history: messages,
        }
        setMessages([...messages, prompt])
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
        }
        await fetch('http://127.0.0.1:5000/api/query', requestOptions)
            .then((data) => data.json())
            .then((data) => {
                console.log('DATA from your AI', data)

                setMessages((messages) => [
                    ...messages,
                    { role: 'assistant', content: data.response },
                ])
                setHistory((history) => [
                    ...history,
                    { question: input, answer: data.response },
                ])
                setInput('')
                setLoading(false)
            })
    }
    const clear = () => {
        setLoading(true)
        setMessages([])
        setHistory([])
        setLoading(false)
    }

    return (
        <div className="App">
            <div className="Column">
                <h3 className="Title">Event Assistant</h3>
                <div className="Content">
                    {messages.map((el: IMessages, i) => {
                        return (
                            <Message
                                key={i}
                                role={el.role}
                                content={el.content}
                            />
                        )
                    })}
                    {loading && (
                        <div className="Loader">
                            <RotatingTriangles
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="rotating-triangles-loading"
                                wrapperStyle={{}}
                                wrapperClass="rotating-triangles-wrapper"
                            />
                        </div>
                    )}
                </div>
                  {!loading && (
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onClick={handleSubmit}
                    />
                )}
            </div>
            <div className="Column">
                <h3 className="Title">History</h3>
                <div className="Content">
                    {history.map((el: IHistory, i) => {
                        return (
                            <History
                                key={i}
                                question={el.question}
                                onClick={() =>
                                    setMessages([
                                        {
                                            role: 'user',
                                            content: history[i].question,
                                        },
                                        {
                                            role: 'assistant',
                                            content: history[i].answer,
                                        },
                                    ])
                                }
                            />
                        )
                    })}
                </div>
                <Clear onClick={clear} />
            </div>
        </div>
    )
}

export default App
