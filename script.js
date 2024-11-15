let mineCount = 3;
let mines = [];
const grid = document.getElementById("grid");
const mineCountDisplay = document.getElementById("mineCount");

// Создание сетки
function createGrid() {
    grid.innerHTML = ''; // Очистка сетки
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
    }
}

// Увеличение количества мин
function increaseMines() {
    if (mineCount < 24) {
        mineCount++;
        mineCountDisplay.textContent = mineCount;
    }
}

// Уменьшение количества мин
function decreaseMines() {
    if (mineCount > 1) {
        mineCount--;
        mineCountDisplay.textContent = mineCount;
    }
}

// Запуск игры
function startGame() {
    createGrid(); // Пересоздание сетки при запуске игры
    mines = generateMines(); // Генерация позиций мин
    revealAllCells(); // Открытие всех ячеек сразу
    alert("Мины расставлены. Найдите безопасные ячейки!");
}

// Открытие всех ячеек сразу
function revealAllCells() {
    const cells = Array.from(grid.children);
    cells.forEach((cell, index) => {
        if (mines.includes(index)) {
            // Если это мина, показываем символ 💣
            cell.textContent = "💣"; 
            cell.classList.add("mine");
        } else {
            // Если это безопасная ячейка, показываем звезду
            cell.textContent = "⭐"; // Появляется звезда
            cell.classList.add("safe");
        }
        // Убираем возможность повторного нажатия на ячейку
        cell.removeEventListener("click", () => revealCell(index, cell));
    });
}

// Генерация случайных мин
function generateMines() {
    const minePositions = new Set();
    while (minePositions.size < mineCount) {
        const randomIndex = Math.floor(Math.random() * 25);
        minePositions.add(randomIndex);
    }
    return Array.from(minePositions);
}

// Инициализация игры при загрузке
window.onload = () => {
    createGrid(); // Создание сетки при загрузке
};
