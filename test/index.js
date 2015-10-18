var tape = require("tape"),
    format = require("..");


tape("format(str, ...args)", function(assert) {
    assert.equal(format("Hello %s!", "World"), "Hello World!");
    assert.end();
});

tape("format.args(str, [args])", function(assert) {
    assert.equal(format.args("Hello %s!", ["World"]), "Hello World!");
    assert.end();
});
