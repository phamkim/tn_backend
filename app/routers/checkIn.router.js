const CheckInService = require("../services/checkIn.service");

module.exports = (router) => {
  router.get("/check_in", CheckInService.getAll);
  router.post("/check_in", CheckInService.insert);
  router.get("/check_in/:id", CheckInService.findById);
  router.delete("/check_in/:id", CheckInService.delete);
  router.put("/check_in/:id", CheckInService.update);
};
