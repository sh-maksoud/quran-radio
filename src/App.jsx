import Header from './components/Header';
import Footer from './components/Footer';
import RadioPlayer from './components/RadioPlayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Quran Radio</h1>
        <RadioPlayer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
