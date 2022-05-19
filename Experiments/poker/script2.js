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

poker([9, 5, 6, 8, 7])

function poker(numbers) {
    if (!isValid(numbers)) {
        throw new Error('The array must only contain numbers');
    }
    if (checkCounts(numbers, [5])) {
        console.log('Impossible')
    } else if (checkCounts(numbers, [4, 1])) {
        console.log('Four of a Kind')
    } else if (checkCounts(numbers, [3, 2])) {
        console.log('Full House')
    } else if (isStraight(numbers)) {
        console.log('Straight')
    } else if (checkCounts(numbers, [3, 1, 1])) {
        console.log('Three of a kind')
    } else if (checkCounts(numbers, [2, 2, 1])) {
        console.log('Two pairs')
    } else if (checkCounts(numbers, [2, 1, 1, 1])) {
        console.log('Pair')
    } else {
        console.log('Nothing')
    }
}

function checkCounts(numbers, neededCounts) {
    let counts = getCounts(numbers);
    return arraysEquals(counts, neededCounts);
}

function getCounts(numbers) {
    let countsMap = {};
    for (const number of numbers) {
        let count = countsMap[number] != null ? countsMap[number] : 0;
        countsMap[number] = count + 1;
    }
    let counts = Object.values(countsMap);
    counts.sort(function (a, b) {
        return b - a;
    })
    return counts
}

function arraysEquals(a, b) {
    return a.every(function (number, index) {
        return number === b[index];
    });
}

function isValid(numbers) {
    return numbers.every(function (number) {
        return typeof number === 'number';
    });
}

function isStraight(numbers) {
    let copy = numbers.slice();
    copy.sort(function (a, b) {
        return a - b;
    })
    return copy.every(function (number, index) {
        return index === 0 || number === copy[index - 1] + 1;
    })
}