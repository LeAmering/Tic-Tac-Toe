/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_108572454")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, player1, player2, vsCPU,games.field,games.status, games.turn, games.winner, games.`oneDevice`,games.`gameCode` FROM games;"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_VhIj")

  // remove field
  collection.fields.removeById("_clone_UiA1")

  // remove field
  collection.fields.removeById("_clone_7uco")

  // remove field
  collection.fields.removeById("_clone_GkWU")

  // remove field
  collection.fields.removeById("_clone_b8b4")

  // remove field
  collection.fields.removeById("_clone_3ryD")

  // remove field
  collection.fields.removeById("_clone_Ke0D")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_ytSi",
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
    "id": "_clone_WWBZ",
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
    "id": "_clone_vFWL",
    "name": "vsCPU",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_K7aQ",
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
    "id": "_clone_bvLd",
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
    "id": "_clone_BOeV",
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
    "id": "_clone_FeL0",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "winner",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "_clone_mnBC",
    "name": "oneDevice",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_dSIs",
    "max": 0,
    "min": 0,
    "name": "gameCode",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_108572454")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, player1, player2, vsCPU,games.field,games.status, games.turn, games.winner FROM games;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_VhIj",
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
    "id": "_clone_UiA1",
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
    "id": "_clone_7uco",
    "name": "vsCPU",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_GkWU",
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
    "id": "_clone_b8b4",
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
    "id": "_clone_3ryD",
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
    "id": "_clone_Ke0D",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "winner",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_ytSi")

  // remove field
  collection.fields.removeById("_clone_WWBZ")

  // remove field
  collection.fields.removeById("_clone_vFWL")

  // remove field
  collection.fields.removeById("_clone_K7aQ")

  // remove field
  collection.fields.removeById("_clone_bvLd")

  // remove field
  collection.fields.removeById("_clone_BOeV")

  // remove field
  collection.fields.removeById("_clone_FeL0")

  // remove field
  collection.fields.removeById("_clone_mnBC")

  // remove field
  collection.fields.removeById("_clone_dSIs")

  return app.save(collection)
})
