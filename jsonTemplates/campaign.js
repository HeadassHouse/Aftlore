
module.exports = campaign =
{
    "campaign": {
        "name": "Corey's Viatlergy Campaign",
        "dm": "5ee98d2c93ea7b56987dbbc4",
        "description": "A campaign",
        "characters": [
            "5ee98d2c93ea7b56987dbbc4",
            "5ee98d2c93ea7b56987dbbc4"
        ],
        "ruleSet": {
            "name": "DND 5E",
            "shared": {
                "stats": [
                    {
                        "name": "hit points",
                        "defaultValue": 10,
                        "minValue": 0,
                        "maxValue": 400,
                        "rollModifier": 0,
                        "associatedSkills": []
                    },
                    {
                        "name": "dexterity",
                        "defaultValue": 10,
                        "minValue": 1,
                        "maxValue": 20,
                        "rollModifier": 0,
                        "associatedSkills": [
                            "acrobatics",
                            "stealth"
                        ]
                    },
                    {
                        "name": "constitution",
                        "defaultValue": 10,
                        "minValue": 1,
                        "maxValue": 20,
                        "rollModifier": -1,
                        "associatedSkills": []
                    }
                ],
                "characteristics": [
                    {
                        "type": "alignment",
                        "values": [
                            {
                                "name": "chaotic neutral",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "chaotic evil",
                                "modifiers": []
                            }
                        ]
                    },
                    {
                        "type": "level",
                        "values": [

                        ]
                    },
                    {
                        "type": "race",
                        "values": [
                            {
                                "name": "orc",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "elf",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "class",
                        "values": [
                            {
                                "name": "warrior",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "ranged",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "subclass",
                        "values": [

                        ]
                    }
                ],
                "items": [
                    {
                        "name": "Water Canteen",
                        "stackable": true,
                        "ammo": 10,
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "subtractAmmoOnUse": true,
                            "subtractionQuantity": 1,
                            "consumeOnUse": false,
                            "quantityOfTargets": 1
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 1,
                                "diceModifier": false,
                                "dice": "none"
                            }
                        ]
                    },
                    {
                        "name": "Sword",
                        "stackable": false,
                        "ammo": -1,
                        "onUse": {
                            "usableOnSelf": false,
                            "usableOnCharacters": true,
                            "subtractAmmoOnUse": false,
                            "subtractionQuantity": -1,
                            "consumeOnUse": false,
                            "quantityOfTargets": 1
                        },
                        "effectOnUse": [
                            {
                                "stat": "hit points",
                                "passiveModifier": 0,
                                "diceModifier": true,
                                "dice": "2d4"
                            }
                        ]
                    }
                ],
                "abilities": [
                    {
                        "name": "Infinite Spell",
                        "stackable": true,
                        "useRestriction": {
                            "coolDown": "none",
                            "amount": -1
                        },
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "quantityOfTargets": 3
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 0,
                                "diceModifier": true,
                                "dice": "2d4"
                            }
                        ]
                    },
                    {
                        "name": "Daily Spell",
                        "stackable": true,
                        "useRestriction": {
                            "coolDown": "day",
                            "amount": 1
                        },
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "quantityOfTargets": 3
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 90,
                                "diceModifier": false,
                                "dice": "none"
                            }
                        ]
                    }
                ]
            },
            "npc": {
                "stats": [
                    {
                        "name": "hit points",
                        "defaultValue": 10,
                        "minValue": 0,
                        "maxValue": 400,
                        "rollModifier": 0,
                        "associatedSkills": []
                    },
                    {
                        "name": "dexterity",
                        "defaultValue": 10,
                        "minValue": 1,
                        "maxValue": 20,
                        "rollModifier": 0,
                        "associatedSkills": [
                            "acrobatics",
                            "stealth"
                        ]
                    },
                    {
                        "name": "constitution",
                        "defaultValue": 10,
                        "minValue": 1,
                        "maxValue": 20,
                        "rollModifier": -1,
                        "associatedSkills": []
                    }
                ],
                "characteristics": [
                    {
                        "type": "alignment",
                        "values": [
                            {
                                "name": "chaotic neutral",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "chaotic evil",
                                "modifiers": []
                            }
                        ]
                    },
                    {
                        "type": "level",
                        "values": [
                        ]
                    },
                    {
                        "type": "race",
                        "values": [
                            {
                                "name": "orc",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "elf",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "class",
                        "values": [
                            {
                                "name": "warrior",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "ranged",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "subclass",
                        "values": [
                        ]
                    }
                ],
                "items": [
                    {
                        "name": "Water Canteen",
                        "stackable": true,
                        "ammo": 10,
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "subtractAmmoOnUse": true,
                            "subtractionQuantity": 1,
                            "consumeOnUse": false,
                            "quantityOfTargets": 1
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 1,
                                "diceModifier": false,
                                "dice": "none"
                            }
                        ]
                    },
                    {
                        "name": "Sword",
                        "stackable": false,
                        "ammo": -1,
                        "onUse": {
                            "usableOnSelf": false,
                            "usableOnCharacters": true,
                            "subtractAmmoOnUse": false,
                            "subtractionQuantity": -1,
                            "consumeOnUse": false,
                            "quantityOfTargets": 1
                        },
                        "effectOnUse": [
                            {
                                "stat": "hit points",
                                "passiveModifier": 0,
                                "diceModifier": true,
                                "dice": "2d4"
                            }
                        ]
                    }
                ],
                "abilities": [
                    {
                        "name": "Infinite Spell",
                        "stackable": true,
                        "useRestriction": {
                            "coolDown": "none",
                            "amount": -1
                        },
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "quantityOfTargets": 3
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 0,
                                "diceModifier": true,
                                "dice": "2d4"
                            }
                        ]
                    },
                    {
                        "name": "Daily Spell",
                        "stackable": true,
                        "useRestriction": {
                            "coolDown": "day",
                            "amount": 1
                        },
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "quantityOfTargets": 3
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 90,
                                "diceModifier": false,
                                "dice": "none"
                            }
                        ]
                    }
                ]
            },
            "player": {
                "stats": [
                    {
                        "name": "hit points",
                        "defaultValue": 10,
                        "minValue": 0,
                        "maxValue": 400,
                        "rollModifier": 0,
                        "associatedSkills": []
                    },
                    {
                        "name": "dexterity",
                        "defaultValue": 10,
                        "minValue": 1,
                        "maxValue": 20,
                        "rollModifier": 0,
                        "associatedSkills": [
                            "acrobatics",
                            "stealth"
                        ]
                    },
                    {
                        "name": "constitution",
                        "defaultValue": 10,
                        "minValue": 1,
                        "maxValue": 20,
                        "rollModifier": -1,
                        "associatedSkills": []
                    }
                ],
                "characteristics": [
                    {
                        "type": "alignment",
                        "values": [
                            {
                                "name": "chaotic neutral",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "chaotic evil",
                                "modifiers": []
                            }
                        ]
                    },
                    {
                        "type": "level",
                        "values": [

                        ]
                    },
                    {
                        "type": "race",
                        "values": [
                            {
                                "name": "orc",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "elf",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "class",
                        "values": [
                            {
                                "name": "warrior",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            },
                            {
                                "name": "ranged",
                                "modifiers": [
                                    {
                                        "type": "roll",
                                        "modifier": 3
                                    },
                                    {
                                        "type": "type",
                                        "modifier": -3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "subclass",
                        "values": [

                        ]
                    }
                ],
                "items": [
                    {
                        "name": "Water Canteen",
                        "stackable": true,
                        "ammo": 10,
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "subtractAmmoOnUse": true,
                            "subtractionQuantity": 1,
                            "consumeOnUse": false,
                            "quantityOfTargets": 1
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 1,
                                "diceModifier": false,
                                "dice": "none"
                            }
                        ]
                    },
                    {
                        "name": "Sword",
                        "stackable": false,
                        "ammo": -1,
                        "onUse": {
                            "usableOnSelf": false,
                            "usableOnCharacters": true,
                            "subtractAmmoOnUse": false,
                            "subtractionQuantity": -1,
                            "consumeOnUse": false,
                            "quantityOfTargets": 1
                        },
                        "effectOnUse": [
                            {
                                "stat": "hit points",
                                "passiveModifier": 0,
                                "diceModifier": true,
                                "dice": "2d4"
                            }
                        ]
                    }
                ],
                "abilities": [
                    {
                        "name": "Infinite Spell",
                        "stackable": true,
                        "useRestriction": {
                            "coolDown": "none",
                            "amount": -1
                        },
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "quantityOfTargets": 3
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 0,
                                "diceModifier": true,
                                "dice": "2d4"
                            }
                        ]
                    },
                    {
                        "name": "Daily Spell",
                        "stackable": true,
                        "useRestriction": {
                            "coolDown": "day",
                            "amount": 1
                        },
                        "onUse": {
                            "usableOnSelf": true,
                            "usableOnCharacters": true,
                            "quantityOfTargets": 3
                        },
                        "effectOnUse": [
                            {
                                "stat": "strength",
                                "passiveModifier": 90,
                                "diceModifier": false,
                                "dice": "none"
                            }
                        ]
                    }
                ]
            }
        },
        "maps": [
            "5ee98d2c93ea7b56987dbbc4",
            "5ee98d2c93ea7b56987dbbc4"
        ]
    }
}