import { convertcsvToJson } from "./csvToJson";
import moment from "moment";

export const getSales = async (req, res) => {
  let status = req.query.status;
  //converting store csv to json array
  var storesPath = "../data/stores.csv";
  const storesJsonArray = await convertcsvToJson(storesPath);

  //converting order csv to json array
  var ordersPath = "../data/orders.csv";
  const ordersJsonArray = await convertcsvToJson(ordersPath);

  //combining both the objects
  let combinedJsonArray = getrequiredJson(storesJsonArray, ordersJsonArray);

  //getting the due date attribute added to the object.
  let jsonWithDueDate = getDaysOverdue(combinedJsonArray);

  // filtering the response based on the status in the query
  if (status) {
    jsonWithDueDate = jsonWithDueDate.filter(
      (obj) => obj.shipment_status == status
    );
  }

  res.status(200).json({ result: jsonWithDueDate });
};

// function to combine the store and order json for the desired format
export const getrequiredJson = (storesJsonArray, ordersJsonArray) => {
  let requiredJsonArray = [];
  storesJsonArray.filter(function (store) {
    return ordersJsonArray.some(function (order) {
      if (store.storeId === order.storeId) {
        let obj = { ...order };
        delete obj.storeId;
        obj = { ...obj, ...store };
        requiredJsonArray.push(obj);
      }
    });
  });
  return requiredJsonArray;
};

//function to get the difference between today and the last date to be shipped. (Days overdue)
export const getDaysOverdue = (resultArray) => {
  resultArray.map((resultObj) => {
    var initialShipmentDate = moment(resultObj.latest_ship_date, "DD/MM/YYYY");
    var today = moment();
    const oneDay = 24 * 60 * 60 * 1000;
    let difference = Math.ceil((today - initialShipmentDate) / oneDay);
    resultObj["daysOverdue"] = difference;
  });
  return resultArray;
};
