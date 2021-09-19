function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('')
    return reversedStr;
}

function isPallindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse; //could be done with if else, but, since it
    //  returns a bollean value , we can do it this way 
}

function convertDateToString(date) {
    var dateStr = {
        day: 15,
        month: 7,
        year: 2001
    }

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPallindromeForAllDateFormats(date) {
    var listOfPallindromes = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfPallindromes.length; i++) {
        if (isPallindrome(listOfPallindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPallindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        counter++;
        var isPallindrome = checkPallindromeForAllDateFormats(nextDate);
        if (isPallindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

var birthdayInput = document.querySelector("#birthday-input");
var showBtn = document.querySelector("#show-btn");
var output = document.querySelector("#output");

function clickHandler() {
    var birthdayStr = birthdayInput.value;

    if (birthdayStr !== '') {
        var listOfDate = birthdayStr.split('-')
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPallindrome = checkPallindromeForAllDateFormats(date);
        if (isPallindrome) {
            output.innerText = "yay! your birthday is a pallindrome";
        } else {
            var [counter , nextDate] = getNextPallindromeDate(date);
            output.innerText = `The next pallindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed by ${counter} days.`
        }
        
    }
}

showBtn.addEventListener("click", clickHandler);