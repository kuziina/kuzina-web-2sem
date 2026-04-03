import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';

function App() {

  const havePage = true;

  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Table data={ buildings } amountRows={ (havePage === true) ? "10" : buildings.length } havePage={ havePage }/>
    </div>
  );
}

export default App;
