var firstClick = true;
var over = false;

function createField(selector) {
    var i, j;
    var $table = $('<table>');

    for (i = 0; i < 10; i++) {
        var $tr = $('<tr>');
        for (j = 0; j < 10; j++) {
            var rand = Math.floor(Math.random() * (5 - 1)) + 1;
            $tr.append(
                $('<td>').mousedown(function (e) {
                    switch (e.which) {
                        case 1:
                            if (firstClick) {
                                firstClick = false;
                                generateMines($(this));
                                generateNumbers();
                            }

                            if (!over) {
                                showNumbers($(this));
                            }
                            break;
                        case 3:
                        default:
                            placeFlag($(this));
                            break;
                    }
                }).on("contextmenu", function () {
                    return false;
                }).attr('y', j).attr('x', i).attr('n', 0).attr('bg', rand));
        }
        $table.append($tr);
    }
    $(selector).append($table);
}

function generateMines($clicked_td) {
    var x = $clicked_td.attr('x');
    var y = $clicked_td.attr('y');
    var $tds = $('td[x!=' + x + '], td[y!=' + y + ']');

    $tds.each(function () {
        if (Math.random() < 0.2) {
            $(this).addClass('c4');
        }
    });
}

function generateNumbers() {
    var $mines = $('.c4');

    //console.log('#mines: ' + $mines.size());

    $mines.each(function () {
        var x = parseInt($(this).attr('x'));
        var y = parseInt($(this).attr('y'));
        var n;

        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                var $this = $('td[x=\"' + i + '\"][y=\"' + j + '\"]');
                n = parseInt($this.attr('n')) + 1;
                $this.attr('n', n);
            }
        }
    });
}

function placeFlag($clicked_td) {
    $clicked_td.addClass('flag');

    if ($('td.c4, :not(td.flag)').size() == 0) {
        gameWon();
    }
}

function gameWon() {
    alert('You won!');
}

function showNumbers($clicked_td) {
    //var done = false;
    //var index = $clicked_td.index();

    if ($clicked_td.attr('n') == 0 && !$clicked_td.hasClass('grass')) {
        $clicked_td.addClass('grass');
        findGrass($clicked_td);
    }
    else if (parseInt($clicked_td.attr('n')) > 0 && !$clicked_td.hasClass('c4')) {
        $clicked_td.addClass('visible');
    }
    else if ($clicked_td.hasClass('c4')) {
        gameOver($clicked_td);
    }
}

function findGrass($current) {
    var x = parseInt($current.attr('x'));
    var y = parseInt($current.attr('y'));

    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            var $this = $('td[x=\"' + i + '\"][y=\"' + j + '\"]');
            showNumbers($this);
        }
    }
}

function gameOver($clicked_td) {
    $clicked_td.removeClass('c4');
    $clicked_td.addClass('explode');
    showAllMines();
    alert('Game over!');
    over = true;
}

function showAllMines() {
    $('.c4').each(function () {
        $(this).addClass('visible');
    });
}


$(document).ready(function () {
    createField('#minefield');
});