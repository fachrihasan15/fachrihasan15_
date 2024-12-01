let display = document.getElementById('display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        display.value = eval(display.value); // Menghitung ekspresi
    } catch (e) {
        display.value = 'Error'; // Menampilkan 'Error' jika ada kesalahan
    }
}
