import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from '../../src/movies/movies.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [MoviesModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
          }));
        await app.init();
    });

    describe("/movies", () => {
        it("GET", () => {
            return request(app.getHttpServer())
                .get("/movies")
                .expect(200)
                .expect([])
        });

        it("POST 201", () => {
            return request(app.getHttpServer())
                .post("/movies")
                .send({
                    title: "test",
                    year: 2000,
                    genres: ["test"],
                })
                .expect(201);
        });

        it("POST 400", () => {
            return request(app.getHttpServer())
                .post("/movies")
                .send({
                    title: "test",
                    year: 2000,
                    genres: ["test"],
                    other: "thing",
                })
                .expect(400);
        });

        it("DELETE", () => {
            return request(app.getHttpServer())
                .delete("/movies")
                .expect(404);
        })
    });

    describe("/movies/:id", () => {
        it("GET 200", () => {
            return request(app.getHttpServer())
                .get("/movies/1")
                .expect(200)
        });

        it("GET 404", () => {
            return request(app.getHttpServer())
                .get("/movies/999")
                .expect(404)
        });
        
        it("PATCH 200", () => {
            return request(app.getHttpServer())
                .patch('/movies/1')
                .send({title: "patch_test"})
                .expect(200);
                
        });

        it("DELETE 200", () => {
            return request(app.getHttpServer())
                .delete("/movies/1")
                .expect(200)
        });
    })
});