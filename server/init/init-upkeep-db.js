let error = true

let res = [
  db.getSiblingDB('upkeep'),
  db.vehicles.drop(),
  db.vehicles.insertMany([
    { "_id" : ObjectId("5b23278646681f00060f67b9"), "vin" : "234237987897", "make" : "Honda", "model" : "Civic", "year" : "2001", "odometer" : "10000", "lastOilChange" : "3000", "type" : "gas", "dateCreated" : { "date" : "2018-06-15 02:42:14.468949", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "medium", "options" : { "option" : "value" } }
    { "_id" : ObjectId("5b2327a046681f00060f67ba"), "vin" : "1234123412", "make" : "Tesla", "model" : "300M", "year" : "2017", "odometer" : "20000", "lastOilChange" : "9000", "type" : "electric", "dateCreated" : { "date" : "2018-06-15 02:42:40.621733", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "high", "options" : { "option" : "value" } }
    { "_id" : ObjectId("5b2327be46681f00060f67bb"), "vin" : "123412341234", "make" : "Volkswagon", "model" : "Jetta", "year" : "1999", "odometer" : "335000", "lastOilChange" : "331000", "type" : "diesel", "dateCreated" : { "date" : "2018-06-15 02:43:10.695234", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "low", "options" : { "option" : "value" } }
    { "_id" : ObjectId("5b2327d546681f00060f67bc"), "vin" : "12341234", "make" : "Subaru", "model" : "WRX", "year" : "2001", "odometer" : "45000", "lastOilChange" : "32000", "type" : "gas", "dateCreated" : { "date" : "2018-06-15 02:43:33.741651", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "high", "options" : { "option" : "value" } }
    { "_id" : ObjectId("5b23281946681f0005540f2d"), "vin" : "432634623", "make" : "Toyota", "model" : "Camry", "year" : "1995", "odometer" : "400000", "lastOilChange" : "394000", "type" : "gas", "dateCreated" : { "date" : "2018-06-15 02:44:41.927094", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "medium", "options" : { "option" : "value" } }
  ])
]

printjson(res)

if (error) {
  print('Error, exiting')
  quit(1)
}
