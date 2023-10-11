import React from 'react';
import './App.css';
import LineChartPDF from './LineChartPDF';
import { useReactToPrint } from 'react-to-print';

function App() {
  const ref = React.useRef();
  const [reload, setReload] = React.useState(1);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const handlePrint2 = () => {
    if(ref.current) {
      // Show the chart by removing the "hidden" class
      ref.current.style.display = 'block';
      setReload(reload + 1);
      handlePrint();
      ref.current.style.display = 'none';
    }
  }
  return (
    <div className="App">
      <div className="button-container-div">
        <button onClick={handlePrint2}>Print</button>
      </div>
      <div ref={ref} className='hidden'>
        <LineChartPDF reload={reload}/>
      </div>
    </div>
  );
}

export default App;
