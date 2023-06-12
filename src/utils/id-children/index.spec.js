import getIdChildren from './index';

describe('idChildren', () => {
  test('test1', () => {
    const listNod = {
      "_id": "6485e29f6519dc6814c1aef1",
      "name": "User №7",
      "text": " TYHTYTTYH",
      "parent": {
          "_id": "648561436519dc6814c18d11"
      },
      "date": "11 июня 2023 в 18:05",
      "children": [
          {
              "_id": "6485e2b26519dc6814c1aef3",
              "name": "User №7",
              "text": "4444",
              "parent": {
                  "_id": "6485e29f6519dc6814c1aef1"
              },
              "date": "11 июня 2023 в 18:05",
              "children": [
                  {
                      "_id": "6485e2b86519dc6814c1aef6",
                      "name": "User №7",
                      "text": " TOW",
                      "parent": {
                          "_id": "6485e2b26519dc6814c1aef3"
                      },
                      "date": "11 июня 2023 в 18:05",
                      "children": []
                  }
              ]
          }
      ]
  }

    expect(getIdChildren(listNod)).toEqual("6485e2b86519dc6814c1aef6")
  });

  test('test2', () => {
    const listNod = {
      "_id": "6485e29f6519dc6814c1aef1",
      "name": "User №7",
      "text": " TYHTYTTYH",
      "parent": {
          "_id": "648561436519dc6814c18d11"
      },
      "date": "11 июня 2023 в 18:05",
      "children": [
          {
              "_id": "6485e2b26519dc6814c1aef3",
              "name": "User №7",
              "text": "4444",
              "parent": {
                  "_id": "6485e29f6519dc6814c1aef1"
              },
              "date": "11 июня 2023 в 18:05",
              "children": [
                  {
                      "_id": "6485e2b86519dc6814c1aef6",
                      "name": "User №7",
                      "text": " TOW",
                      "parent": {
                          "_id": "6485e2b26519dc6814c1aef3"
                      },
                      "date": "11 июня 2023 в 18:05",
                      "children": []
                  }
              ]
          }
      ]
  }

    expect(getIdChildren(listNod)).toEqual("6485e2b86519dc6814c1aef6")
  });
});
