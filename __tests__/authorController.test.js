const request = require('supertest');
const app = require('../index'); // Import your Express app
const { PrismaClient } = require('@prisma/client'); // Add Prisma import

const prisma = new PrismaClient(); // Initialize Prisma client

// Test Suite
describe("Author API", () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        // Optionally clear authors if you want to test in a clean state
        // await prisma.author.deleteMany(); 
    });

    it("should return all authors", async () => {
        const response = await request(app).get("/authors");
        expect(response.status).toBe(200); // Assuming there is one author in the DB
        expect(response.body.length).toBeGreaterThan(0); // Check that authors are returned
    });

    it("should create a new author", async () => {
        const newAuthor = { name: "Author One", picture: "picture_url" };
        const response = await request(app)
            .post("/authors")
            .send(newAuthor);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newAuthor.name);
        expect(response.body.picture).toBe(newAuthor.picture);
    });

    it("should get an author by ID", async () => {
        // Assuming the existing author has ID 9
        const response = await request(app).get(`/authors/9`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(9); // Verify the ID
    });

    it("should update the existing author", async () => {
        const updatedData = { name: "Updated Author", picture: "new_picture_url" };
        const response = await request(app)
            .put(`/authors/10`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.picture).toBe(updatedData.picture);
    });

    it("should delete the existing author", async () => {
        const response = await request(app).delete(`/authors/11`);
        expect(response.status).toBe(204);

        const deletedResponse = await request(app).get(`/authors/9`);
        expect(deletedResponse.status).toBe(404); // Author should no longer exist
    });

    it("should return 404 when author not found", async () => {
        const response = await request(app).get("/authors/999");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Author not found");
    });
});
