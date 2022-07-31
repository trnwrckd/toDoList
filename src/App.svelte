<!-- Neumorph* :|  -->
<script>
  // import
  import firebase from "firebase/app";
  import { FirebaseApp, User, Doc, Collection, userStore } from "sveltefire";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import Register from "./tabs/Register.svelte";
  import Login from "./tabs/Login.svelte";
  import TaskForm from "./shared/TaskForm.svelte";
  import AppBar from "./shared/AppBar.svelte";
  import TaskInfo from "./shared/TaskInfo.svelte";

  //Switching tabs between login and register
  $: activeTab = "register";
  function tabSwitch(tabname) {
    activeTab = tabname;
  }
  //Modal
  $: showWarning = false;
  var showModalbool = false;
  var showStatsbool = false;
  const showModal = () => {
    showModalbool = !showModalbool;
    var modal = document.getElementById("formModal");
    if (showModalbool) {
      modal.style.display = "flex";
    } else {
      modal.style.display = "none";
    }
  };
  const showStats = () => {
    showStatsbool = !showStatsbool;
    var stats = document.getElementById("statsModal");
    if (showStatsbool) {
      stats.style.display = "flex";
    } else {
      stats.style.display = "none";
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
            <button
              class="btn-round btn-neomorph"
              on:click={() => auth.signOut()}
              ><h5><i class="fas fa-sign-out-alt" /></h5>
            </button>
          </span>
          <span slot="statsButton">
            <button class="btn-round btn-neomorph" on:click={showStats}>
              <h5><i class="fas fa-chart-pie" /></h5></button
            >
          </span>
        </AppBar>
      </div>

      <!-- notSignedIn -->
      <div slot="signed-out" class="text-center">
        <div class="">
          <h1 class="pt-3 fw-bold">ToDoList</h1>
          <div>
            <button
              id="reg"
              class="btn-neomorph"
              on:click={() => tabSwitch("register")}
            >
              Register</button
            >
            <button
              id="log"
              class="btn-neomorph"
              on:click={() => tabSwitch("login")}>Login</button
            >
          </div>
        </div>
        {#if activeTab === "register"}
          <Register />
        {:else if activeTab === "login"}
          <Login />
        {/if}
      </div>

      <!-- Document -->
      <Doc path={`ToDoList/${user.uid}`} let:data={task} let:ref={taskRef} log>
        <!-- loader -->
        <div slot="loading" class="loader my-5 py-5">
          <div class="container text-center">
            <i class="fas fa-spinner fa-pulse fa-5x" />
          </div>
        </div>

        <!-- intro -->
        <div class="container text-center py-5 fs-4" slot="fallback">
          <p>
            Welcome to your ToDoList.<br />
            Add your tasks. Their deadlines will be prioritized through colors,
            <br />
            And you'll know which ones you should take care of first. <br /> I
            recommend getting things done, so if you add more than 5 tasks,
            <br />
            they won't be shown to you unless you complete some of the tasks that
            you have piled.
          </p>
          <button
            class="btn-neomorph"
            on:click={() => {
              taskRef.set({
                totalTask: 0,
                completedTask: 0,
                deletedTask: 0,
              });
            }}
          >
            Get Started
          </button>
        </div>

        <!-- statsModal -->
        <div class="formModal text-center" id="statsModal">
          <div class="form">
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="fw-bold text-center">Stats</h4>
              <div class="close-btn">
                <i class="fas fa-times-circle" on:click={showStats} />
              </div>
            </div>
            <hr />
            <div>
              <h4>Total Tasks created: {task.totalTask}</h4>
              <h4>Total Tasks completed: {task.completedTask}</h4>
              <h4>Total Tasks deleted: {task.deletedTask}</h4>
            </div>
          </div>
        </div>

        <!-- Collection -->
        <Collection
          path={taskRef.collection("taskList")}
          let:data={taskList}
          let:ref={tux}
          query={(ref) => ref.orderBy("createdAt")}
          log
        >
          <div slot="loading" class="loader my-5 py-5">
            <div class="container text-center">
              <i class="fas fa-spinner fa-pulse fa-5x" />
            </div>
          </div>

          <div class="row pt-3 mt-0">
            <div class="container text-center">
              <h4>
                <span class="fw-bold">Tasks</span>
                <button
                  id="formButton"
                  class="btn-round btn-neomorph"
                  on:click={showModal}
                >
                  <i class="fas fa-plus" />
                </button>
              </h4>
              {#if taskList.length == 0}
                {#if task.totalTask > 0}
                  <p class="text-success">You've completed all your tasks!</p>
                {:else}
                  <p class="text-warning">Add a task first..</p>
                {/if}
              {:else if taskList.length > 5}
                {#if taskList.length - 5 > 1}
                  <p class="text-danger">
                    You have {taskList.length - 5} more tasks. Complete some of these
                    to see more.
                  </p>
                {:else}
                  <p class="text-danger">
                    You have {taskList.length - 5} more task. Complete some of these
                    to see more.
                  </p>
                {/if}
              {/if}

              {#each taskList.slice(0, 5) as task (task.id)}
                <div>
                  <TaskInfo title={task.title} deadline={task.content}>
                    <span slot="completeButton" class="btn-complete">
                      <i
                        class="fas fa-check-circle"
                        on:click={() => {
                          task.ref.update({
                            title: "\ud83d\ude01",
                          });
                          window.setTimeout(function () {
                            task.ref.delete();
                            taskRef.update({
                              completedTask:
                                firebase.firestore.FieldValue.increment(1),
                            });
                          }, 500);
                        }}
                      />
                    </span>
                    <span slot="deleteButton" class="btn-delete">
                      <i
                        class="fas fa-trash"
                        on:click={() => {
                          task.ref.update({
                            title: "\ud83d\ude21",
                            content: "",
                          });
                          window.setTimeout(function () {
                            task.ref.delete();
                            taskRef.update({
                              deletedTask:
                                firebase.firestore.FieldValue.increment(1),
                            });
                          }, 500);
                        }}
                      />
                    </span>
                  </TaskInfo>
                </div>
                <br />
              {/each}
            </div>
            {#if showWarning}
              <div
                class="task-neomorph container text-center"
                style="background-color: red;"
              >
                <p>Try completing some task Before Adding more</p>
              </div>
            {/if}

            <!-- add task -->
            <div id="formModal" class="formModal">
              <div class="form" data-keyboard="false" data-backdrop="static">
                <TaskForm
                  on:addTask={(event) => {
                    var title = event.detail.title;
                    var content = event.detail.content;
                    tux.add({
                      title: title,
                      content: content,
                      createdAt: Date.now(),
                    });
                    taskRef.update({
                      totalTask: firebase.firestore.FieldValue.increment(1),
                    });
                    showModal();
                  }}
                  on:closeModal={() => {
                    showModal();
                  }}
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
  .formModal {
    display: none;
    position: fixed;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgb(0, 0, 0); */
    background-color: rgba(65, 65, 65, 0.4);
  }
  .form {
    background-color: #eeebeb;
    padding: 20px;
    border-radius: 25px;
    box-shadow: var(--box-shadow);
    width: 50%;
    z-index: 1;
  }
  .btn-complete,
  .btn-delete {
    cursor: pointer;
  }
  .btn-complete:hover {
    color: rgb(184, 255, 184);
  }
  .btn-delete:hover {
    color: rgb(255, 184, 184);
  }

  @media only screen and (max-width: 692px) {
    .form {
      width: 80%;
    }
  }
</style>
