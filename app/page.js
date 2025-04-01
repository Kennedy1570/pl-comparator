import Image from "next/image";
import Link from "next/link";
import "./globals.css"
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="container mt-5 text-center">
      <h1>EPL Player Comparison</h1>
      <div className="alert alert-primary mt-3 fpl-accent-bg">
        Welcome to our premier league stats comparator
      </div>
      <Link href="/compare" className="btn btn-success2">Compare Players</Link>
      <Link href="/api/teams" className="btn btn-primary">View Teams</button>
    </main>
  );
}
