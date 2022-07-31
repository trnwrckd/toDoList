<script>
  export let title;
  export let deadline;
  var now = new Date();
  var dLine = new Date(deadline);
  var diff = new Date(Math.abs(dLine - now));
  var month = diff.getMonth();
  var day = diff.getDate();
  var color = "rgba(2, 68, 2, 0.699)";
  $: if (month == 0 && day < 2) {
    color = "rgba(211, 12, 12, 0.699)";
  } else if (month == 0 && day < 3) {
    color = "rgba(226, 92, 14, 0.699)";
  }
</script>

<!-- {:else if title = ""} -->
<div
  class="container text-center d-flex justify-content-center align-items-center"
>
  <div class="task-neomorph" style="background-color:{color};">
    {#if title == "\ud83d\ude21" || title == "\ud83d\ude01"}
      <div>
        <p style="font-size: 2rem;">{title}</p>
      </div>
    {:else}
      <div class="task-item">
        <div class="fs-4">
          <slot name="completeButton" />
        </div>
        <div
          class="d-flex flex-column flex-lg-row  justify-content-evenly align-items-center fs-4"
        >
          <p class="mb-0 px-3">{title}</p>
          <div class="deadline">
            {#if day == 1 && month == 0}
              <p class="mb-0">({day} day left)</p>
            {:else}
              <p class="mb-0">({day + month * 30} days left)</p>
            {/if}
          </div>
        </div>
        <div class="fs-4">
          <slot name="deleteButton" />
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .task-neomorph {
    overflow: hidden;
    color: rgb(255, 254, 254);
    padding: 5px 10px;
    border-radius: 25px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25),
      -8px -8px 8px 0 rgba(255, 255, 255, 0.082);
  }
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
  }
  .deadline {
    margin: 0 0.5rem;
  }
  @media only screen and (max-widht: 692px) {
    .deadline {
      margin: 0;
    }
  }
</style>
