
function at (array, index) {
	if (index < 0) {
		index = array.length + index;
	} 
		return array[index];
} 


function includes(array, value) {
	for (let i = 0; i < array.length; i++){
		if (array[i]===value) {
			return true
		}
    }
    return false
}

function indexOf(array, value, fromIndex) {
	if (fromIndex === undefined) {
		fromIndex = 0;
	}
	if (fromIndex < 0) {
		fromIndex = array.length + fromIndex;
	} 
	for (let i = fromIndex; i < array.length; i++){
		if (array[i]===value) {
			return i
		}
    }
    return -1
}

function lastIndexOf(array, value, fromIndex) {
	if (fromIndex === undefined) {
		fromIndex = array.length - 1;
	}
	if (fromIndex < 0) {
		fromIndex = array.length + fromIndex;
	} 
	for (let i = fromIndex; i >= 0; i--){
		if (array[i]===value) {
			return i
		}
    }
    return -1
}

function join (array, separator) {
	let string = "";
	for (let i = 0; i < array.length; i++) {
		string = string + array[i];
		if (i !== array.length-1 ) {
			string = string + separator;
		}
	}	
	return string
}

function concat (array1, array2) {
	let array = [];

	for (let i = 0; i < array1.length; i++) {
		array.push (array1[i]);
	}
	for (let i = 0; i < array2.length; i++) {
		array.push (array2[i]);
	}

	return array
}

function fill (array, value, start, end) {
	if (start === undefined) {
		start = 0;
	}
	if (end === undefined) {
		end = array.length;
	}
	for (let i = start; i < end; i++) {

		array[i] = value;
	}
}
// не хуета 
function reverse (array) {
	for (let i = 0; i < array.length/2; i++) {
		let j = array.length - 1 - i;
		let c = array[i];
		array[i] = array[j];
		array[j] = c;
	}
	return array
}

//хуета
function reverse (array) {
	let length = array.length;
	for (let i = array.length - 1; i >= 0; i--) {
		array.push (array[i]);
	}
	for (let i = 0; i < length; i++) {
		array.shift ();
	}
	return array
}

function slice (array, start, end) {
	let newArray = [];
	if (start === undefined) {
		start = 0;
	}
	if (start < 0) {
		start = array.length + start;
	}
	if (end === undefined) {
		end = array.length;
	}
	if (end < 0) {
		end = array.length + end;
	}
	for (let i = start; i < end; i++) {
		newArray.push (array[i]);
	}
	return newArray
}

// не получилось
function splice(array, start,deleteCount, ...items) {
	let h = [];
	if (deleteCount === undefined) {
		for (let i = 0; i < start; i++) {
			h.push (array[i]);
	}
	return h
	}
}

let i = [1,2,3,4,5,6];

function forEach(array, callback) {
	for (let i = 0; i < array.length; i++) {
		callback (array[i]);
	}
}

function filter(array, callback) {
	let b = [];
	for (let i = 0; i < array.length; i++) {
		if (callback (array[i])) {
			b.push (array[i]);
		}
	}
	return b;
}

function isEven (n) {
	return n % 2 === 0;
}

function find (array, callback) {
	for (let i = 0; i < array.length; i++) {
		if (callback (array[i])) {
			return array[i];
		} 
	}
}

function findIndex (array, callback) {
	for (let i = 0; i < array.length; i++) {
		if (callback (array[i])) {
			return i;
		} 
	}
	return -1
}

function every (array, callback) {
	for (let i = 0; i < array.length; i++) {
		if (!callback (array[i])) {
			return false;
		} 
	}
	return true;
}

function some(array, callback) {
	for (let i = 0; i < array.length; i++) {
		if (callback (array[i])) {
			return true;
		} 
	}
	return false;
}

function map (array, callback) {
	let b = [];
	for (let i = 0; i < array.length; i++) {
		b.push (callback (array[i]));
	}
	return b;
}

function reduce (array, callback, initialValue) {
	if (initialValue === undefined && array.length === 0) {
		throw new Error('Can not reduce empty array without initial value');
	}
	let a = initialValue;
	let i = 0;
	if (initialValue === undefined) {
		a = array[i];
		i = 1;
	}
	for (; i < array.length; i++) {
		a = callback (a, array [i]);
	}
	return a
}

function reduceRight (array, callback, initialValue) {
	if (initialValue === undefined && array.length === 0) {
		throw new Error('Can not reduce empty array without initial value');
	}
	let a = initialValue;
	let i = array.length - 1;
	if (initialValue === undefined) {
		a = array[i];
		i = i-1;
	}
	for (; i >= 0; i--) {
		a = callback (a, array [i]);
	}
	return a
}

function sum (a, b) { 
	return a + b 
}

function sum2 (array) {
	let a = 0;
	for (let i = 0; i < array.length; i++) {
		a = a + array [i];
	}
	return a
}

function groupBy(array, callback) {
	let p = {};
	for (let i = 0; i < array.length; i++) {
		let key = toString (array[i]);
    	if (p[key] === undefined) {
			p[key] = [];
    	}
        p[key].push (array[i]);
	}
    return p;
}

function toString (item) {
	return (item % 10).toString();
}


function sort (array,comparator) {
	if (comparator === undefined) {
		comparator = function (a,b) {
			a = a.toString ();
			b = b.toString ();
		    if (a > b)  {
		      	return 1;
		    }
			if (a < b) {
			    return -1;
			}
			return 0; 
		}	
	}
	for (let j = 0; j < array.length-1; j++) {
		for (let i = 0; i < array.length-1-j; i++) {
			let f = i+1;
			if (comparator(array[i],array[f]) > 0) {
				let c = array[i];
				array[i] = array[f];
				array[f] = c;
			}
		}
	}
	return array
}

function comparator(a,b) {
    if (a > b)  {
      	return 1;
    }
	if (a < b) {
	    return -1;
	}
	return 0; 
}	

function flat (array) {
	let a = [];
	for (let i = 0; i < array.length; i++) {
		if (i[0] === undefined) {
			a.push (array[i]);
		}
		for (let j = 0; j < i.length; j++) {
			a.push (i[j]);
		}
	}
	return a
}

function flat (array) {
	let a = [];
	for (let i = 0; i < array.length; i++) {
		if (i.length === 0) {
			a.push (array[i]);
		}
		for (let j = 0; j < i.length; j++) {
			a.push (i[j]);
		}
	}
	return a
}


function flat (array) {
	let a = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i[0]] === undefined) {
			a.push (array[i]);
		}
	}
	return a
}

function flat (array) {
	let a = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === undefined) {
			a.push (array[i]);
		} else {
		for (let j = 0; j < i.length; j++) {
			a.push (i[j]);
		}
	}
    }
	return a
}

let f = [10,[9,8],7,6];
let g = ['q','w','e','r',2,5,6,9,7,8];
let h = [0,2,5,8,9]
console.log (slice (h));