import React, { useState } from "react";

export default function Textfun() {
  const [Text, setText] = useState("");

  // handel textarea
  const textareaClick = (event) => {
    setText(event.target.value);
  }

  //Count Lenght
  let TextLength = Text.length;

  //Count Word
  let WordCount = Text.split(' ').filter((n)=>{return n !== ''}).length;
  // WordCount.toString().split(' ,')

  // Count Character
  let CharacteCount = Text.trim().split('').filter((n)=>{return n !==' '}).length;

  // Upppercase
  let upperCase = ()=>{
    let toUpper = Text.toUpperCase();
    setText(toUpper);
  }

  // lowercase
  let lowerCase = ()=>{
    let toLower = Text.toLowerCase();
    setText(toLower);
  }
  
  // capitlize
  let capitalizeCase = ()=>{
    let toSplit= Text.split(' ');
    let strin = toSplit.map((n)=>{
      return n.charAt(0).toUpperCase() + n.slice(1);
    })
    let realCapital = strin.toString();
    console.log(realCapital);
    setText(realCapital);
  }

  // Copy Text
  let copyText = ()=>{
    var CopyTexT = document.getElementById("Textarea");
    CopyTexT.select();
    navigator.clipboard.writeText(CopyTexT.value);
  }

  return (
    <div className="pt-5 w-75 m-auto">
      <div className="my-5">
        <textarea
          className="form-control border border-info bg-info text-wrap bg-opacity-10 rounded-end"
          placeholder="Type Word"
          style={{ height: "300px" }}
          id="Textarea"
          value={Text}
          onChange={textareaClick}
        ></textarea>
        
        <div className="group mt-2 opacity-50 fs-5">
          <div className="d-flex flex-wrap">
            <div className="mx-3">
              {" "}
              Character {" "}
              <span className="badge rounded-5 bg-dark">{CharacteCount}</span>
            </div>
            <div className="mx-3">
              {" "}
              Word <span className="badge rounded-4 bg-dark">{WordCount} </span>
            </div>
            <div className="mx-3">
              {" "}
              Length {" "}
              <span className="badge rounded-5 bg-dark">{TextLength} </span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap container">
        <div className="m-2">
          <button type="button gap-3" className="btn btn-primary" onClick={upperCase}>
            UpperCase
          </button>
        </div>
        <div className="m-2">
          <button type="button gap-3" className="btn btn-primary" onClick={lowerCase}>
            LowerCase
          </button>
        </div>
        <div className="m-2">
          <button type="button gap-3" className="btn btn-primary" onClick={capitalizeCase}>
            Capitlize
          </button>
        </div>
        <div className="m-2">
          <button type="button gap-3" className="btn btn-primary" onClick={copyText}>
            Copy
          </button>
        </div>
        <div className="m-2">
          <button type="button gap-3" className="btn btn-danger" onClick={()=>{setText('')}}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
