/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3160706085")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_DkAU")

  // remove field
  collection.fields.removeById("_clone_nS8i")

  // remove field
  collection.fields.removeById("_clone_awxs")

  // remove field
  collection.fields.removeById("_clone_gsm9")

  // add field
  collection.fields.addAt(0, new Field({
    "hidden": false,
    "id": "_clone_1i6I",
    "max": null,
    "min": null,
    "name": "cellIndex",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_879072730",
    "hidden": false,
    "id": "_clone_w2jX",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "game",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_CUJO",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "player",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_HALi",
    "max": 0,
    "min": 0,
    "name": "symbol",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3160706085")

  // update collection data
  unmarshal({
    "listRule": null
  }, collection)

  // add field
  collection.fields.addAt(0, new Field({
    "hidden": false,
    "id": "_clone_DkAU",
    "max": null,
    "min": null,
    "name": "cellIndex",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_879072730",
    "hidden": false,
    "id": "_clone_nS8i",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "game",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_awxs",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "player",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_gsm9",
    "max": 0,
    "min": 0,
    "name": "symbol",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_1i6I")

  // remove field
  collection.fields.removeById("_clone_w2jX")

  // remove field
  collection.fields.removeById("_clone_CUJO")

  // remove field
  collection.fields.removeById("_clone_HALi")

  return app.save(collection)
})
