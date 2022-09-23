const upload = require("../common/upload");
const CatalogService = require("../services/catalog.service");

module.exports = (router) => {
  router.post("/catalog", upload.single("file"), CatalogService.insert);
  router.get("/catalog/:id",CatalogService.findById);
  router.get("/catalog/", CatalogService.getAll);
  router.delete("/catalog/:id", CatalogService.delete);
  router.put("/catalog/:id",upload.single("file"), CatalogService.update);
};
