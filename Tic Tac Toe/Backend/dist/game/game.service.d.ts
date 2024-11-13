export declare class GameService {
    private board;
    private currentPlayer;
    private winner;
    initializeGame(): void;
    makeMove(row: number, col: number): string[][];
    private checkWinner;
    getBoardState(): string[][];
    getCurrentPlayer(): string;
    getWinner(): string | null;
}
