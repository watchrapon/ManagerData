import './App.css';
import './styles/UserList.css';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ระบบจัดการผู้ใช้งาน</h1>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  )
}

export default App;
