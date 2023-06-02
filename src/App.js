import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

import Header from "./components/layout/Header/Header";
import Dashboard from "./containers/Dashboard/Dashboard";
import DetailsWeather from "./containers/DetailsWeather/DetailsWeather";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            exact
            path="/weather-details/:location"
            element={<DetailsWeather />}
          />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
