const query = {
  query: `query { 
        getCampaign(_id:""){
          _id
          name
          dm
          description
          ruleSet {
            _id
            name
            shared {
              _id
              stats {
                _id
                name
                defaultValue
                minValue
                maxValue
                rollModifier
                associatedSkills
                }
              characteristics {
                _id
                type
                values {
                  _id
                  name
                  modifiers {
                    _id
                    modifier
                    type
                        }
                    }
                }
              items {
                _id
                name
                stackable
                ammo
                onUse {
                  _id
                  usableOnSelf
                  consumeOnUse
                  subtractAmmoOnUse
                  quantityOfTargets
                  usableOnCharacters
                  subtractionQuantity
                    }
                effectOnUse {
                  _id
                  stat
                  dice
                  diceModifier
                  passiveModifier
                    }
                }
              abilities {
                _id
                name
                stackable
                useRestriction {
                  _id
                  amount
                  coolDown
                    }
                onUse {
                  _id
                  usableOnSelf
                  quantityOfTargets
                  usableOnCharacters
                    }
                effectOnUse {
                  _id
                  stat
                  dice
                  diceModifier
                  passiveModifier
                    }
                }
            }
            npc {
              _id
              stats {
                _id
                name
                defaultValue
                minValue
                maxValue
                rollModifier
                associatedSkills
                }
              characteristics {
                _id
                type
                values {
                  _id
                  name
                  modifiers {
                    _id
                    modifier
                    type
                        }
                    }
                }
              items {
                _id
                name
                stackable
                ammo
                onUse {
                  _id
                  usableOnSelf
                  consumeOnUse
                  subtractAmmoOnUse
                  quantityOfTargets
                  usableOnCharacters
                  subtractionQuantity
                    }
                effectOnUse {
                  _id
                  stat
                  dice
                  diceModifier
                  passiveModifier
                    }
                }
              abilities {
                _id
                name
                stackable
                useRestriction {
                  _id
                  amount
                  coolDown
                    }
                onUse {
                  _id
                  usableOnSelf
                  quantityOfTargets
                  usableOnCharacters
                    }
                effectOnUse {
                  _id
                  stat
                  dice
                  diceModifier
                  passiveModifier
                    }
                }
            }
            player {
              _id
              stats {
                _id
                name
                defaultValue
                minValue
                maxValue
                rollModifier
                associatedSkills
                }
              characteristics {
                _id
                type
                values {
                  _id
                  name
                  modifiers {
                    _id
                    modifier
                    type
                        }
                    }
                }
              items {
                _id
                name
                stackable
                ammo
                onUse {
                  _id
                  usableOnSelf
                  consumeOnUse
                  subtractAmmoOnUse
                  quantityOfTargets
                  usableOnCharacters
                  subtractionQuantity
                    }
                effectOnUse {
                  _id
                  stat
                  dice
                  diceModifier
                  passiveModifier
                    }
                }
              abilities {
                _id
                name
                stackable
                useRestriction {
                  _id
                  amount
                  coolDown
                    }
                onUse {
                  _id
                  usableOnSelf
                  quantityOfTargets
                  usableOnCharacters
                    }
                effectOnUse {
                  _id
                  stat
                  dice
                  diceModifier
                  passiveModifier
                    }
                }
            }
        }
        maps
    }
}`,
};
