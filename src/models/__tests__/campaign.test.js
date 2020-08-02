const { model: CampaignModel } = require('../campaign');

describe('campaign model', () => {
  let campaign;
  beforeEach(() => {
    campaign = {
      name: 'name',
      dm: '12345678',
      description: 'a campaign',
      characters: ['12345678', '12345679'],
      ruleSet: null,
      maps: ['12345678', '12345679'],
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should properly build a campaign model', () => {
    jest.spyOn(CampaignModel.prototype, 'save')
      .mockImplementationOnce(() => 'success');

    const response = new CampaignModel(campaign).save();
    expect(response).toEqual('success');
  });
});
