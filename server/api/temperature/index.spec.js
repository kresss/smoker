'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var temperatureCtrlStub = {
  index: 'temperatureCtrl.index',
  show: 'temperatureCtrl.show',
  create: 'temperatureCtrl.create',
  update: 'temperatureCtrl.update',
  destroy: 'temperatureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var temperatureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './temperature.controller': temperatureCtrlStub
});

describe('Temperature API Router:', function() {

  it('should return an express router instance', function() {
    expect(temperatureIndex).to.equal(routerStub);
  });

  describe('GET /api/temperatures', function() {

    it('should route to temperature.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'temperatureCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/temperatures/:id', function() {

    it('should route to temperature.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'temperatureCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/temperatures', function() {

    it('should route to temperature.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'temperatureCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/temperatures/:id', function() {

    it('should route to temperature.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'temperatureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/temperatures/:id', function() {

    it('should route to temperature.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'temperatureCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/temperatures/:id', function() {

    it('should route to temperature.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'temperatureCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
