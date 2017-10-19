//*****   for prime numbers   *****

// fillArr (function) - returns a required amount of prime numbers
// current (number) - value that is checked is it prime or not
// rec (function) - fills the array "arr" with prime numbers recursively

function fillArr() {
    var arr = [];
    var n = +prompt("Enter the quantity of elements", 2);
    if (!isNaN(n) && n > 0) {
        var current = 1;
        function rec(n) {
            if (n + 1 != 1) {
                var sum = 0;
                for (current; ; current++) {
                    for (var i = 2; i <= 9; i++) {
                        if ((current % i == 0) && (current != i))
                            break;
                        else if ((current > 5) && (current % 5 == 0))
                            break;
                        else
                            sum += 1;
                        if (sum == 8) {
                            arr.push(current);
                            current++;
                            return rec(n - 1);
                        }
                    }
                }
            }
        }
        rec(n);
        return arr;

    } else if (n == 0) {
        return "It is cancelled";

    } else {
        var confRes = confirm("You entered the string or negative number. Will you try again?");
        if (confRes) {
            return fillArr();
        } else {
            return "It is cancelled";
        }
    }
}
alert( fillArr() );
