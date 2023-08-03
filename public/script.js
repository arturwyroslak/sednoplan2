// Pobierz wszystkie ikony informacyjne
var infoIcons = document.querySelectorAll('.fas.fa-info-circle');

// Dodaj zdarzenie kliknięcia do każdej ikony
for (var i = 0; i < infoIcons.length; i++) {
    infoIcons[i].addEventListener('click', function(event) {
        // Pobierz ID modalu z atrybutu data-target
        var modalId = event.target.dataset.target;

        // Wyślij żądanie do backendu o pobranie treści dla modalu
        fetch('https://sednoplanapp.vercel.app/modals/' + modalId)
            .then(response => response.json())
            .then(data => {
                // Aktualizuj treść modalu
                document.querySelector(modalId + ' .modal-body').textContent = data.content;

                // Wyświetl modal
                $(modalId).modal('show');
            });
    });
}
