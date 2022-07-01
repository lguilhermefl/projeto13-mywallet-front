import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./shared/styles/globalStyles";

import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import NewEntry from './NewEntry';
import NewExit from './NewExit';
import EditEntry from './EditEntry';


export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newentry" element={<NewEntry />} />
        <Route path="/newexit" element={<NewExit />} />
        <Route path="/editentry" element={<EditEntry />} />
      </Routes>
    </BrowserRouter>
  );
}
