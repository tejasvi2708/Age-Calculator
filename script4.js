document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const yearInput = document.getElementById('year').querySelector('input');
    const monthInput = document.getElementById('month').querySelector('input');
    const dayInput = document.getElementById('date').querySelector('input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const birthYear = parseInt(yearInput.value);
        const birthMonth = parseInt(monthInput.value) - 1; // Month is zero-based (0-11)
        const birthDay = parseInt(dayInput.value);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        if (birthYear > currentYear) {
            displayError(yearInput, 'Enter a valid year');
            return;
        }
        else{
            displayError(yearInput,'');
        }
        if (birthMonth < 0 || birthMonth > 11) {
            displayError(monthInput, 'Enter a valid month');
            return;
        }
        else{
            displayError(monthInput,'');
        }
        const daysInSelectedMonth = daysInMonth(birthMonth, birthYear);
        if (birthDay <= 0 || birthDay > daysInSelectedMonth) {
            displayError(dayInput, 'Enter a valid day');
            return;
        }
        else{
            displayError(dayInput,'');
        }

        let ageYear = currentYear - birthYear;
        let ageMonth = currentMonth - birthMonth;
        let ageDay = currentDay - birthDay;

        if (ageDay < 0) {
            ageMonth -= 1;
            ageDay += daysInMonth(currentMonth - 1, currentYear);
        }

        if (ageMonth < 0) {
            ageYear -= 1;
            ageMonth += 12;
        }

        document.getElementById('showYear').textContent = ageYear;
        document.getElementById('showMonth').textContent = ageMonth;
        document.getElementById('showDay').textContent = ageDay;
    });

    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function displayError(input, message) {
        input.parentElement.querySelector('.error-message').textContent = message;
    }
});
