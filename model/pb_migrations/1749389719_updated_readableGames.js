/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_108572454")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, player1, player2, vsCPU,games.field,games.status, games.turn, games.winner, games.`oneDevice`,games.`gameCode`,games.`p1Symbol`,games.`p2Symbol` FROM games;"
  }, collection)

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

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_jCSC",
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
    "id": "_clone_uvi6",
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
    "id": "_clone_dJbZ",
    "name": "vsCPU",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_4pao",
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
    "id": "_clone_KhTj",
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
    "id": "_clone_ujsa",
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
    "id": "_clone_Wyni",
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
    "id": "_clone_FZV0",
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
    "id": "_clone_cz78",
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

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Hmft",
    "max": 0,
    "min": 0,
    "name": "p1Symbol",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Ahhy",
    "max": 0,
    "min": 0,
    "name": "p2Symbol",
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
    "viewQuery": "SELECT id, player1, player2, vsCPU,games.field,games.status, games.turn, games.winner, games.`oneDevice`,games.`gameCode` FROM games;"
  }, collection)

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

  // remove field
  collection.fields.removeById("_clone_jCSC")

  // remove field
  collection.fields.removeById("_clone_uvi6")

  // remove field
  collection.fields.removeById("_clone_dJbZ")

  // remove field
  collection.fields.removeById("_clone_4pao")

  // remove field
  collection.fields.removeById("_clone_KhTj")

  // remove field
  collection.fields.removeById("_clone_ujsa")

  // remove field
  collection.fields.removeById("_clone_Wyni")

  // remove field
  collection.fields.removeById("_clone_FZV0")

  // remove field
  collection.fields.removeById("_clone_cz78")

  // remove field
  collection.fields.removeById("_clone_Hmft")

  // remove field
  collection.fields.removeById("_clone_Ahhy")

  return app.save(collection)
})
