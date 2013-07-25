var Checkers = (function() {

	var topLeft = 36;
	var whoseTurn = undefined;
	var selectedChecker = undefined;

	$(document).ready(function() {
		initialize();
	});

	function initialize() {
		var board = $('#board');
		
		for (var y = 0; y < 8; y++) {
			board.append('<div>');
			for (var x = 0; x < 8; x++) {
			
				var locationId = x.toString() + y.toString();
				var tileColor = "brownTile";
				if ((y + x) % 2 == 0) {
					tileColor = "whiteTile";
				} else {
					//add checker piece to body
					var color;
					if (y < 3) {
						$('body').append('<div id="checker' + locationId + '" class="checker redChecker" style="top: ' + (topLeft * y) + 'px;left: ' + (topLeft * x) + 'px;"></div>');
						color = 'red';
					} else if (y > 4) {
						$('body').append('<div id="checker' + locationId + '"class="checker blackChecker" style="top: ' + (topLeft * y) + 'px;left: ' + (topLeft * x) + 'px;"></div>');
						color = 'black';
					}
					
					var checkerElement = $('#checker' + locationId);
					if (checkerElement.length == 1) {
						checkerElement.data('x', x);
						checkerElement.data('y', y);
						checkerElement.data('color', color);
					}
				}

				//add tile div
				board.append('<div id="tile' + locationId +'" class="tile ' + tileColor + '" style="top: ' + (topLeft * y) + 'px;right: ' + (topLeft * x) + 'px;"></div>');
				$('#tile' + locationId).data('x', x);
				$('#tile' + locationId).data('y', y);
			}
			board.append('</div>');
		}
		
		$('.checker').click(function(event) {
			if (selectedChecker == undefined && $(this).data('color') == whoseTurn) {
				selectedChecker = $(this);
				selectedChecker.addClass('selectedChecker');
			} else if (selectedChecker != undefined 
				&& $(this).data('color') == whoseTurn) {
				selectedChecker.removeClass('selectedChecker');
				selectedChecker = $(this);
				selectedChecker.addClass('selectedChecker');
			}
		});
		
		$('.brownTile').click(function(event) {
			if (selectedChecker != undefined) {
				var selectedTile = $(this);
				var x = selectedTile.data('x');
				x = selectedTile.data('y');
				
				if (isLegalMove(selectedTile)) {
					moveChecker(selectedTile);
					nextTurn();
				}
			}
		});
		
		whoseTurn = 'red';
	}
	
	function isLegalMove(selectedTile) {
		var isLegal = false;
		var direction = 1;
		if (whoseTurn == 'red') {
			direction = -1;
		}
		
		var xDiff = selectedTile.data('x') - selectedChecker.data('x');
		var yDiff = selectedTile.data('y') - selectedChecker.data('y');
		
		var posXDiff = xDiff;
		if (xDiff < 0) {
			posXDiff *= -1;
		}
		
		var posYDiff = yDiff;
		if (yDiff < 0) {
			posYDiff *= -1;
		}
		
		if (isCorrectDirection(yDiff)) {
			if (posXDiff == 1 && posYDiff == 1 
				&& !isCheckerAtLocation(selectedTile.data('x'), selectedTile.data('y'))) {
				isLegal = true;
			} else if (posXDiff/2 == 1 && posYDiff/2 == 1 
				&& true /*TODO: is there a checker to jump */
				&& true /*TODO: checker color is opposite */
				&& !isCheckerAtLocation(selectedTile.data('x'), selectedTile.data('y'))) {
			}
		}
		
		return isLegal;
	}
	
	function isCorrectDirection(yDiff) {
		var correctDirection = false;
		if (whoseTurn == 'red' && (yDiff > 0 || isKing())) {
			correctDirection = true;
		} else if (whoseTurn == 'black' && (yDiff < 0 || isKing())) {
			correctDirection = true;
		}
		
		return correctDirection;
	}
	
	function isKing() {
		var king = false;
		if ('true' == selectedChecker.data('king')) {
			king = true;
		}
		return king;
	}
	
	function isCheckerAtLocation(x, y) {
		var checker = $('#checker' + x.toString() + y.toString());
		var hasChecker = false;
		if (checker.length == 1) {
			hasChecker = true;
		}
		
		return hasChecker;
	}
	
	function moveChecker(selectedTile) {
		selectedChecker.css('left', selectedTile.offset().left);
		selectedChecker.css('top', selectedTile.offset().top);
		selectedChecker.data('x', selectedTile.data('x'));
		selectedChecker.data('y', selectedTile.data('y'));
		selectedChecker.removeAttr('id');
		selectedChecker.attr('id', selectedTile.data('x').toString() + selectedTile.data('y').toString());
	}
	
	function nextTurn() {
	
		selectedChecker.removeClass('selectedChecker');
		selectedChecker = undefined;
		
		if (whoseTurn == 'red') {
			whoseTurn = 'black';
		} else {
			whoseTurn = 'red';
		}
	}
	
	return {
	};
})();

