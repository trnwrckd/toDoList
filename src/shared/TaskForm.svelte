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
      document.getElementById("taskError").innerHTML = "No task? you sure?";
    } else {
      titleOK = true;
      document.getElementById("taskError").innerHTML = "";
    }
    if (date == "") {
      contentOK = false;
      document.getElementById("dateError").innerHTML =
        "NO DEADLINE? You must be joking.";
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
  <div class="d-flex justify-content-between align-items-center">
    <h4 class="fw-bold text-center">Add a Task</h4>
    <div class="close-btn">
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
