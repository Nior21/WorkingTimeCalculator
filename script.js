function calculateTimeDifference(timeRanges) {
    // Разбиваем строку на отдельные диапазоны, используя "+" в качестве разделителя
    const timeRangesArray = timeRanges.split('+');


    let totalDifferenceMs = 0;
    for (const timeRange of timeRangesArray) {
        const trimmedTimeRange = timeRange.trim(); //Удаляем лишние пробелы

        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)-([0-1]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(trimmedTimeRange)) {
            return {
                error: `Неверный формат времени в диапазоне: ${trimmedTimeRange}`
            };
        }

        const [start, end] = trimmedTimeRange.split('-');
        const [startHours, startMinutes] = start.split(':').map(Number);
        const [endHours, endMinutes] = end.split(':').map(Number);

        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0);
        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0, 0);

        let differenceMs = endDate - startDate;
        if (differenceMs < 0) {
            differenceMs += 24 * 60 * 60 * 1000;
        }
        totalDifferenceMs += differenceMs;
    }

    const totalDifferenceHours = parseFloat((totalDifferenceMs / (60 * 60 * 1000)).toFixed(2));
    return totalDifferenceHours;
}

const timeForm = document.getElementById('timeForm');
const timeRangesInput = document.getElementById('timeRanges');
const resultOutput = document.getElementById('result');

timeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    processTimeRanges();
});

timeRangesInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Предотвращаем стандартное поведение Enter
        processTimeRanges();
    }
});

function processTimeRanges() {
    const timeRanges = timeRangesInput.value;
    const result = calculateTimeDifference(timeRanges);

    resultOutput.innerHTML = ''; // Очищаем предыдущий результат

    if (typeof result === 'object' && result.error) {
        const errorElement = document.createElement('span');
        errorElement.classList.add('error');
        errorElement.textContent = result.error;
        resultOutput.appendChild(errorElement);
    } else {
        resultOutput.textContent = result + " часа";
    }
}