var firstClick = true;
var currentColor = 'black';

function createField(selector) {
    var i, j;
    var $table = $('<table>');

    for (i = 0; i < 10; i++) {
        var $tr = $('<tr>');
        for (j = 0; j < 10; j++) {
            $tr.append(
                $('<td>').click(function() {
                    if (firstClick) {
                        firstClick = false;
                        $(this).toggleClass('black');
                        generateMines($(this));
                        generateNumbers();
                        findMines($(this));
                    }
                }).attr('y', j).attr('x', i).attr('n', 0));
        }
        $table.append($tr);
    }
    $(selector).append($table);
}

function generateMines($clicked_td) {
    var x = $clicked_td.attr('x');
    var y = $clicked_td.attr('y');
    var $tds = $('td[x!=' + x + '], td[y!=' + y + ']');

    $tds.each(function() {
        if (Math.random() < 0.2) {
            $(this).addClass('c4');
        }
    });
}

function placeFlag($clicked_td) {

}

function findMines($clicked_td) {

}

function showNumbers($clicked_td) {
    //test
    $('td').each(function() {
        if ($(this).attr('n') != 0 && $(this).attr('class') != 'mine') {
            $(this).text($(this).attr('n'));
        }
    });
}

function generateNumbers() {
    var $mines = $('.c4');

    console.log('#mines: ' + $mines.size());

    $mines.each(function() {
        var x = parseInt($(this).attr('x'));
        var y = parseInt($(this).attr('y'));
        var n;

        for (var i = x-1; i <= x+1; i++) {
            for (var j = y-1; j <= y+1; j++) {
                var $this = $('td[x=\"' + i + '\"][y=\"' + j + '\"]');
                n = parseInt($this.attr('n')) + 1;
                $this.attr('n', n);
            }
        }
    });

    //showNumbers();
}

$(document).ready(function() {
    createField('#minefield');
});