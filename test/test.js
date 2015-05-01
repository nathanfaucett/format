var assert = require("assert"),
    format = require("../src/index");


describe("format", function() {
    describe("#format(str, ...args)", function() {
        it("should format strings like 'Hello %s!'", function() {

            assert.equal(format("Hello %s!", "World"), "Hello World!");
        });
    });
    describe("#format.args(str, [args])", function() {
        it("should format strings like 'Hello %s!'", function() {

            assert.equal(format.args("Hello %s!", ["World"]), "Hello World!");
        });
    });
});
