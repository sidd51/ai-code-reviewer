import { useState } from "react";
import Editor from "react-simple-code-editor";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import Markdown from 'react-markdown'
import axios from 'axios'
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
  }`);
  const [review, setReview]=useState(``);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState("");

  async function reviewCode(){
      setLoading(true)
      setError("")
      try{
      const response= await axios.post('http://localhost:3000/ai/get-review',{ code });
      setReview(response.data);
      }
      catch{
        setError("❌ Failed to fetch review. Try again.");
      }
     
      setLoading(false);
  }
  return (
    <main> 
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              backgroundColor: "#1e1e1e",
              color: "white",
              minHeight: "100%",
              borderRadius: "8px",
            }}
          />
        </div>

        <button onClick={reviewCode} disabled={loading} className="review">
          {loading ? "Reviewing..." : "Review Code 🚀"}
        </button>
      </div>
      
      <div className="right">
        <Markdown>{review}</Markdown>
        
        
        {error && <p className="error" style={{color: "red"}}>{error}</p>}
      </div>
    </main>
  );
}

export default App;
