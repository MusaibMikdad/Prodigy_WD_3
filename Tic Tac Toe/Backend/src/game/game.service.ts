import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private board: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  private currentPlayer: string = 'X';
  private winner: string | null = null;

  // Initialize or reset the board
  initializeGame(): void {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.currentPlayer = 'X';
    this.winner = null;
  }

  // Place move on the board
  makeMove(row: number, col: number): string[][] {
    if (this.board[row][col] === '' && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
    return this.board;
  }

  // Check for a winner
  private checkWinner(): boolean {
    const lines = [
      // Rows
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Columns
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Diagonals
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    return lines.some(line => line.every(cell => cell === this.currentPlayer));
  }

  getBoardState(): string[][] {
    return this.board;
  }

  getCurrentPlayer(): string {
    return this.currentPlayer;
  }

  getWinner(): string | null {
    return this.winner;
  }
}
