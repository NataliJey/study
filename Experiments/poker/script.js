// Задача 1F. Покер

// Даны пять целых чисел. Среди них:
// • если одинаковы 5, то вывести «Impossible», иначе;
// • если одинаковы 4, то вывести «Four of a Kind», иначе;
// • если одинаковы 3 и 2, то вывести «Full House», иначе;
// • если есть 5 последовательных, то вывести «Straight», иначе;
// • если одинаковы 3, то вывести «Three of a Kind», иначе;
// • если одинаковы 2 и 2, то вывести «Two Pairs», иначе;
// • если одинаковы 2, то вывести One «Pair», иначе;
// • вывести «Nothing».
// Ограничения: все числа от 1 до 13 включительно, время 1 с.
// Ввод из файла poker.in. В первой строке находятся пять чисел через пробел.
// Вывод в файл poker.out. Выводится одна строка — результат анализа.
// [9,9,9,9,9] -> Impossible
// [9,9,9,9,8] -> Four of a kind
// [9,9,9,8,8] -> Full house
// [9,8,7,6,5] -> Straight
// [9,9,9,8,7] -> Three of a kind
// [9,9,8,8,7] -> Two pairs
// [9,9,8,7,6] -> Pair
// [9,8,7,6,1] -> Nothing
// [9,8,7,'8',5] -> Ошибка


let testArray = [8, 6, 7, 5, 9];

function poker(array) {
    let count = [];
    for (let j = 0; j < array.length; j++) {
        let numberInCount = count.find(function (element) {
            return element.number === array[j];
        });
        if (numberInCount === undefined) {
            count.push({});
            let numberOfElement = count.length - 1;
            count[numberOfElement].number = array[j];
            count[numberOfElement].count = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[j] === array[i]) {
                    count[numberOfElement].count = count[numberOfElement].count + 1;
                }
            }
        }
    }
    return count;
}

function consoleResult(array) {
    let objects = poker(array);
    for (const element of array) {
        if (typeof element !== 'number') {
            throw new Error('The array must only contain numbers');
        }
    }
    array.sort(function (a, b) {
        return a - b;
    });
    console.log(array)
    if (objects[0].count === 5) {
        return console.log('Impossible');
    } else if (objects[0].count === 4 || objects[1].count === 4) {
        return console.log('Four of a kind');
    } else if ((objects[0].count === 3 && objects[1].count === 2) || (objects[0].count === 2 && objects[1].count === 3)) {
        return console.log('Full house');
    } else if (objects[0].count === 3 || objects[1].count === 3 || objects[2].count === 3) {
        return console.log('Three of a kind');
    } else if ((objects[0].count === 2 && objects[1].count === 2) || (objects[1].count === 2 && objects[2].count === 2) || (objects[0].count === 2 && objects[2].count === 2)) {
        return console.log('Two pairs');
    } else if (objects[0].count === 2 || objects[1].count === 2 || objects[2].count === 2 || objects[3].count === 2) {
        return console.log('Pair');
    } else if (IsStraight(array)) {
        return console.log('Straight');
    } else {
        return console.log('Nothing');
    }
}

function IsStraight(array) {
    for (let j = 0; j < array.length - 1; j++) {
        if (array[j] + 1 !== array[j + 1]) {
            return false
        }
    }
    return true
}

consoleResult(testArray);