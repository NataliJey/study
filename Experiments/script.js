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

let counter0 = 0;
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;

let testArray = [9, 8, 9, 9, 8];
poker(testArray);

function poker(array) {
    let count = [];
    for (let j = 0; j < array.length; j++) {
        count.push({});
        if (!isKeyInObject('number', count[j])) {
            count[j].number = array[j];
        }
        for (let i = 0; i < array.length; i++) {
            if (array[j] === array[i]) {

            }
        }
    }
    console.log(count)
}
function isKeyInObject(key, object) {
    return key in object;
}
//TODO нужно создавать объекты без повторов по цифрам, чтобы в нем писалось число и количество повторений, потом уже из массива объектов и выводить результат.