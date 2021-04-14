import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';

describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should be 4", () => {
        expect(2+2).toEqual(4);
    });

    describe("getAll", () => {
        it("shoud return an array", () => {
        const result = service.getAll()
        expect(result).toBeInstanceOf(Array);
        });
    });

    describe("getOne", () => {

        it("should return a movie", () => {
        service.create({
            title: 'Test movie',
            genres: ['test'],
            year: 2020,
        })
        const movie = service.getOne(1);
        expect(movie).toBeDefined();
        expect(movie.id).toEqual(1);
        });
    
        it("should throw 404 error", () => {
        const idToFind: number = 1;
        try {
            service.getOne(idToFind);
        } catch(e) {
            expect(e).toBeInstanceOf(NotFoundException)
            expect(e.message).toEqual(`Movie with ID ${idToFind} not found.`)
        }
        })
    });

    describe("deleteOne", () => {
        it("delete a movie", () => {
        service.create({
            title: 'Test movie',
            genres: ['test'],
            year: 2020,
        })
        const beforeDelete = service.getAll().length;
        service.deleteOne(1);
        const afterDelete = service.getAll().length;
        expect(afterDelete).toBeLessThan(beforeDelete);
        })

        it("should return a 404", () => {
            try {
                service.deleteOne(1);
            } catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        })
    })

    describe("create", () => {
        it("should create a movie", () => {
            const beforeCreate = service.getAll().length;
            service.create({
                title: 'Test movie',
                genres: ['test'],
                year: 2020,
            })
            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        })
    })

    describe("update", () => {
        it("should update a movie", () => {
            service.create({
                title: 'Test movie',
                genres: ['test'],
                year: 2020,
            })

            service.update(1, { title: "Update Test"});
            const movie = service.getOne(1);
            expect(movie.title).toEqual("Update Test");
        })

        it("should throw a new a NotFoundException", () => {
            try {
                service.update(1, {});
            } catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        })
    })
});


