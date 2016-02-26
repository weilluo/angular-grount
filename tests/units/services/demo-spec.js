describe('demoService test example', function() {
  var $service;

  beforeEach(module('DemoAppTest'));

  beforeEach(inject(function(_demo_) {
      $service = _demo_;
  }));

  it('run a test method', function() {
    var r = $service.exmapleMethod();
    expect(r).to.equal('karma test method');
  });
});
