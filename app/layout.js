import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: "English Premier League player comaprisons",
  description: "Comparing stats of premier league players"
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
