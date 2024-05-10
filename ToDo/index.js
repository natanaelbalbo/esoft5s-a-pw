document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const titleInput = document.getElementById("titleInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const taskList = document.getElementById("taskList");

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const title = titleInput.value;
        const description = descriptionInput.value;

        if (title.trim() !== "" && description.trim() !== "") {
            const task = {
                title: title,
                description: description
            };

            
            console.log(task); 
        }
    });
});
