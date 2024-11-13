"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    resetGame() {
        this.gameService.initializeGame();
    }
    makeMove(move) {
        return this.gameService.makeMove(move.row, move.col);
    }
    getBoardState() {
        return this.gameService.getBoardState();
    }
    getCurrentPlayer() {
        return this.gameService.getCurrentPlayer();
    }
    getWinner() {
        return this.gameService.getWinner();
    }
};
exports.GameController = GameController;
__decorate([
    (0, common_1.Post)('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameController.prototype, "resetGame", null);
__decorate([
    (0, common_1.Post)('move'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], GameController.prototype, "makeMove", null);
__decorate([
    (0, common_1.Get)('state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], GameController.prototype, "getBoardState", null);
__decorate([
    (0, common_1.Get)('current-player'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], GameController.prototype, "getCurrentPlayer", null);
__decorate([
    (0, common_1.Get)('winner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], GameController.prototype, "getWinner", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map