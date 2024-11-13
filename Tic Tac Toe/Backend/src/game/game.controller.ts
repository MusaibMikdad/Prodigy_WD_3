import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('reset')
  resetGame(): void {
    this.gameService.initializeGame();
  }

  @Post('move')
async handleMove(@Body() move: { row: number, col: number }) {
  const { row, col } = move;

  // Your logic to apply the move, update the board, and detect the winner
  const updatedBoard = this.gameService.makeMove(row, col);

  // Return the updated game state
  return updatedBoard;
}


  @Get('state')
  getBoardState(): string[][] {
    return this.gameService.getBoardState();
  }

  @Get('current-player')
  getCurrentPlayer(): string {
    return this.gameService.getCurrentPlayer();
  }

  @Get('winner')
  getWinner(): string | null {
    return this.gameService.getWinner();
  }
}
