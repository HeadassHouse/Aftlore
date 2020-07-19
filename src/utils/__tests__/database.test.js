const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server');
const database = require('../database');

// jest.mock('mongoose', () => ({
//   connect: jest.fn(),
// }));

describe('database', () => {
  const testModel = mongoose.model(
    'test', 
    new mongoose.Schema({
      name: String
    })
  );
  const doc = {
    name: 'Bob',
  };

  it('should connect to the db with defaults', async () => {
    mongoose.connect = jest.fn();
    await database.Connect();
    expect(mongoose.connect).toBeCalled();
  });

  it('should fail to connect to the db', async () => {
    try {
      mongoose.connect = jest.fn().mockImplementation(() => { 
        throw new Error() 
      });

      await database.Connect();
    }
    catch(err) {
      expect(err).toEqual(new Error('CONNECT_ERROR'));
    }
  });

  it('should create a new document', async () => {
    mongoose.Model.prototype.save = jest.fn().mockReturnValue(doc);
    const response = await database.CreateDocument(testModel, doc);      
    expect(response).toEqual(doc);
  });

  it('should throw an error when failing to create a new document', async () => {
    mongoose.Model.prototype.save = jest.fn().mockReturnValue(null);
    try {
      await database.CreateDocument(testModel, doc);
    }
    catch(err) {
      expect(err).toEqual(new Error('CREATE_ERROR'));
    }
  });

  it('should delete a doc', async () => {
    testModel.deleteOne = jest.fn().mockReturnValue(doc);
    const response = await database.DeleteDocument(testModel, doc);
    expect(response).toEqual(doc);
  });

  it('should throw an error when doc to delete doesn\'t exist', async () => {
    testModel.deleteOne = jest.fn().mockReturnValue(null);
    try {
      await database.DeleteDocument(testModel, doc);
    }
    catch(err) {
      expect(err).toEqual(new Error('DELETE_ERROR'));
    }
  });

  it('should delete multiple docs', async () => {
    testModel.deleteMany = jest.fn().mockReturnValue(doc);
    const response = await database.DeleteDocuments(testModel, doc);
    expect(response).toEqual(doc);
  });

  it('should throw an error when docs to delete don\'t exist', async () => {
    testModel.deleteMany = jest.fn().mockReturnValue(null);
    try {
      await database.DeleteDocuments(testModel, doc);
    }
    catch(err) {
      expect(err).toEqual(new Error('DELETE_MUL_ERROR'));
    }
  });

  it('should get a doc', async () => {
    testModel.findOne = jest.fn().mockReturnValue(doc);
    const response = await database.GetDocument(testModel, doc);
    expect(response).toEqual(doc);
  });

  it('should throw an error when doc doesn\'t exist', async () => {
    testModel.findOne = jest.fn().mockReturnValue(null);
    try {
      await database.GetDocument(testModel, doc);
    }
    catch(err) {
      expect(err).toEqual(new Error('NOT_FOUND'));
    }
  });

  it('should get multiple docs', async () => {
    testModel.find = jest.fn().mockReturnValue(doc);
    const response = await database.GetDocuments(testModel, doc);
    expect(response).toEqual(doc);
  });

  it('should throw an error when docs don\'t exist', async () => {
    testModel.find = jest.fn().mockReturnValue(null);
    try {
      await database.GetDocuments(testModel, doc);
    }
    catch(err) {
      expect(err).toEqual(new Error('NOT_FOUND'));
    }
  });

  it('should update a doc', async () => {
    testModel.findOneAndUpdate = jest.fn().mockReturnValue(doc);
    const response = await database.UpdateDocument(testModel, doc);
    expect(response).toEqual(doc);
  });

  it('should throw an error when doc to update doesn\'t exist', async () => {
    testModel.findOneAndUpdate = jest.fn().mockReturnValue(null);
    try {
      await database.UpdateDocument(testModel, doc);
    }
    catch(err) {
      expect(err).toEqual(new Error('UPDATE_ERROR'));
    }
  });
});



