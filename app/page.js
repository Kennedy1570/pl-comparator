import Image from "next/image";
import "./globals.css"
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="container mt-5">
      <h1>EPL Player Comparison</h1>
      <div className="alert alert-primary mt-3 fpl-accent-bg text-center">
        Welcome to our premier league stats comparator
      </div>
      <button className="btn btn-success2 text-center">Compare Players</button>
      <button className="btn btn-primary text-center">View Teams</button>
    </main>
  );
}
