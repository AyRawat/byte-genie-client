import {useState} from 'react';

const Home:React.FC = ()=>{
    const [question, setQuestion] = useState("")
    const [response, setResponse] = useState(" ")
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }
    const handleSubmit = async ()=>{
        
        setLoading(true);
        try {
            const raw = JSON.stringify({
                question: question,
                history: ""
            });

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: raw,
            };

            const res = await fetch('http://127.0.0.1:5000/api/query', requestOptions);
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
        
    }
return (      
     <div>
    {loading ? (
        <p>Loading....</p>
    ) : (
        <>
            <p>Ask your Question</p>
            <form onSubmit={handleSubmit} className="question-form">
                <input
                    type="text"
                    value={question}
                    onChange={handleInputChange}
                    placeholder="Ask a question..."
                    className="question-input"
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            {response && <div className="response">{response}</div>}
        </>
    )}
</div>)
}

export default Home;