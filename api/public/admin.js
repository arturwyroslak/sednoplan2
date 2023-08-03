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

    // Obsługa zapisywania zmian dla każdego edytora
    for (var id in quillEditors) {
        (function(id) {
            document.querySelector('#save-button' + id.replace('modal', '')).addEventListener('click', function() {
                var content = quillEditors[id].getContents();

                // Wyślij żądanie do backendu o zapisanie treści
                fetch('http://localhost:3000/modals/' + id, {
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
            });
        })(id);
    }
});
