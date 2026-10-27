
$(document).ready(function () {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTaskCount() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;

        $("#taskCount").text(
            total + " tasks | " + completed + " completed"
        );
    }

    function displayTasks() {
        $("#taskList").empty();

        if (tasks.length === 0) {
            $("#taskList").html(
                '<p class="empty-message">No tasks added yet.</p>'
            );
            updateTaskCount();
            return;
        }

        tasks.forEach(function (task) {
            const taskItem = $("<div>").addClass("task-item");

            if (task.completed) {
                taskItem.addClass("completed");
            }

            const label = $("<label>");
            const checkbox = $("<input>")
                .attr("type", "checkbox")
                .prop("checked", task.completed)
                .on("change", function () {
                    task.completed = $(this).prop("checked");
                    saveTasks();
                    displayTasks();
                });

            const taskText = $("<span>").text(task.text);

            label.append(checkbox, taskText);

            const deleteButton = $("<button>")
                .addClass("delete-btn")
                .text("Delete")
                .on("click", function () {
                    tasks = tasks.filter(item => item.id !== task.id);
                    saveTasks();
                    displayTasks();
                });

            taskItem.append(label, deleteButton);
            $("#taskList").append(taskItem);
        });

        updateTaskCount();
    }

    $("#taskForm").on("submit", function (event) {
        event.preventDefault();

        const taskText = $("#taskInput").val().trim();

        if (taskText === "") {
            return;
        }

        tasks.push({
            id: Date.now() + Math.random(),
            text: taskText,
            completed: false
        });

        saveTasks();
        displayTasks();

        $("#taskInput").val("").focus();
    });

    $("#loadTasks").on("click", function () {
        $("#ajaxStatus").text("Loading sample tasks...");

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos?_limit=5",
            method: "GET",
            dataType: "json",

            success: function (data) {
                let added = 0;

                data.forEach(function (item) {
                    const exists = tasks.some(
                        task => task.text === item.title
                    );

                    if (!exists) {
                        tasks.push({
                            id: Date.now() + Math.random(),
                            text: item.title,
                            completed: item.completed
                        });

                        added++;
                    }
                });

                saveTasks();
                displayTasks();

                $("#ajaxStatus").text(
                    added + " sample tasks loaded successfully."
                );
            },

            error: function () {
                $("#ajaxStatus").text(
                    "Unable to load tasks. Check your internet connection."
                );
            }
        });
    });

    displayTasks();

});
