<script>
    var email; var password;
    import {auth} from '../services/firebase'; 
    var acceptedMailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validate = () => {
        var email = document.forms["register"]["email"].value;
        var password = document.forms["register"]["password"].value;
        if(email===""){
            document.getElementById("emailError").innerHTML="Y no email bro?";
        } else if (email.match(acceptedMailFormat)){
            document.getElementById("emailError").innerHTML="";
        }
        else{
            document.getElementById("emailError").innerHTML="Email not cool.";
        }
        if(password===""){
            document.getElementById("passwordError").innerHTML="You need to have a password";
        }else if(password.length <6){
            document.getElementById("passwordError").innerHTML="Password has to be bigger than 6 characters";
        }
        else{
            document.getElementById("passwordError").innerHTML="";
        }
    };
    document.addEventListener("DOMContentLoaded",function(){
        var form = document.getElementById("registrationForm");
        form.addEventListener('keyup', function(event){
            event.preventDefault();
            validate();
        });
    });
</script>


<div>
    <slot> </slot>
    <form class="form-field" on:submit|preventDefault="{validate}" name="register" id="registrationForm">
        <h1>
            ToDoList
        </h1>
        <hr>
        <h4>Register</h4> <br>
        <input name = "email" class="form-neomorph" type="text" placeholder="Email" bind:value={email}><br>
        <input name = "password" class="form-neomorph" type="password" placeholder="Password" bind:value={password}>
        <br>
        <button type="submit" class=" btn btn-sm btn-neomorph" on:click={() => auth.createUserWithEmailAndPassword(email,password)}>
            Submit
        </button>
    </form>
    <div id="error" style="color:firebrick;">
        <p id="emailError"> </p> 
        <p id="passwordError"> </p>
    </div>
</div>    
<style>
    .btn-neomorph{
    background-color: inherit;
    box-shadow: 
    4px 4px 4px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 8px 0 rgba(255, 255, 255, 0.082);
    border-radius: 20px;
  }
  .btn-neomorph:focus{
      color:#fc8403;
    }
  .form-neomorph{
        background-color: #eeebeb;
        box-shadow: 
            12px 12px 4px 0 rgba(0, 0, 0, 0.25),
            -8px -8px 4px 0 rgba(255, 255, 255, 0.082);
        border-radius: 50px;
    }

</style>