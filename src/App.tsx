// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <main className="container relative flex flex-col items-center justify-center gap-6">
          <Routes>
            <Route path="/" element={<PokemonList />} />

            <Route path="/pokemon/:name" element={<PokemonCard />} />

            <Route
              path="*"
              element={
                <p className="badge-lg badge-warning">
                  404: Page not found! Go back{" "}
                  <a href="/" className="underline">
                    home
                  </a>
                  .
                </p>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
