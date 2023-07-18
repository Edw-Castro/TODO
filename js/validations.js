const d = document;

export default function validations() {

  d.addEventListener("keyup", (e) => {
    if (e.target.matches("#input")){
        let $input = e.target;
        let $enter = document.getElementById("enter")
        let pattern = $input.getAttribute('data-pattern');
        let inputValue = $input.value.trim(); 

        if (pattern) {
            let regex = new RegExp(pattern);
            let isValid = regex.exec($input.value);
            if (!isValid || inputValue=="" ) {

                $input.classList.add("is-invalid");
                $enter.classList.add("none");

            } else {

                $input.classList.remove("is-invalid");
                $enter.classList.remove("none");

            }
        }else{
            $input.classList.remove("is-invalid");
        }
    }
  });
}
