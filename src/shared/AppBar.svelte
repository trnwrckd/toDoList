<div class="AppBar">
  <h1 class="fw-bold">ToDoList</h1>

  <div class="btnSlot">
    <slot name="addTaskButton" />
    <slot name="statsButton" />
    <slot name="logOutButton" />
  </div>
</div>

<style>
  .AppBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eeebeb;
    padding: 5px 25px;
    box-shadow: 0px 7px 4px 0 rgba(0, 0, 0, 0.25),
      0px 6px 4px 0 rgba(255, 255, 255, 0.5);
  }
</style>
