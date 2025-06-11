export class Game {
	constructor() {
		this.board = Array(9).fill('');
		this.winner = null;
		this.isDraw = false;
		this.player1 = '';
		this.player2 = '';
	}

	setValue(index) {
		if (board[index] === '' && !winner) {
			if ($decideVS === 'player' || currentPlayer === $chosenPlayer) {
				board[index] = currentPlayer;
				currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
				checkGameStatus();
				board = [...board];

				if ($decideVS === 'cpu' && $chosenPlayer !== currentPlayer && !winner) {
					setTimeout(cpuMove, 400);
				}
			}
		}
	}
	cpuMove() {
		const availableMoves = board.reduce((acc, cell, index) => {
			if (cell === '') {
				acc.push(index);
			}
			return acc;
		}, []);

		if (availableMoves.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableMoves.length);
			const randomMove = availableMoves[randomIndex];
			board[randomMove] = currentPlayer;
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			checkGameStatus();
		}
	}

	checkGameStatus() {
		const winCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		if (winner || isDraw) return;

		for (const combo of winCombos) {
			const [a, b, c] = combo;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				winner = board[a];

				if (winner === 'X') {
					scoreX++;
				} else {
					scoreO++;
				}

				setTimeout(() => winMod.showModal(), 100);
				return;
			}
		}

		if (board.every((cell) => cell !== '')) {
			isDraw = true;
			setTimeout(() => drawMod.showModal(), 100);
			scoreTies++;
		}
	}

	restartGame() {
		setTimeout(() => {
			board = Array(9).fill('');
			currentPlayer = 'X';
			winner = null;
			isDraw = false;

			winMod.close();
			drawMod.close();

			if ($decideVS === 'cpu' && $chosenPlayer === 'O') {
				cpuMove();
			}
		}, 200);
	}
}
