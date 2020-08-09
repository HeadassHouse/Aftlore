const { ApolloError } = require('apollo-server');
const buildPaginationObject = require('../buildPaginationObject');

jest.mock('apollo-server');

describe('pagination object builder', () => {
  let data;

  beforeEach(() => {
    data = [
      {
        _id: '1',
        foo: 'bar',
      },
      {
        _id: '2',
        foont: 'barnt',
      },
      {
        _id: '3',
        foot: 'bart',
      },
      {
        _id: '4',
        fo: 'ba',
      },
      {
        _id: '5',
        food: 'bard',
      },
    ];
  });

  it('should return a default cursor object when nothing is supplied', () => {
    const cursor = buildPaginationObject([]);

    expect(cursor).toEqual({
      edges: [],
      pageInfo: {
        startCursor: null,
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      count: 0,
    });
  });

  describe('first and/or last supplied', () => {
    it('should return first 2 elements', () => {
      const cursor = buildPaginationObject(data, 2);

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '1',
              foo: 'bar',
            },
            cursor: '1',
          },
          {
            node: {
              _id: '2',
              foont: 'barnt',
            },
            cursor: '2',
          },
        ],
        pageInfo: {
          startCursor: '1',
          endCursor: '2',
          hasNextPage: true,
          hasPreviousPage: false,
        },
        count: 2,
      });
    });

    it('should return all elements when first is greater than amount of data', () => {
      const cursor = buildPaginationObject(data, 6);

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '1',
              foo: 'bar',
            },
            cursor: '1',
          },
          {
            node: {
              _id: '2',
              foont: 'barnt',
            },
            cursor: '2',
          },
          {
            node: {
              _id: '3',
              foot: 'bart',
            },
            cursor: '3',
          },
          {
            node: {
              _id: '4',
              fo: 'ba',
            },
            cursor: '4',
          },
          {
            node: {
              _id: '5',
              food: 'bard',
            },
            cursor: '5',
          },
        ],
        pageInfo: {
          startCursor: '1',
          endCursor: '5',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        count: 5,
      });
    });

    it('should throw an error when first is less than 0', () => {
      try {
        buildPaginationObject([], -1);
      } catch (_) {
        expect(ApolloError).toHaveBeenCalledWith('Cannot be less than 0', 'LESS_THAN_ZERO');
      }
    });

    it('should return last 2 elements', () => {
      const cursor = buildPaginationObject(data, null, 2);

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '4',
              fo: 'ba',
            },
            cursor: '4',
          },
          {
            node: {
              _id: '5',
              food: 'bard',
            },
            cursor: '5',
          },
        ],
        pageInfo: {
          startCursor: '4',
          endCursor: '5',
          hasNextPage: false,
          hasPreviousPage: true,
        },
        count: 2,
      });
    });

    it('should return all elements when last is greater than amount of data', () => {
      const cursor = buildPaginationObject(data, null, 6);

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '1',
              foo: 'bar',
            },
            cursor: '1',
          },
          {
            node: {
              _id: '2',
              foont: 'barnt',
            },
            cursor: '2',
          },
          {
            node: {
              _id: '3',
              foot: 'bart',
            },
            cursor: '3',
          },
          {
            node: {
              _id: '4',
              fo: 'ba',
            },
            cursor: '4',
          },
          {
            node: {
              _id: '5',
              food: 'bard',
            },
            cursor: '5',
          },
        ],
        pageInfo: {
          startCursor: '1',
          endCursor: '5',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        count: 5,
      });
    });

    it('should throw an error when last is less than 0', () => {
      try {
        buildPaginationObject([], null, -1);
      } catch (_) {
        expect(ApolloError).toHaveBeenCalledWith('Cannot be less than 0', 'LESS_THAN_ZERO');
      }
    });

    it('should throw an error when first and last supplied', () => {
      try {
        buildPaginationObject([], 1, 1);
      } catch (_) {
        expect(ApolloError).toHaveBeenCalledWith('Cannot specify both first and last', 'FIRST_LAST_ERROR');
      }
    });
  });

  describe('before or after supplied', () => {
    it('should return elements after cursor', () => {
      const cursor = buildPaginationObject(data, null, null, null, '2');

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '3',
              foot: 'bart',
            },
            cursor: '3',
          },
          {
            node: {
              _id: '4',
              fo: 'ba',
            },
            cursor: '4',
          },
          {
            node: {
              _id: '5',
              food: 'bard',
            },
            cursor: '5',
          },
        ],
        pageInfo: {
          startCursor: '3',
          endCursor: '5',
          hasNextPage: false,
          hasPreviousPage: true,
        },
        count: 3,
      });
    });

    it('should return all elements if after cursor DNE', () => {
      const cursor = buildPaginationObject(data, null, null, null, '6');

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '1',
              foo: 'bar',
            },
            cursor: '1',
          },
          {
            node: {
              _id: '2',
              foont: 'barnt',
            },
            cursor: '2',
          },
          {
            node: {
              _id: '3',
              foot: 'bart',
            },
            cursor: '3',
          },
          {
            node: {
              _id: '4',
              fo: 'ba',
            },
            cursor: '4',
          },
          {
            node: {
              _id: '5',
              food: 'bard',
            },
            cursor: '5',
          },
        ],
        pageInfo: {
          startCursor: '1',
          endCursor: '5',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        count: 5,
      });
    });

    it('should return elements before cursor', () => {
      const cursor = buildPaginationObject(data, null, null, '3');

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '1',
              foo: 'bar',
            },
            cursor: '1',
          },
          {
            node: {
              _id: '2',
              foont: 'barnt',
            },
            cursor: '2',
          },
        ],
        pageInfo: {
          startCursor: '1',
          endCursor: '2',
          hasNextPage: true,
          hasPreviousPage: false,
        },
        count: 2,
      });
    });

    it('should return all elements if before cursor DNE', () => {
      const cursor = buildPaginationObject(data, null, null, '-1');

      expect(cursor).toEqual({
        edges: [
          {
            node: {
              _id: '1',
              foo: 'bar',
            },
            cursor: '1',
          },
          {
            node: {
              _id: '2',
              foont: 'barnt',
            },
            cursor: '2',
          },
          {
            node: {
              _id: '3',
              foot: 'bart',
            },
            cursor: '3',
          },
          {
            node: {
              _id: '4',
              fo: 'ba',
            },
            cursor: '4',
          },
          {
            node: {
              _id: '5',
              food: 'bard',
            },
            cursor: '5',
          },
        ],
        pageInfo: {
          startCursor: '1',
          endCursor: '5',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        count: 5,
      });
    });
  });
});
