import React from "react";
import Navbar from "./components/navbar/Navbar";
import Cardswrapper  from "./components/cardWrapper/Hero";
import NewsContextWrapper from "./context/NewsContextAPI";
import './index.css'
function App() {
    return (
        <NewsContextWrapper>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                    <Cardswrapper />
                </header>
            </div>
        </NewsContextWrapper>
    );
}
export default App;