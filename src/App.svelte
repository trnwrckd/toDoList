<script>
  // SvelteFire Setup
  import firebase from "firebase/app";
  import { FirebaseApp, User, Doc, Collection, userStore } from "sveltefire";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  let firebaseConfig = {
  apiKey: "AIzaSyDIbTLX-_jeNvd_WkOwbfcfpuMKLNTWKww",
  authDomain: "coffee-cuop.firebaseapp.com",
  databaseURL: "https://coffee-cuop.firebaseio.com",
  projectId: "coffee-cuop",
  storageBucket: "coffee-cuop.appspot.com",
  messagingSenderId: "229914810743",
  appId: "1:229914810743:web:e16cbd3f127c440cc32972"
  };
  if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
  }

  // import
  import Register from "./tabs/Register.svelte";
  import Login from "./tabs/Login.svelte";
  import TaskForm from "./shared/TaskForm.svelte";
  import AppBar from "./shared/AppBar.svelte"
  import TaskInfo from "./shared/TaskInfo.svelte";

  //Switching tabs between login and register 
  $: activeTab = "register";
  function tabSwitch(tabname){
    activeTab = tabname;
  };
  //Modal
  $: showWarning = false;
  var showModalbool = false;
  var showStatsbool = false;
  const showModal= () => {
    showModalbool = !showModalbool;
    var modal = document.getElementById("formModal");
    if(showModalbool){
      modal.style.display = "block";
    }
    else{
      modal.style.display= "none";
  };
  }
  const showStats = () =>{
    showStatsbool = ! showStatsbool;
    var stats = document.getElementById("statsModal");
    if(showStatsbool){
      stats.style.display = "block";
    }
    else{
      stats.style.display= "none";
    }
};
</script>

<main>
  <FirebaseApp {firebase}>
    <!-- User -->
    <User let:user let:auth>
      <div>
        <AppBar>
          <span slot="logOutButton">
            <button class="btn btn-sm btn-neomorph" on:click={() => auth.signOut()}><i class="fas fa-sign-out-alt"></i> </button>
          </span>         
          <span slot="statsButton">
            <button class="btn btn-sm btn-neomorph" on:click="{showStats}"> <i class="fas fa-chart-pie"></i></button>
          </span>
        </AppBar>
      </div>

      <!-- notSignedIn -->
      <div slot="signed-out" class="text-center pt-5">
        <span>
          <button id= "reg" class="btn btn-sm  btn-neomorph" on:click={()=> tabSwitch("register")}> Register</button>
        <button  id= "log" class="btn btn-sm btn-neomorph"  on:click={()=> tabSwitch("login")}>Login</button>
        </span>
        <br> <br>
        {#if activeTab === "register"}
        <Register/>
        {:else if activeTab === "login"}
        <Login/>  
        {/if}  
      </div>
      
      <!-- Document -->
      <Doc path={`ToDoList/${user.uid}`} let:data={task} let:ref={taskRef} log>
        
        <div slot = "loading" style="padding-top:5rem;"> 
          <div class="container text-center" style="height:5rem; width:5rem;">
            <i class="fas fa-spinner fa-pulse fa-5x"></i>
          </div>
         </div>

         <div class="container text-center" slot="fallback" style="padding-top:5rem;">
           <p>  Welcome to your ToDoList.<br>
            Add your tasks. Their deadlines will be prioritized<br> through colors,
            And you'll know which ones you should take care of first. 
            <br> I recommend getting things done, so if you <br> 
          add more than 5 tasks, they won't be shown to you unless <br>you complete some of the tasks that you have piled.
        </p>
        <button class="btn btn-sm btn-neomorph" on:click={()=>{
          taskRef.set({
              totalTask: 0,
              completedTask: 0,
              deletedTask: 0
            });
          }}> Get Started </button>
        </div>
        <!-- statsModal -->
        <div class="formModal text-center" id="statsModal" style="z-index:1;">
          <div class = "form-neomorph form" style="height:50%;width:50%;">
            <div class="row" style="width:100%;">
              <div style="width: 75%;"><h4>Stats</h4></div>
              <div style="width: 25%;"><i class="fas fa-times-circle" on:click="{showStats}"> </i></div>
            </div>
            <hr>
            <div>
              <p> Total Tasks created: {task.totalTask}</p>
              <p> Total Tasks completed: {task.completedTask}</p>
              <p> Total Tasks deleted: {task.deletedTask}</p>
            </div>
          </div>
        </div>

        <!-- Collection -->
        <Collection 
        path={taskRef.collection('taskList')}
        let:data={taskList}
        let:ref={tux}
        query={ref => ref.orderBy('createdAt')}
        log>
        <div slot="loading" style="padding-top:5rem;"> 
          <div class="container text-center" style="height:5rem; width:5rem;">
            <i class="fas fa-spinner fa-pulse fa-5x"></i>
          </div>
        </div>

        <div class="row pt-3 mt-0">

          <div class="container text-center" style="width:50%; padding-top:5rem;">
            <h4> Tasks <button id="formButton" class=" btn btn-sm btn-neomorph" on:click="{showModal}"><i class="fas fa-plus"></i></button>
            </h4>
            <hr>
              {#if taskList.length==0}
                {#if task.totalTask >0}
                  <p class="text-success"> You've completed all your tasks!</p>
                {:else}
                  <p class="text-warning"> Add a task first..</p>
                {/if}
              {:else if taskList.length > 5}
                <p class="text-danger"> You have {taskList.length - 5} more task(s). Complete some of these to see more</p>
              {/if} 

              {#each taskList.slice(0,5) as task (task.id)}
                <TaskInfo title= {task.title} deadline= {task.content}>
                  <span slot= "completeButton">
                    <i class="fas fa-check-circle" on:click={() => {  
                          task.ref.delete();
                          taskRef.update({ 
                            completedTask: firebase.firestore.FieldValue.increment(1)
                          });
                        }}>
                    </i>
                  </span>
                  <span slot= "deleteButton">
                    <i class="fas fa-trash" on:click={() => {
                          task.ref.delete();
                          taskRef.update({ 
                            deletedTask: firebase.firestore.FieldValue.increment(1)
                          });
                        }}>
                    </i>
                  </span>
                </TaskInfo>
                <br>
              {/each}
            </div>
            {#if showWarning}
              <div class="task-neomorph container text-center" style= "background-color: red;"> 
                <p> 
                  Try completing some task Before Adding more
                </p>
              </div>
            {/if}
      
          <div id="formModal" class="formModal" >
            <div class="form form-neomorph" data-keyboard="false" data-backdrop="static">
              <TaskForm on:addTask= {
                (event)=> {
                  var title = event.detail.title;
                  var content = event.detail.content;
                  tux.add({
                    title : title,
                    content: content,
                    createdAt: Date.now()
                  });
                  taskRef.update({
                    totalTask: firebase.firestore.FieldValue.increment(1)
                  });
                  showModal();
                }}
                on:closeModal = {
                  ()=>{
                    showModal();
                  }
                }
                />
              </div>
          </div> 
        </div>
          </Collection>
        </Doc>
    </User>
  </FirebaseApp>
</main>



<style>
  .formModal{
    display: none; 
    position: fixed; 
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    /* overflow: auto; Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); 
  }
  .form{
    background-color: #eeebeb;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  main{
    overflow-x:hidden;
    margin:0; 
    padding:0;
    width: 100%;
    height: 100%;
    font-family: "Lucida Console", Monaco, monospace;
  }
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
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
          margin-top:8rem;
          background-color: #eeebeb;
          box-shadow: 
              12px 12px 4px 0 rgba(0, 0, 0, 0.25),
              -8px -8px 4px 0 rgba(255, 255, 255, 0.082);
          border-radius: 50px;
      }
</style>