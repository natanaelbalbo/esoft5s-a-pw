window.onload = function() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const main = document.querySelector('.container');

    for (const tarefa of tarefas) {
        const div = document.createElement('div');
        div.classList.add('tarefa');
        div.textContent = `Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`;

        main.appendChild(div);
    }
}

function enviar(e) {
    e.preventDefault();

    const form = e.target
    const formData = new FormData(form)

    const titulo = formData.get('textinput');
    const descricao = formData.get('tarefadesc');

    const tarefa = { titulo, descricao };

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(tarefa); 

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    console.log('Tarefa adicionada ao localStorage:', tarefa);

    form.reset();

    window.location.reload();
    
}