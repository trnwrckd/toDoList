<div class= " AppBar">
    <div style="width: 75%;" class="text-center">
        <h1>ToDoList</h1>
        
    </div>
    <div style="width: 25%;">
        <div class= "btnSlot"> 
            <slot name="addTaskButton"> </slot>
            <slot name="statsButton"> </slot>      
            <slot name="logOutButton"> </slot>
        </div>
    </div>

</div>

<style>
    .AppBar{
        /* color:#5c2005;   */
        position: fixed;
        z-index: 2;
        top: 0;
        left:0; right: 0;
        width: 100%;
        align-items: center;
        background-color: #eeebeb;
        box-shadow: 
            12px 12px 4px 0 rgba(0, 0, 0, 0.25),
            -8px -8px 4px 0 rgba(255, 255, 255, 0.082);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        margin-bottom: 5rem;
    }
</style>