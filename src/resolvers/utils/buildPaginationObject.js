/* We can assume that the data coming in will be sorted by their _id
  element.  In doing so, when we slice off the unneeded elements, it is
  guarunteed to be correct.

  This algorithm is based on the spec defined here:
  https://relay.dev/graphql/connections.htm
*/
const { ApolloError } = require('apollo-server');

const applyCursorsToEdges = (allEdges, before, after) => {
  let edges = allEdges;
  let hasPreviousPage = false;
  let hasNextPage = false;

  if (after) {
    let index;
    const afterEdge = edges.find(({ _id }, i) => {
      index = i;
      return (String(_id) === String(after));
    });

    if (afterEdge) edges = edges.slice(index + 1);
    if (edges.length !== allEdges.length) hasPreviousPage = true;
  }

  if (before) {
    let index;
    const beforeEdge = edges.find(({ _id }, i) => {
      index = i;
      return (String(_id) === String(before));
    });

    if (beforeEdge) edges = edges.slice(0, index);
    if (edges.length !== allEdges.length) hasNextPage = true;
  }

  return {
    edges,
    hasPreviousPage,
    hasNextPage,
  };
};

const edgesToReturn = (allEdges, first, last) => {
  let edges = allEdges || [];

  if (first) {
    if (first < 0) throw new ApolloError('Cannot be less than 0', 'LESS_THAN_ZERO');

    if (edges.length > first) edges = edges.slice(0, first);
  }

  if (last) {
    if (last < 0) throw new ApolloError('Cannot be less than 0', 'LESS_THAN_ZERO');

    if (edges.length > last) edges = edges.slice(edges.length - last, edges.length);
  }

  return edges;
};

const hasNextPageFunc = (edges, before, first) => {
  if (first) {
    if (edges.length > first) return true;
    return false;
  }

  if (before) return true;

  return false;
};

const hasPreviousPageFunc = (edges, after, last) => {
  if (last) {
    if (edges.length > last) return true;
    return false;
  }

  if (after) return true;

  return false;
};

module.exports = (allEdges, first = null, last = null, before = null, after = null) => {
  if (first && last) { throw new ApolloError('Cannot specify both first and last', 'FIRST_LAST_ERROR'); }

  const {
    edges: cursorEdges,
    hasPreviousPage: afterTag,
    hasNextPage: beforeTag,
  } = applyCursorsToEdges(allEdges, before, after);

  const hasNextPage = hasNextPageFunc(cursorEdges, beforeTag, first);
  const hasPreviousPage = hasPreviousPageFunc(cursorEdges, afterTag, last);

  const edges = edgesToReturn(cursorEdges, first, last);

  const cursor = {
    edges: [],
    pageInfo: {
      startCursor: null,
      endCursor: null,
      hasNextPage,
      hasPreviousPage,
    },
  };

  if (edges.length !== 0) {
    const { _id: startCursor } = edges[0];
    const { _id: endCursor } = edges[edges.length - 1];

    cursor.pageInfo.startCursor = startCursor;
    cursor.pageInfo.endCursor = endCursor;

    edges.forEach((node) => {
      const { _id } = node;

      cursor.edges.push({
        node,
        cursor: _id,
      });
    });
  }

  return cursor;
};
