document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja edytorów Quill
    var quillEditors = {};

    var editorElements = document.querySelectorAll('.quill-editor');
    for (var i = 0; i < editorElements.length; i++) {
        var id = editorElements[i].id;
        quillEditors[id] = new Quill('#' + id, {
            theme: 'snow'
        });
    }

    // Obsługa zapisywania zmian
    document.querySelector('#save-button').addEventListener('click', function() {
        for (var id in quillEditors) {
            var content = quillEditors[id].getContents();

            // Wyślij żądanie do backendu o zapisanie treści
            fetch('https://sednoplan.vercel.app/modals/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: content })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Zapisano treść modalu ' + id);
                } else {
                    console.error('Nie udało się zapisać treści modalu ' + id);
                }
            });
        }
    });
});
