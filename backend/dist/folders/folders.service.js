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
exports.FoldersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const folder_entity_1 = require("./entities/folder.entity");
const user_entity_1 = require("../users/entities/user.entity");
let FoldersService = class FoldersService {
    constructor(repo, userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }
    async create(data, user) {
        try {
            return await this.repo.save({ ...data, user: user });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(query) {
        try {
            query && query?.filter && (query.filter = JSON.parse(query.filter));
            let queryParam = {};
            if (query && query?.user) {
                queryParam.user = await this.userRepo.findOne({
                    where: {
                        id: query.user
                    }
                });
            }
            if (query && query?.filter) {
                if (query.filter?.parent === null) {
                    query.filter.parent = (0, typeorm_1.IsNull)();
                }
                else if (query.filter?.parent) {
                    query.filter.parent = await this.repo.findOne({
                        where: {
                            id: query.filter.parent
                        }
                    });
                }
            }
            if (query && query?.filter) {
                queryParam = {
                    ...queryParam,
                    ...query.filter,
                };
            }
            return await this.repo.find({
                where: queryParam,
                relations: ['user', 'parent', 'children'],
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(id) {
        try {
            const record = await this.repo.findOne({
                where: {
                    id: id,
                },
                relations: ['user', 'parent', 'children'],
            });
            if (!record) {
                throw new common_1.NotFoundException(`Record #${id} not found`);
            }
            return record;
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, data) {
        try {
            const record = await this.repo.findOne({
                where: {
                    id: id,
                },
            });
            if (!record) {
                throw new common_1.NotFoundException(`Record #${id} not found`);
            }
            return await this.repo.save({
                ...record,
                ...data,
                updatedAt: Date.now()
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            return await this.repo.delete(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(folder_entity_1.Folder)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], FoldersService);
//# sourceMappingURL=folders.service.js.map