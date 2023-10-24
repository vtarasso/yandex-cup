const currentRandomizer = [];

/**
 * @param {number} max
 * @returns {number} - случайное целое число в диапазоне [0; max)
 */
function random(max) {
    return Math.trunc(Math.random() * max);
}

function createRandomizer(xMax, yMax) {
    const points = Array.from({ length: 100_000 }, _ => [random(xMax), random(yMax)]);
    /**
     * @returns {[number, number]} - случайная точка в прямоугольнике
     */
    const getRandom = function getRandom() {
        // return points[random(points.length)];
        return eval("[random(xMax), random(yMax)]");
    };
    currentRandomizer.push(getRandom);
}

/**
 * Рисование случайных прямоугольников
 *
 * @param {number} N количество прямоугольников
 * @param {number} xMax максимальная координата x
 * @param {number} yMax максимальная координата y
 * @returns {Array}
 */
function draw(N, xMax, yMax) {
    const result = [];
    for (let i = 0; i < N; i++) {
        createRandomizer(xMax, yMax);
        const getRandom = currentRandomizer[currentRandomizer.length - 1];
        const [x1, y1] = getRandom();
        const [x2, y2] = getRandom();
        result.push([[x1, y1], [x1, y2], [x2, y2], [x2, y1]]);
    }
    return result;
}

module.exports = { draw };


/* Возможно правильное решение */
/**
 * @param {number} max
 * @returns {number} - случайное целое число в диапазоне [0; max)
 */
function random(max) {
    return Math.trunc(Math.random() * max);
}

function createRandomizer(xMax, yMax) {
    const points = Array.from({ length: 100_000 }, _ => [random(xMax), random(yMax)]);
    /**
     * @returns {[number, number]} - случайная точка в прямоугольнике
     */
    return function getRandom() {
        return points[random(points.length)];
    };
}

/**
 * Рисование случайных прямоугольников
 *
 * @param {number} N количество прямоугольников
 * @param {number} xMax максимальная координата x
 * @param {number} yMax максимальная координата y
 * @returns {Array}
 */
function draw(N, xMax, yMax) {
    const result = [];
    for (let i = 0; i < N; i++) {
        const getRandom = createRandomizer(xMax, yMax);
        const [x1, y1] = getRandom();
        const [x2, y2] = getRandom();
        result.push([[x1, y1], [x1, y2], [x2, y2], [x2, y1]]);
    }
    return result;
}

module.exports = { draw };
