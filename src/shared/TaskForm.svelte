<script>
    import {createEventDispatcher} from 'svelte';
    let title; let titleOK = false;
    let content; let contentOK = false;
    const dispatch = createEventDispatcher();

    const dispatchAddTaskToParent= (title, content)=>{
        validate();
        if( titleOK && contentOK){
            dispatch('addTask', {title: title,content: content});
            document.getElementById("taskForm").reset();
            document.getElementById("error").innerHTML="";
        }
    };
    const dispatchCloseModal = () => {
        dispatch( 'closeModal');
    };
    const validate = ()=> {
        var task = document.forms["taskForm"]["task"].value;
        var date = document.forms["taskForm"]["date"].value;
        if(task == ""){
            titleOK = false;
            document.getElementById("taskError").innerHTML="no task? you sure?";
        } 
        else{
            titleOK = true;
            document.getElementById("taskError").innerHTML="";
        }
        if(date == ""){
            contentOK = false;
            document.getElementById("dateError").innerHTML="NO DEADLINE? "
        }
        else{
            contentOK = true;
            document.getElementById("dateError").innerHTML="";
        }
    };
    
    document.addEventListener("DOMContentLoaded",function(){
    form.addEventListener('keyup',
    function(event){
        if(event.key == 13){
            event.preventDefault();
            dispatchAddTaskToParent();
        }
    });
    });
</script>

<div class="text-center">
    <div class="row" style="width:100%;">
        <div style="width:75%;"><h4> Add a task.. </h4> </div>
        <div style="width:25%;"> <i class="fas fa-times-circle" on:click={dispatchCloseModal}></i> </div>
    </div>
    <hr>
    <form  name="taskForm" class= "form-field" on:submit|preventDefault="{dispatchAddTaskToParent}"  id="taskForm">
        <input name="task" class = "form-neomorph"  type="text" placeholder="Task title" bind:value={title}><br>
        <input name="date" class = "form-neomorph"  type="date" placeholder="Task deadline" bind:value={content} ><br>
        <button type="submit" class="btn btn-sm btn-neomorph" on:click={()=> dispatchAddTaskToParent(title, content)}> Add Task</button>
    </form>
    <div id="error" style="color:firebrick;">
        <p id="taskError"> </p> 
        <p id="dateError"> </p>
    </div>
</div>

<style>
    .form-neomorph{
        background-color: #eeebeb;
        box-shadow: 
            6px 6px 2px 0 rgba(0, 0, 0, 0.25),
            -4px -4px 2px 0 rgba(255, 255, 255, 0.082);
        border-radius: 50px;
    }
    .btn-neomorph{
    box-shadow: 
    4px 4px 4px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 8px 0 rgba(255, 255, 255, 0.082);
    border-radius: 20px;
  }
  .btn-neomorph:focus{
      color:#fc8403;
    }
</style>