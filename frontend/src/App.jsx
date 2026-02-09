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
  const [review, setReview]=useState(``)

  async function reviewCode(){
      const response= await axios.post('http://localhost:3000/ai/get-review',{ code });
      setReview(response.data);
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

        <div onClick={reviewCode} className="review">Review</div>
      </div>

      <div className="right">
         <Markdown>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
