<script>
  import { createEventDispatcher } from "svelte";
  let title;
  let titleOK = false;
  let content;
  let contentOK = false;
  const dispatch = createEventDispatcher();

  const dispatchAddTaskToParent = (title, content) => {
    document.getElementById("taskError").innerHTML = "";
    document.getElementById("dateError").innerHTML = "";
    dispatch("addTask", { title: title, content: content });
    document.getElementById("taskForm").reset();
  };
  const dispatchCloseModal = () => {
    dispatch("closeModal");
  };
  const validate = () => {
    var task = document.forms["taskForm"]["task"].value;
    var date = document.forms["taskForm"]["date"].value;
    if (task == "") {
      titleOK = false;
      document.getElementById("taskError").innerHTML = "no task? you sure?";
    } else {
      titleOK = true;
      document.getElementById("taskError").innerHTML = "";
    }
    if (date == "") {
      contentOK = false;
      document.getElementById("dateError").innerHTML = "NO DEADLINE? ";
    } else {
      contentOK = true;
      document.getElementById("dateError").innerHTML = "";
    }
    if (titleOK && contentOK) {
      dispatchAddTaskToParent(task, date);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    form.addEventListener("keyup", function (event) {
      if (event.key == 13) {
        event.preventDefault();
        validate();
      }
    });
  });
</script>

<div class="text-center">
  <div class="row" style="width:100%;">
    <div style="width:75%;"><h4>Add a task..</h4></div>
    <div style="width:25%;">
      <i class="fas fa-times-circle" on:click={dispatchCloseModal} />
    </div>
  </div>
  <hr />
  <form name="taskForm" on:submit|preventDefault id="taskForm">
    <input
      name="task"
      class="form-field"
      type="text"
      placeholder="Task title"
      bind:value={title}
    /><br />
    <input
      name="date"
      class="form-field"
      type="date"
      placeholder="Task deadline"
      bind:value={content}
    /><br />
    <button
      type="submit"
      class="btn btn-sm btn-neomorph"
      on:click={() => validate()}
    >
      Add Task</button
    >
  </form>
  <div id="error" style="color:firebrick;">
    <p id="taskError" />
    <p id="dateError" />
  </div>
</div>

<style>
</style>
