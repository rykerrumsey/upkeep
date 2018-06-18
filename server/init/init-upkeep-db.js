db.getSiblingDB('upkeep')
db.vehicles.insertMany([
  { "vin" : "JF2SHGGCXCH496362", "make" : "Honda", "model" : "Civic", "year" : "2001", "odometer" : "120345", "type" : "gas", "dateCreated" : { "date" : "2018-06-12 02:42:14.468949", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "medium", "options" : { "option" : "value" } },
  { "vin" : "2G1WZ121349342347", "make" : "Tesla", "model" : "300M", "year" : "2017", "odometer" : "21432", "type" : "electric", "dateCreated" : { "date" : "2018-06-14 02:42:40.621733", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "high", "options" : { "option" : "value" } },
  { "vin" : "2G1WZ121349342347", "make" : "Ford", "model" : "Volt", "year" : "2014", "odometer" : "43560", "type" : "electric", "dateCreated" : { "date" : "2018-06-15 02:42:40.621733", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "low", "options" : { "option" : "value" } },
  { "vin" : "JF1GC2445PB595785", "make" : "Volkswagon", "model" : "Golf", "year" : "1999", "odometer" : "335000", "type" : "gas", "dateCreated" : { "date" : "2018-06-18 02:43:10.695234", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "low", "options" : { "option" : "value" } },
  { "vin" : "1GCGC34J4XF091047", "make" : "Rebel", "model" : "X-Wing", "year" : "2504", "odometer" : "44234523453", "type" : "atomic", "dateCreated" : { "date" : "2018-06-17 02:43:33.741651", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "high", "options" : { "option" : "value" } },
  { "vin" : "JYA1TAC05LA097994", "make" : "USS", "model" : "Enterprise", "year" : "2322", "odometer" : "623452334", "type" : "atomic", "dateCreated" : { "date" : "2018-06-16 02:44:41.927094", "timezone_type" : 3, "timezone" : "UTC" }, "urgency" : "medium", "options" : { "option" : "value" } }
])
