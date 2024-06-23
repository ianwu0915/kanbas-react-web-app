import React, { useState } from "react";
export default function EventObject() {
  const [event, setEvent] = useState(null);
  const handleClick = (e: any) => {
    e.target = e.target.outerHTML;
    console.log(e.target);
    delete e.view;
    setEvent(e);
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(event) => handleClick(event)}
        className="btn btn-primary"
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
  );}

