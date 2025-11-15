async function deriveSecrets() {
    const files = Array.from({ length: 10 }, (_, i) => `data${i + 1}.txt`);
    let chars = [];

    for (const file of files) {
        try {
            const text = await fetch(file).then(res => {
                if (!res.ok) throw new Error(`Nie znaleziono pliku: ${file}`);
                return res.text();
            });
            // Wybieramy znaki z ustalonych pozycji (np. 5 i 17)
            chars.push(text[5], text[17]);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Tworzymy hasło z co trzeciego znaku
    const password = chars.filter((_, i) => i % 3 === 0).join('').slice(0, 3);

    // Magiczna liczba = suma kodów ASCII modulo 100
    const magicNumber = chars.reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 100;

    return { password, magicNumber };
}

async function checkPassword() {
    const input = document.getElementById('password').value.trim();
    const resultDiv = document.getElementById('result');

    const { password, magicNumber } = await deriveSecrets();

    console.log("Wyliczone hasło:", password);
    console.log("Wyliczona liczba:", magicNumber);

    if (input === password) {
        resultDiv.textContent = `Gratulacje! Twoja magiczna liczba to ${magicNumber}!`;
    } else {
        resultDiv.textContent = 'Niepoprawne hasło. Spróbuj ponownie!';
    }
}

// Dodajemy event listener zamiast onclick w HTML
document.getElementById('checkBtn').addEventListener('click', checkPassword);