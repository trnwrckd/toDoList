<script>
    var email; var password;
    var emailOK = false; var passwordOK = false;
    import {auth} from '../services/firebase'; 
    var acceptedMailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const register =() => {
        validate();
        if ( emailOK && passwordOK ){    
            auth.createUserWithEmailAndPassword(email,password).catch(err=>{
                document.getElementById("registerError").innerHTML="Email may already be in use.";            
            })
        }
    }

    const validate = () => {
        document.getElementById("registerError").innerHTML="";
        var email = document.forms["register"]["email"].value;
        var password = document.forms["register"]["password"].value;
        if(email===""){
            emailOK = false;
            document.getElementById("emailError").innerHTML="Y no email bro?";
        } else if (email.match(acceptedMailFormat)){
            document.getElementById("emailError").innerHTML=""; emailOK = true;
        }
        else{
            emailOK =  false;
            document.getElementById("emailError").innerHTML="Email not cool.";
        }
        if(password===""){
            passwordOK = false;
            document.getElementById("passwordError").innerHTML="You need to have a password";
        }else if(password.length <6){
            passwordOK = false;
            document.getElementById("passwordError").innerHTML="Password has to be bigger than 6 characters";
        }
        else{
            passwordOK = true;
            document.getElementById("passwordError").innerHTML="";
        }
    };
    document.addEventListener("DOMContentLoaded",function(){
    var form = document.getElementById("registrationForm");
    form.addEventListener('keyup',
        function(event){
            if(event.code === 13){
                event.preventDefault();
                register();
            }
    });
    });
</script>


<div>
    <slot> </slot>
    <form class="form-field" on:submit|preventDefault="{register}" name="register" id="registrationForm">
        <h1>
            ToDoList
        </h1>
        <hr>
        <h4>Register</h4> <br>
        <input name = "email" class="form-neomorph" type="text" placeholder="Email" bind:value={email}><br>
        <input name = "password" class="form-neomorph" type="password" placeholder="Password" bind:value={password}>
        <br>
        <button type="submit" class=" btn btn-sm btn-neomorph" on:click="{register}">
            Submit
        </button>
    </form>
    <div id="error" style="color:firebrick;">
        <p id="emailError"> </p> 
        <p id="passwordError"> </p>
        <p id="registerError"> </p>
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