var tape = require("tape"),
    format = require("..");


tape("format(str, ...params)", function(assert) {
    assert.equal(format("Hello %s!", "World"), "Hello World!");
    assert.end();
});

tape("format.array(str, [params])", function(assert) {
    assert.equal(format.array("Hello %s!", ["World"]), "Hello World!");
    assert.end();
});
