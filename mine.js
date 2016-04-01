var firstClick = true;
var over = false;

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
                        //$(this).toggleClass('black');
                        generateMines($(this));
                        generateNumbers();
                        //findMines($(this));
                    }
					
					if(!over){
						showNumbers($(this));
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
	$clicked_td.addClass('flag')
}

function showAllMines() {
	$('.c4').each(function(){
		$(this).addClass('visible');
	});
}

function gameOver($clicked_td){
	$clicked_td.removeClass('c4');
	$clicked_td.addClass('explode');
	showAllMines();
	alert('faggit');
	over = true;
}

function showNumbers($clicked_td) {
    var done = false;
	var index = $clicked_td.index();
	
	if($clicked_td.attr('n') == 0 && !$clicked_td.hasClass('grass')){
		$clicked_td.addClass('grass');
		findGrass($clicked_td);
	}
	else if(parseInt($clicked_td.attr('n')) > 0 && !$clicked_td.hasClass('c4')){
		$clicked_td.addClass('visible');
	}
	else if($clicked_td.hasClass('c4')){
		gameOver($clicked_td);
	}
}

function findGrass($current){
	var x = parseInt($current.attr('x'));
    var y = parseInt($current.attr('y'));

    for (var i = x-1; i <= x+1; i++) {
        for (var j = y-1; j <= y+1; j++) {
            var $this = $('td[x=\"' + i + '\"][y=\"' + j + '\"]');
			showNumbers($this);
        }
    }
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
}

$(document).ready(function() {
    createField('#minefield');
});