// import "./style.css";
// import { loginPage } from "./pages/login";

// document.querySelector("#app").innerHTML = loginPage();






import './style.css';

import { registerPage } from './pages/registerPage.js';
import { registerUser } from './services/register.js';


const app = document.querySelector("#app");


app.innerHTML = registerPage();


registerUser();