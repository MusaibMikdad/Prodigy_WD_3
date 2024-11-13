"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
let GameService = class GameService {
    constructor() {
        this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        this.currentPlayer = 'X';
        this.winner = null;
    }
    initializeGame() {
        this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        this.currentPlayer = 'X';
        this.winner = null;
    }
    makeMove(row, col) {
        if (this.board[row][col] === '' && !this.winner) {
            this.board[row][col] = this.currentPlayer;
            if (this.checkWinner()) {
                this.winner = this.currentPlayer;
            }
            else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
        return this.board;
    }
    checkWinner() {
        const lines = [
            [this.board[0][0], this.board[0][1], this.board[0][2]],
            [this.board[1][0], this.board[1][1], this.board[1][2]],
            [this.board[2][0], this.board[2][1], this.board[2][2]],
            [this.board[0][0], this.board[1][0], this.board[2][0]],
            [this.board[0][1], this.board[1][1], this.board[2][1]],
            [this.board[0][2], this.board[1][2], this.board[2][2]],
            [this.board[0][0], this.board[1][1], this.board[2][2]],
            [this.board[0][2], this.board[1][1], this.board[2][0]],
        ];
        return lines.some(line => line.every(cell => cell === this.currentPlayer));
    }
    getBoardState() {
        return this.board;
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    getWinner() {
        return this.winner;
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)()
], GameService);
//# sourceMappingURL=game.service.js.map