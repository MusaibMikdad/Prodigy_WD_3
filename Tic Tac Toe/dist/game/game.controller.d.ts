import { GameService } from './game.service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    resetGame(): void;
    makeMove(move: {
        row: number;
        col: number;
    }): string[][];
    getBoardState(): string[][];
    getCurrentPlayer(): string;
    getWinner(): string | null;
}
