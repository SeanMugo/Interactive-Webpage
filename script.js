document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const greetingEl = document.getElementById('greetingMessage');
    const ageMonthsEl = document.getElementById('ageMonthsDisplay');
    const adultEl = document.getElementById('adultMessage');
    const quoteContainer = document.getElementById('quoteContainer');

    loadStoredData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let name = nameInput.value.trim();
        let age = parseInt(ageInput.value, 10);

        if (name === '' || isNaN(age) || age <= 0) {
            alert('Please enter a valid name and age.');
            return;
        }

        localStorage.setItem('userName', name);
        localStorage.setItem('userAge', age);

        updateDisplay(name, age);
    });

    function loadStoredData() {
        let savedName = localStorage.getItem('userName');
        let savedAge = localStorage.getItem('userAge');

        if (savedName && savedAge) {
            nameInput.value = savedName;
            ageInput.value = savedAge;

            updateDisplay(savedName, parseInt(savedAge, 10));
        }
    }

    function updateDisplay(name, age) {
        greetingEl.textContent = `Hello, ${name}!`;

        if (age >= 18) {
            adultEl.textContent = 'You are 18 or older – you can access adult content.';
        } else {
            adultEl.textContent = 'You are under 18 – you are too young for adult content.';
        }

        let months = age * 12;
        ageMonthsEl.textContent = `${months} months`;

        let quoteItems = quoteContainer.querySelectorAll('.quote-item');

        if (age >= 18) {
            let quote = '“Believe you can and you’re halfway there.” – Theodore Roosevelt';
            for (let i = 0; i < quoteItems.length; i++) {
                let placeholderSpan = quoteItems[i].querySelector('.placeholder');
                if (placeholderSpan) {
                    placeholderSpan.textContent = quote;
                }
            }
        } else {
            for (let i = 0; i < quoteItems.length; i++) {
                let placeholderSpan = quoteItems[i].querySelector('.placeholder');
                if (placeholderSpan) {
                    placeholderSpan.textContent = '[Quotes available for 18+]';
                }
            }
        }
    }
});