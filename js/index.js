import darkMode from "./darkMode.js";
import tasks from "./todo.js";
import valdiations from "./validations.js";


const d = document;

d.addEventListener("DOMContentLoaded",()=>{
    tasks('enter','input','lista');
    valdiations();
}) 

darkMode(".dark-theme-btn","dark-mode");
