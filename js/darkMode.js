const d = document,
    ls = localStorage;

export default function darkMode(btn, classDark){ 
    const $themeBtn = d.querySelector(btn),
    $selectors = d.querySelectorAll("[data-dark]"),
    $seccionTarea = d.getElementById("tarea"),
    $HTML = d.getElementsByTagName("html")[0];



    let moon = "🌙",
    sun = "☀️";

    const lightMode = () => {
        $selectors.forEach((el)=>el.classList.remove(classDark));
        $seccionTarea.classList.add("seccion-tarea");
        $seccionTarea.classList.remove("seccion-tarea-dark");
        $HTML.classList.add("light-mode");
        $themeBtn.textContent = moon;
        ls.setItem("theme","light");
    }
    const darkMode = () => {
        $selectors.forEach(el => {
        el.classList.add(classDark);
        $HTML.classList.remove("light-mode");
        $seccionTarea.classList.remove("seccion-tarea");
        $seccionTarea.classList.add("seccion-tarea-dark");

        $themeBtn.textContent = sun;
        ls.setItem("theme","dark");
    });}
    
    d.addEventListener("click", e =>{
        if(e.target.matches(btn)){
            if($themeBtn.textContent === moon){
               darkMode();
            }else{
                lightMode();
            }
        }
    })

    d.addEventListener("DOMContentLoaded", (e) =>{
        if((ls.getItem("theme")) === null){
            ls.setItem("theme","light");
        }else if(ls.getItem("theme") ==="light"){
            lightMode();
        }else{
            darkMode();
        }
    })}