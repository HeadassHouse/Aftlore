const { model, Schema } = require('mongoose');

const CharacterDefinition = new Schema({
  stats: [{
    name: String,
    defaultValue: Number,
    minValue: Number,
    rollModifier: Number,
    associatedSkills: [String],
  }],
  characteristics: [{
    type: { type: String },
    values: [
      {
        name: String,
        modifiers: [
          {
            type: { type: String },
            modifier: Number,
          },
        ],
      },
    ],
  }],
  items: [
    {
      name: String,
      stackable: Boolean,
      ammo: Number,
      onUse: {
        usableOnSelf: Boolean,
        usableOnCharacters: Boolean,
        subtractAmmoOnUse: Boolean,
        subtractionQuantity: Number,
        consumeOnUse: Boolean,
        quantityOfTargets: Number,
      },
      effectOnUse: [
        {
          stat: String,
          passiveModifier: Number,
          diceModifier: Boolean,
          dice: String,
        },
      ],
    },
  ],
  abilities: [
    {
      name: String,
      stackable: Boolean,
      maxUses: {
        coolDown: String,
        amount: Number,
      },
      onUse: {
        usableOnSelf: Boolean,
        usableOnCharacters: Boolean,
        quantityOfTargets: Number,
      },
      effectOnUse: [
        {
          stat: String,
          passiveModifier: Number,
          diceModifier: Boolean,
          dice: String,
        },
      ],
    },
  ],
});

const RuleSetSchema = new Schema({
  name: { type: String },
  shared: { type: CharacterDefinition },
  npc: { type: CharacterDefinition },
  player: { type: CharacterDefinition },
});

module.exports = {
  RuleSetModel: model('RuleSet', RuleSetSchema),
  CharacterModel: model('Character', CharacterDefinition),
};
