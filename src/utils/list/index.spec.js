import list from "./index";

describe('list', () => {
  test('test1', () => {
    const listNod = [
      {
          "_id": "64847796e2556c5b4d88a10f",
          "name": "User №4",
          "text": "",
          "parent": null,
          "date": "10 июня 2023 в 16:16",
          "children": [
              {
                  "_id": "648477a6e2556c5b4d88a118",
                  "name": "User №4",
                  "text": "",
                  "parent": {
                      "_id": "64847796e2556c5b4d88a10f"
                  },
                  "date": "10 июня 2023 в 16:16",
                  "children": [
                      {
                          "_id": "648477b3e2556c5b4d88a11f",
                          "name": "User №4",
                          "text": "ewr",
                          "parent": {
                              "_id": "648477a6e2556c5b4d88a118"
                          },
                          "date": "10 июня 2023 в 16:16",
                          "children": []
                      },
                      {
                          "_id": "64847ad8e2556c5b4d88a1ea",
                          "name": "User №4",
                          "text": "555",
                          "parent": {
                              "_id": "648477a6e2556c5b4d88a118"
                          },
                          "date": "10 июня 2023 в 16:30",
                          "children": [
                              {
                                  "_id": "64847adce2556c5b4d88a1ee",
                                  "name": "User №4",
                                  "text": "666",
                                  "parent": {
                                      "_id": "64847ad8e2556c5b4d88a1ea"
                                  },
                                  "date": "10 июня 2023 в 16:30",
                                  "children": [
                                      {
                                          "_id": "64847adfe2556c5b4d88a1f1",
                                          "name": "User №4",
                                          "text": "777",
                                          "parent": {
                                              "_id": "64847adce2556c5b4d88a1ee"
                                          },
                                          "date": "10 июня 2023 в 16:30",
                                          "children": []
                                      }
                                  ]
                              }
                          ]
                      }
                  ]
              },
              {
                  "_id": "648477ade2556c5b4d88a11c",
                  "name": "User №4",
                  "text": "werwe",
                  "parent": {
                      "_id": "64847796e2556c5b4d88a10f"
                  },
                  "date": "10 июня 2023 в 16:16",
                  "children": []
              },
              {
                  "_id": "6485c1326519dc6814c1a839",
                  "name": "User №1",
                  "text": "NTCN",
                  "parent": {
                      "_id": "64847796e2556c5b4d88a10f"
                  },
                  "date": "11 июня 2023 в 15:42",
                  "children": []
              }
          ]
      },
      {
          "_id": "648477a1e2556c5b4d88a114",
          "name": "User №4",
          "text": "rter",
          "parent": null,
          "date": "10 июня 2023 в 16:16",
          "children": []
      },
      {
          "_id": "648477a6e2556c5b4d88a118",
          "name": "User №4",
          "text": "",
          "parent": {
              "_id": "64847796e2556c5b4d88a10f"
          },
          "date": "10 июня 2023 в 16:16",
          "children": [
              {
                  "_id": "648477b3e2556c5b4d88a11f",
                  "name": "User №4",
                  "text": "ewr",
                  "parent": {
                      "_id": "648477a6e2556c5b4d88a118"
                  },
                  "date": "10 июня 2023 в 16:16",
                  "children": []
              },
              {
                  "_id": "64847ad8e2556c5b4d88a1ea",
                  "name": "User №4",
                  "text": "555",
                  "parent": {
                      "_id": "648477a6e2556c5b4d88a118"
                  },
                  "date": "10 июня 2023 в 16:30",
                  "children": [
                      {
                          "_id": "64847adce2556c5b4d88a1ee",
                          "name": "User №4",
                          "text": "666",
                          "parent": {
                              "_id": "64847ad8e2556c5b4d88a1ea"
                          },
                          "date": "10 июня 2023 в 16:30",
                          "children": [
                              {
                                  "_id": "64847adfe2556c5b4d88a1f1",
                                  "name": "User №4",
                                  "text": "777",
                                  "parent": {
                                      "_id": "64847adce2556c5b4d88a1ee"
                                  },
                                  "date": "10 июня 2023 в 16:30",
                                  "children": []
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      {
          "_id": "64847adce2556c5b4d88a1ee",
          "name": "User №4",
          "text": "666",
          "parent": {
              "_id": "64847ad8e2556c5b4d88a1ea"
          },
          "date": "10 июня 2023 в 16:30",
          "children": [
              {
                  "_id": "64847adfe2556c5b4d88a1f1",
                  "name": "User №4",
                  "text": "777",
                  "parent": {
                      "_id": "64847adce2556c5b4d88a1ee"
                  },
                  "date": "10 июня 2023 в 16:30",
                  "children": []
              }
          ]
      },
  ]

    expect(list(listNod)).toEqual({
      '64847796e2556c5b4d88a10f':
        { _id: '64847796e2556c5b4d88a10f',
          name: 'User №4',
          text: '',
          parent: null,
          date: '10 июня 2023 в 16:16',
          children:
          [ { _id: '648477a6e2556c5b4d88a118',
              name: 'User №4',
              text: '',
              parent: { _id: '64847796e2556c5b4d88a10f' },
              date: '10 июня 2023 в 16:16',
              children: [] } ] },
      '648477a1e2556c5b4d88a114':
        { _id: '648477a1e2556c5b4d88a114',
          name: 'User №4',
          text: 'rter',
          parent: null,
          date: '10 июня 2023 в 16:16',
          children: [] },
      '648477a6e2556c5b4d88a118':
        { _id: '648477a6e2556c5b4d88a118',
          name: 'User №4',
          text: '',
          parent: { _id: '64847796e2556c5b4d88a10f' },
          date: '10 июня 2023 в 16:16',
          children: [] },
      '64847adce2556c5b4d88a1ee':
        { _id: '64847adce2556c5b4d88a1ee',
          name: 'User №4',
          text: '666',
          parent: { _id: '64847ad8e2556c5b4d88a1ea' },
          date: '10 июня 2023 в 16:30',
          children: [] } });
  });
});
