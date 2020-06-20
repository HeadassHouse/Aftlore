const assert = require('assert');
const mongoose = require('mongoose');
const database = require('../../src/utils/database');

const testSchema = new mongoose.Schema({
    name: String
  });

const testModel = mongoose.model('test', testSchema);


describe("MongoDB tests", () => {
    before(() => {
        database.Connect()
    });

    describe("Create", () => {
        const createDoc = {
            name: "createDoc"
        }

        it("Should create a new document", async () => {
            database.CreateDocument(testModel, createDoc);
            const doc = await database.GetDocument(testModel, createDoc);
            
            assert.notEqual(doc, null);
            assert.equal( doc.name, createDoc.name );
        });

        after(() => {
            database.DeleteDocument(testModel, createDoc);
        });
    });

    describe("Delete", () => {
        describe("Doc", () => {
            const deleteDoc = {
                name: "deleteDoc"
            }

            before(() => {
                database.CreateDocument(testModel, deleteDoc);
            });

            it("Should successfully delete a doc", async () => {
                database.DeleteDocument(testModel, deleteDoc);
                const doc = await database.GetDocument(testModel, deleteDoc);
                assert.equal( doc, null );
            });
        });

        describe("Docs", () => {
            const deleteDocs = {
                name: "deleteDocs"
            }

            before(() => {
                database.CreateDocument(testModel, deleteDocs);
                database.CreateDocument(testModel, deleteDocs);
                database.CreateDocument(testModel, deleteDocs);
            });

            it("Should successfully delete three docs", async () => {
                database.DeleteDocuments(testModel, deleteDocs);
                const docs = await database.GetDocuments(testModel, deleteDocs);
                assert.equal( docs.length, 0 );
            });
        });
    });

    describe("Get", () => {
        describe("Doc", () => {
            const getDoc = {
                name: "getDoc"
            }

            before(() => {
                database.CreateDocument(testModel, getDoc);
            });

            it("Should successfully get a doc", async () => {
                const doc = await database.GetDocument(testModel, getDoc);
                assert.equal( doc.name, getDoc.name );
            });

            after(() => {
                database.DeleteDocument(testModel, getDoc);
            })
        });

        describe("Docs", () => {
            const getDocs = {
                name: "getDocs"
            }

            before(() => {
                database.CreateDocument(testModel, getDocs);
                database.CreateDocument(testModel, getDocs);
                database.CreateDocument(testModel, getDocs);
            });

            it("Should successfully get three docs", async () => {
                const docs = await database.GetDocuments(testModel, getDocs);
                assert.equal( docs.length, 3 );
            });

            after(() => {
                database.DeleteDocuments(testModel, getDocs);
            })
        });
    });

    describe("Update", () => {
        const updateDoc = {
            name: "updateDoc"
        }

        before(() => {
            database.CreateDocument(testModel, updateDoc);
        });

        it("Should successfully update a doc", async () => {
            const newName = { 
                name: "newName" 
            }
            const doc = await database.UpdateDocument(testModel, updateDoc, newName );

            assert.equal( doc.name, newName.name );
        });
    });
});
