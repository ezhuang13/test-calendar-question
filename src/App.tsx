import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import React from "react";
import Calendar from "./Calendar.tsx";

const App = () => {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
};

export default App;
