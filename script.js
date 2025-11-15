async function scrambledLogic() {
    const weirdFiles = Array.from({ length: 8 }, (_, idx) => `data${idx + 1}.txt`);
    let strangeBucket = [];

    for (const oddFile of weirdFiles) {
        try {
            const messyText = await fetch(oddFile).then(r => {
                if (!r.ok) throw new Error(`Brak pliku: ${oddFile}`);
                return r.text();
            });
            strangeBucket.push(messyText[0]); 
        } catch (err) {
            console.error(err.message);
        }
    }

    const joinedChaos = strangeBucket.join(''); 
    const decodedStuff = atob(joinedChaos); 

    const inputFile = decodedStuff.slice(0, 3); 
    const sortedInputFile = decodedStuff.slice(3); 

    return { inputFile, sortedInputFile };
}

async function checkPassword() {
    const userTyped = document.getElementById('password').value.trim();
    const resultDiv = document.getElementById('result');

    const { inputFile, sortedInputFile } = await scrambledLogic();

    if (userTyped === inputFile) {
        resultDiv.textContent = `Gratulacje! Twoja magiczna liczba to ${sortedInputFile}!`;
    } else {
        resultDiv.textContent = 'Niepoprawne hasło. Spróbuj ponownie!';
    }
}

document.getElementById('checkBtn').addEventListener('click', checkPassword);