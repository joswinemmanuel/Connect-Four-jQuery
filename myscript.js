var player1 = prompt("BLUE | Player One : Enter your name");
var player1Color = 'blue';

var player2 = prompt("RED | Player two : Enter your name");
var player2Color = 'red';

var table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log("Won starting at Row " + rowNum + " and Column " + colNum);
}

function changeColor(rowIndex, colIndex, color) {
    var x = $(table.eq(rowIndex).find('td').eq(colIndex).find('button'))
    x.css('background-color', color)
}

function returnColor(rowIndex, colIndex) {
    var y = $(table.eq(rowIndex).find('td').eq(colIndex).find('button'))
    return y.css('background-color')
}

function checkBottom(colIndex) {
    var colorReport = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log('Horizontal Four WIN');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log('Vertical Four WIN');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log('Diagonal Four WIN');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log('Diagonal Four WIN');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + " it is your turn")

$('.board button').on('click', function () {

    var col = $(this).closest('td').index();

    var bottamAvail = checkBottom(col);

    changeColor(bottamAvail, col, currentColor);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $('.mydiv').fadeOut(0.1);
        $('h3').fadeOut(0.1);
        $('h2').fadeOut(0.1);
        $('table tr').fadeOut(0.1);
        $('.mydiv').css({
            position: "absolute",
            top: "45%", left: "50%",
            transform: "translate(-50%, -50%)"
        })
        $('h1').text(currentName + " HAVE WON!!!\nWELL DONE");
        $('.mydiv').fadeIn(1000);
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + " it is your turn.")
        currentColor = player1Color;
    } else {
        currentName = player2;
        $('h3').text(currentName + " it is your turn.")
        currentColor = player2Color;
    }
})


document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    }

    let delay = 6,
        revisedMousePosX = 0,
        revisedMousePosY = 0;

    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }
    delayMouseFollow();
});