import Header from "./components/Header";

function App() {
  return (
    <div className="grid grid-rows-[5rem_auto_5rem] gap-6 h-screen">
      <Header />
      <main className="container flex flex-col items-center justify-center gap-6"></main>
    </div>
  );
}

export default App;
