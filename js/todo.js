 const d = document,
        $fecha = d.getElementById("fecha");
let idCount,LIST;

export default function tasks(enterButtonId, inputId, listID) {
        
        const $enterButton = document.getElementById(enterButtonId),
                $inputElement = document.getElementById(inputId),
                $list = document.getElementById(listID),
                check = "fa-circle-check", 
                uncheck = "fa-circle",
                lineThrough = "line-through",
                ls = localStorage,
                FECHA = new Date();

        $fecha.innerHTML = FECHA.toLocaleDateString('es-CO',{weekday:'long',month:'short',day:'numeric'}) + " "+
                           FECHA.toLocaleTimeString('es-CO', {hour: 'numeric',minute: 'numeric'});
        
        function addTaskToList(task,ID,completed,remove) {
                
                if(remove){
                        return
                }

                const COMPLETED = completed? check :uncheck;
                const LINE = completed ? lineThrough: '';
                
                const element = `<li id="elemento">
                                <i class="fa-regular ${COMPLETED} check" data="realizado" id="${ID}" ></i>
                                <p class="text ${LINE}">${task}</p> 
                                <i class="fa-solid fa-trash" data="eliminado" id="${ID}"></i>
                                </li>`;
                $list.insertAdjacentHTML("afterbegin", element);
                $inputElement.value = '';
                $enterButton.classList.add("none");
        }
        
        function taskCompleted(e) {
                e.parentNode.querySelector('.check').classList.toggle('checked');
                e.classList.toggle(check);
                e.classList.toggle(uncheck);
                e.parentNode.querySelector('.text').classList.toggle(lineThrough);
                LIST[e.id].completed = LIST[e.id].completed ? false : true;
                ls.setItem('TODO', JSON.stringify(LIST));
        }

        function taskDeleted(e) {
                e.parentNode.parentNode.removeChild(e.parentNode);
                let index = LIST.findIndex(obj => obj.id === parseInt(e.id));
                if (index !== -1) {
                        LIST.splice(index, 1);
                }
                if (LIST[e.id]) {
                        LIST[e.id].remove = true;
                }
        }
              


        $enterButton.addEventListener("click", e => {
                const $task = $inputElement.value;
                addTaskToList($task,idCount,false,false);
                LIST.push({name:$task,id:idCount,completed:false,remove:false});
                ls.setItem('TODO',JSON.stringify(LIST));
                idCount++;       
        });

        $inputElement.addEventListener("keyup", (e) => {
                let $valid = $inputElement.classList.contains("is-invalid");
                console.log($valid)
                if (e.key === 'Enter' && !$valid) {
                        const $task = $inputElement.value;
                        addTaskToList($task,idCount,false,false);
                        LIST.push({name:$task,id:idCount,completed:false,remove:false});
                        idCount++;
                }
        });



        $list.addEventListener("click",e=>{
                const element = e.target;
                const elementData = element.attributes.data.value;
                if(elementData==='realizado'){
                        taskCompleted(element);
                }else if(elementData==='eliminado'){
                        taskDeleted(element);
                }
                ls.setItem('TODO',JSON.stringify(LIST));

        });

        let data = ls.getItem('TODO')
        if(data){
                LIST = JSON.parse(data);
                idCount = LIST.length;
                cargarLista(LIST)
        }else{
                LIST =  [];
                idCount = 0;
        }

        function cargarLista(DATA){
                DATA.forEach((element) => {
                        addTaskToList(element.name, element.id, element.completed, element.remove);
                        if (element.completed) {
                                const $checkElement = $list.querySelector(`[id="${element.id}"]`);
                                if ($checkElement) {
                                        $checkElement.classList.add('checked');
                                }
                        }
                });
        }
}