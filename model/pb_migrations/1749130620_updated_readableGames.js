/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_108572454")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, player1, player2, vsCPU,games.field,games.status, games.turn, games.winner FROM games;"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_fu2d")

  // remove field
  collection.fields.removeById("_clone_rHpF")

  // remove field
  collection.fields.removeById("_clone_r6tB")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_2dbf",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "player1",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_qpgC",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "player2",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_AWt1",
    "name": "vsCPU",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_H6Vi",
    "maxSize": 0,
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_dauZ",
    "max": 0,
    "min": 0,
    "name": "status",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_MjBV",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "turn",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_y0a0",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "winner",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_108572454")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, player1, player2, vsCPU FROM games;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_fu2d",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "player1",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_rHpF",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "player2",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_r6tB",
    "name": "vsCPU",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // remove field
  collection.fields.removeById("_clone_2dbf")

  // remove field
  collection.fields.removeById("_clone_qpgC")

  // remove field
  collection.fields.removeById("_clone_AWt1")

  // remove field
  collection.fields.removeById("_clone_H6Vi")

  // remove field
  collection.fields.removeById("_clone_dauZ")

  // remove field
  collection.fields.removeById("_clone_MjBV")

  // remove field
  collection.fields.removeById("_clone_y0a0")

  return app.save(collection)
})
