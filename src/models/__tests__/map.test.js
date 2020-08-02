const { model: MapModel } = require('../map');

describe('map model', () => {
  let map;
  beforeEach(() => {
    map = {
      imageLink: 'image',
      name: 'name',
      tiles: [{
        x: 0,
        y: 0,
        height: 1,
        width: 1,
        type: 'IMPASSABLE',
      }],
      entities: [{
        type: 'CHARACTER',
        associatedId: 'id',
      }],
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should properly build a map model', () => {
    jest.spyOn(MapModel.prototype, 'save')
      .mockImplementationOnce(() => 'success');

    const response = new MapModel(map).save();
    expect(response).toEqual('success');
  });
});
