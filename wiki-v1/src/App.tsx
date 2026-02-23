import { WikiEditor } from './components/WikiEditor';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Wiki</h1>
      </header>
      <main className="app-main">
        <WikiEditor />
      </main>
    </div>
  );
}

export default App;
