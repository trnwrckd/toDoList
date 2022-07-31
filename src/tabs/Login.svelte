<script>
  var email;
  var password;
  var emailOK = false;
  var passwordOK = false;
  import { auth } from "../services/firebase";

  const login = () => {
    validate();
    if (emailOK && passwordOK) {
      auth.signInWithEmailAndPassword(email, password).catch((err) => {
        document.getElementById("loginError").innerHTML =
          "Failed. Check Your credentials.";
      });
    }
  };

  const validate = () => {
    document.getElementById("loginError").innerHTML = "";
    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password"].value;
    var acceptedMailFormat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
      document.getElementById("emailError").innerHTML = "Y no email bro?";
      emailOK = false;
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
      document.getElementById("passwordError").innerHTML = "";
      passwordOK = true;
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    form.addEventListener("keyup", function (event) {
      if (event.code == 13) {
        event.preventDefault();
        login();
      }
    });
  });
</script>

<div>
  <form on:submit|preventDefault={login} name="login" id="loginform">
    <h2>Login</h2>
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
    <button type="submit" class="btn-neomorph" on:click={login}>
      Submit
    </button>
  </form>
  <br />
  <div id="error" style="color:firebrick;">
    <p id="emailError" />
    <p id="passwordError" />
    <p id="loginError" />
  </div>
</div>

<style>
</style>
