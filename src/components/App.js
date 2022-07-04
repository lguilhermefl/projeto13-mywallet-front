import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./shared/styles/globalStyles";

import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import NewEntry from './NewIncome';
import NewExit from './NewExpense';
import EditEntry from './EditEntry';


export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-income" element={<NewEntry />} />
        <Route path="/new-expense" element={<NewExit />} />
        <Route path="/edit-entry/:id" element={<EditEntry />} />
      </Routes>
    </BrowserRouter >
  );
}

export const API_URL = "http://localhost:5000";
