const { ApolloError, PubSub } = require('apollo-server');
const { Query, Mutation, Subscription } = require('../map');
const { Where } = require('../utils/queryBuilder');
const buildPaginationObject = require('../utils/buildPaginationObject');
const {
  CreateDocument, GetDocuments, GetDocument, UpdateDocument, DeleteDocument, DeleteDocuments,
} = require('../utils/database');

jest.mock('apollo-server');
jest.mock('../utils/queryBuilder');
jest.mock('../utils/database');
jest.mock('../utils/buildPaginationObject');

describe('map resolver', () => {
  let maps;

  beforeEach(() => {
    maps = [
      {
        _id: '123',
        imageLink: 'imageLink',
        name: 'name',
        tiles: [
          {
            _id: '1231',
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            type: 'PASSABLE',
          },
        ],
        entities: [
          {
            type: 'CHARACTER',
            associatedId: '456',
          },
        ],
      },
      {
        _id: '456',
        imageLink: 'imageLink',
        name: 'name',
        tiles: [
          {
            _id: '4561',
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            type: 'PASSABLE',
          },
        ],
        entities: [
          {
            type: 'CHARACTER',
            associatedId: '789',
          },
        ],
      },
    ];
    CreateDocument.mockReturnValue(maps[0]);
    DeleteDocument.mockReturnValue(maps[0]);
    DeleteDocuments.mockReturnValue(maps[0]);
    GetDocument.mockReturnValue(maps[0]);
    GetDocuments.mockReturnValue(maps);
    UpdateDocument.mockReturnValue(maps[0]);
    buildPaginationObject.mockImplementation((input) => input);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('query', () => {
    describe('map(s)', () => {
      it('should return a map when an _id is provided', async () => {
        const input = {
          _id: '123',
        };

        const response = await Query.map(null, input);

        expect(response).toEqual(maps[0]);
      });

      it('should return maps when a where clause is provided', async () => {
        const input = {
          where: {
            and: [
              {
                or: [
                  {
                    property: 'prop',
                    value: 'val',
                    operation: 'EQUALS',
                  },
                ],
              },
            ],
          },
        };

        const response = await Query.maps(null, input);

        expect(Where).toHaveBeenCalledWith(input.where);
        expect(response).toEqual(maps);
      });
    });
  });

  describe('mutation', () => {
    describe('create map', () => {
      it('should return the map when created properly', async () => {
        const response = await Mutation.createMap(null, { map: maps[0] });

        expect(response).toEqual(maps[0]);
      });

      it('should throw an error when it could not create the map', async () => {
        CreateDocument.mockReturnValue(null);
        try {
          await Mutation.createMap(null, { map: maps[0] });
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'An error occurred while trying to create the map',
            'CREATE_MAP_ERROR',
          );
        }
      });
    });

    describe('edit map', () => {
      it('should return the account when edited properly', async () => {
        const info = {
          _id: '123',
          update: {
            property: 'prop',
            value: 'val',
          },
        };
        const response = await Mutation.editMap(null, info);

        expect(response).toEqual(maps[0]);
      });

      it('should throw an error when it could not edit the map', async () => {
        UpdateDocument.mockReturnValue(null);
        try {
          await Mutation.editMap(null, { map: maps[0] });
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'An error occurred while trying to edit the map',
            'EDIT_MAP_ERROR',
          );
        }
      });
    });

    describe('delete map', () => {
      it('should return the deleted map when an _id is provided', async () => {
        const input = {
          _id: '123',
        };

        const response = await Mutation.deleteMap(null, input);

        expect(response).toEqual(maps[0]);
      });

      it('should return deleted map(s) when a where clause is provided', async () => {
        const input = {
          where: {
            and: [
              {
                or: [
                  {
                    property: 'prop',
                    value: 'val',
                    operation: 'EQUALS',
                  },
                ],
              },
            ],
          },
        };

        const response = await Mutation.deleteMap(null, input);

        expect(Where).toHaveBeenCalledWith(input.where);
        expect(response).toEqual(maps[0]);
      });

      it('should throw an error if it could not delete the given map with _id', async () => {
        DeleteDocument.mockReturnValue(null);

        const input = {
          _id: '123',
        };

        try {
          await Mutation.deleteMap(null, input);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            // eslint-disable-next-line no-underscore-dangle
            `An error occurred while trying to delete map with supplied _id: ${input._id}`,
            'DELETE_MAP_ERROR',
          );
        }
      });

      it('should throw an error if it could not delete the given map(s) with where clause', async () => {
        DeleteDocuments.mockReturnValue(null);

        const input = {
          where: {
            and: [
              {
                or: [
                  {
                    property: 'prop',
                    value: 'val',
                    operation: 'EQUALS',
                  },
                ],
              },
            ],
          },
        };

        try {
          await Mutation.deleteMap(null, input);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            `An error occurred while trying to delete maps with supplied where: ${JSON.stringify(input.where)}`,
            'DELETE_MAPS_ERROR',
          );
        }
      });

      it('should throw an error if _id and where provided', async () => {
        const input = {
          _id: '123',
          where: {
            and: [
              {
                or: [
                  {
                    property: 'prop',
                    value: 'val',
                    operation: 'EQUALS',
                  },
                ],
              },
            ],
          },
        };

        try {
          await Mutation.deleteMap(null, input);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'Cannot specify id and where clause',
            'ID_AND_WHERE',
          );
        }
      });

      it('should throw an error if no _id or where provided', async () => {
        try {
          await Mutation.deleteMap(null, {});
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'No id or where clause was provided',
            'NO_ID_OR_WHERE',
          );
        }
      });
    });
  });

  describe('subscription', () => {
    it('should properly call the asyncIterator', () => {
      Subscription.mapUpdated.subscribe();

      expect(PubSub.prototype.asyncIterator).toHaveBeenCalledWith(['MAP_UPDATED']);
    });
  });
});
