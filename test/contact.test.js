const request = require("supertest");
const app = require("../app");
const { sendEmail } = require("../services/contact.service");

describe("POST /api/contact", () => {
  jest.setTimeout(10000); // Set the timeout to 10 seconds

  it("should send email and return 200", async () => {
    // Test data
    const data = {
      name: "Khushi Verma",
      email: "khushiverma0978@gmail.com",
      phone: "9876543210",
      message: "I am interested in your printing services.",
      company: "xyz",
      countryCode: "+91",
    };

    // Supertest request to test POST /api/contact
    const response = await request(app)
      .post("/api/contact")
      .send(data)
      .expect(200); // Expected response status code

    // You can also assert things like response body
    expect(response.body.message).toBe("Email sent successfully"); // Ensure the correct response message
  });
});
