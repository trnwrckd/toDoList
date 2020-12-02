<script>
    export let title;
    export let deadline;
    var now = new Date();
    var dLine = new Date(deadline);
    var diff = new Date(Math.abs(dLine-now));
    var month = diff.getMonth();
    var day = diff.getDate();
    var color= "rgba(2, 68, 2, 0.699)";
    $: if(month == 0 && day < 2){
        color = "rgba(211, 12, 12, 0.699)";
    } else if( month ==0 && day < 3)
    {
        color = "rgba(226, 92, 14, 0.699)";
    }
</script>

<div class= "row task-neomorph container text-center"  style="background-color:{color};">
    <div style="width:25%;">
        <slot name= "completeButton"> </slot>
    </div>
    <div style="width:50%;">
        <p>{title}</p> <p>({day + month*30}day(s) left)</p>
    </div>
    <div style="width:25%;">
        <slot name= "deleteButton"> </slot>
    </div>
    <br>
    
</div>

<style>
    .task-neomorph{ 
        width:100%;
        overflow: hidden;
        color: rgb(255, 254, 254);
        padding: 2px;
        border-radius: 15px;
        box-shadow: 
        4px 4px 4px 0 rgba(0, 0, 0, 0.25),
        -8px -8px 8px 0 rgba(255, 255, 255, 0.082);    
    }
</style>