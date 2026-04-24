import './CSS/App.css';
import books from './data.js'
import Table from './components/Table';
// import InfoNumber from './components/numberComponent.js'
// import TemperatureComponent from './components/temperatureComponent.js'
// import CreateRange from './components/CreateRange.js'

function App() {
  return (
    <div className="App">
       <h3>Список бестселлеров</h3>
       <Table data={ books } amountRows="10"/>
       {/* <InfoNumber number="64"/>
       <TemperatureComponent valueK="225" valueF="-22"/>
       <CreateRange number="10" step="3"/> */}
    </div>
  );
}

export default App;
