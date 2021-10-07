import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import NotePages from './pages/NotePages';

function App() {
  return (
    <Router>  

    <div className="container dark">
      <div className="app">
      <Header/>
      <Route path='/' exact component={NotesListPage} />
      <Route path='/note/:id' component={NotePages} />
      </div>
    </div>

    </Router>
  );
}

export default App;
