<script>
  import { auth } from "../services/firebase";

  var email;
  var password;
  var emailOK = false;
  var passwordOK = false;
  var acceptedMailFormat =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const register = () => {
    validate();
    if (emailOK && passwordOK) {
      auth.createUserWithEmailAndPassword(email, password).catch((err) => {
        document.getElementById("registerError").innerHTML =
          "Email may already be in use.";
      });
    }
  };

  const validate = () => {
    document.getElementById("registerError").innerHTML = "";
    var email = document.forms["register"]["email"].value;
    var password = document.forms["register"]["password"].value;
    if (email === "") {
      emailOK = false;
      document.getElementById("emailError").innerHTML = "Y no email bro?";
    } else if (email.match(acceptedMailFormat)) {
      document.getElementById("emailError").innerHTML = "";
      emailOK = true;
    } else {
      emailOK = false;
      document.getElementById("emailError").innerHTML = "Email not cool.";
    }
    if (password === "") {
      passwordOK = false;
      document.getElementById("passwordError").innerHTML =
        "You need to have a password";
    } else if (password.length < 6) {
      passwordOK = false;
      document.getElementById("passwordError").innerHTML =
        "Password has to be bigger than 6 characters";
    } else {
      passwordOK = true;
      document.getElementById("passwordError").innerHTML = "";
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("registrationForm");
    form.addEventListener("keyup", function (event) {
      if (event.code === 13) {
        event.preventDefault();
        register();
      }
    });
  });
</script>

<div>
  <slot />
  <form
    on:submit|preventDefault={register}
    name="register"
    id="registrationForm"
  >
    <h4>Register</h4>
    <br />
    <input
      name="email"
      class="form-field"
      type="text"
      placeholder="Email"
      bind:value={email}
    /><br />
    <input
      name="password"
      class="form-field"
      type="password"
      placeholder="Password"
      bind:value={password}
    />
    <br />
    <button type="submit" class="btn-neomorph" on:click={register}>
      Submit
    </button>
  </form>
  <div id="error" style="color:firebrick;">
    <p id="emailError" />
    <p id="passwordError" />
    <p id="registerError" />
  </div>
</div>

<style>
</style>
