var firstClick = true;
var currentColor = 'black';
function createField(selector) {
    var i, j;
    var $table = $('<table>');

    for (i = 0; i < 10; i++) {
        var $tr = $('<tr>');
        for (j = 0; j < 10; j++) {
            $tr.append(
                $('<td>').click(
                    function (event) {
                        if (firstClick) {
                            $(this).toggleClass('black');
                            generateMines($(this));
                            generateNumbers();
                            findMines($(this));
                            firstClick = false;
                        }
                    }
                ).attr('y', j).attr('x', i).attr('n', 0)
            );
        }
        $table.append($tr);
    }

    $(selector).append($table);
}

function generateMines($clicked_td) {
    var x = $clicked_td.attr('x');
    var y = $clicked_td.attr('y');

    if (firstClick) {
        firstClick = false;
        var $tds = $('td[x!=' + x + '], td[y!=' + y + ']');

        //alert($tds.size());
        $tds.each(function () {
            if (Math.random() < 0.2) {
                $(this).addClass('mine');
            }
        });
    }
}

function placeFlag($clicked_td) {

}

function findMines($clicked_td) {

}

function showNumbers($clicked_td) {
    //test
    $('td').each(function () {
        if ($(this).attr('n') != 0 && $(this).attr('class') != 'mine') {
            $(this).text($(this).attr('n'));
        }
    });
}

function generateNumbers() {
    var $mines = $('td.mine');

    console.log('#mines: ' + $mines.size());

    $mines.each(function () {
        var index = $(this).index() + 1;
        var n;

        //Ez a resz ocsmány, kéne valami jobb megoldás

        //kettő mellette
        n = parseInt($(this).prev().attr('n')) + 1;
        $(this).prev().attr('n', n);
        n = parseInt($(this).next().attr('n')) + 1;
        $(this).next().attr('n', n);

        //három felette
        n = parseInt($(this).parent().prev().find('td:nth-child(' + index + ')').attr('n')) + 1;
        $(this).parent().prev().find('td:nth-child(' + index + ')').attr('n', n);
        n = parseInt($(this).parent().prev().find('td:nth-child(' + index + ')').prev().attr('n')) + 1;
        $(this).parent().prev().find('td:nth-child(' + index + ')').prev().attr('n', n);
        n = parseInt($(this).parent().prev().find('td:nth-child(' + index + ')').next().attr('n')) + 1;
        $(this).parent().prev().find('td:nth-child(' + index + ')').next().attr('n', n);

        //három alatt
        n = parseInt($(this).parent().next().find('td:nth-child(' + index + ')').attr('n')) + 1;
        $(this).parent().next().find('td:nth-child(' + index + ')').attr('n', n);
        n = parseInt($(this).parent().next().find('td:nth-child(' + index + ')').prev().attr('n')) + 1;
        $(this).parent().next().find('td:nth-child(' + index + ')').prev().attr('n', n);
        n = parseInt($(this).parent().next().find('td:nth-child(' + index + ')').next().attr('n')) + 1;
        $(this).parent().next().find('td:nth-child(' + index + ')').next().attr('n', n);
    });

    //showNumbers();

}

window.onload = function () {
    createField('#minefield');
}