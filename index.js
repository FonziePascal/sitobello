// IMPORT

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const knex = require("knex");
const _ = require("lodash");
const process = require("process");
const nodemailer = require("nodemailer");


// SET TEST VARIABLE
// Locally we should launch the app with TEST=true to use SQLlite
// on Heroku TEST is default at false, so PostGres is used
process.env.TEST = true;

//DATABASE INITIALIZATION FUNCTIONS

// get json files that contains data to populate db
let events_list = require("./other/eventsdata.json");
let locations_list = require("./other/locationsdata.json");
let people_list = require("./other/peopledata.json");
let peopleServices_list = require("./other/peopleservicesdata.json");
let services_list = require("./other/servicesdata.json");
let servicesLocations_list = require("./other/serviceslocationsdata.json");
let whoweare_info = require("./other/whowearedata.json");

let sqlDb;

function initSqlDB() {
    // if I'm testing the application
    if (process.env.TEST) {
        console.log("test mode");
        sqlDb = knex({
            debug: true,
            client: "sqlite3",
            connection: {
                filename: "./other/associationdb.sqlite"
            }
        });
    // Nontestisng
    } else {
        console.log("non-test mode");
        sqlDb = knex({
            debug: true,
            client: "pg",
            connection: process.env.DATABASE_URL,
            ssl: true
        });
    }
}

function initEventsTable() {
    return sqlDb.schema.hasTable("events").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("events", table => {
                table.increments("id").primary();
                table.string("name");
                table.text("description");
                table.date("date");
                table.integer("locationId");
            })
            .then(() => {
                return Promise.all(
                    _.map(events_list, i => {
                        // insert the row
                        return sqlDb("events").insert(i).catch(function(err) {
                            console.log("ERROR WHILE FILLING EVENTS TABLE");
                            console.log(err);
                        })
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}

function initLocationsTable() {
    return sqlDb.schema.hasTable("locations").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("locations", table => {
                // create the table
                table.increments("id").primary();
                table.string("name");
                table.text("basicInfo");
                table.string("mail");
                table.string("address");
                table.string("city");
                table.string("phone");
                table.integer("visitors");
            })
            .then(() => {
                return Promise.all(
                    _.map(locations_list, i => {
                        // insert the row
                        return sqlDb("locations").insert(i).catch( err => {
                            console.log("ERROR WHILE FILLING LOCATIONS TABLE");
                            console.log(err);
                        })
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}

function initPeopleTable() {
    return sqlDb.schema.hasTable("people").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("people", table => {
                table.increments("id").primary();
                table.string("name");
                table.string("surname");
                table.string("role");
                table.text("basicInfo");
                table.string("email");
            })
            .then(() => {
                return Promise.all(
                    _.map(people_list, i => {
                        // insert the row
                        // delete p.basicInfo;
                        return sqlDb("people").insert(i).catch( err => {
                            console.log("ERROR WHILE FILLING PEOPLE TABLE");
                            console.log(err);
                        })
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}

function initPeopleServicesTable() {
    return sqlDb.schema.hasTable("peopleServices").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("peopleServices", table => {
                table.increments("id").primary();
                table.integer("personId");
                table.integer("serviceId");
            })
            .then(() => {
                return Promise.all(
                    _.map(peopleServices_list, i => {
                        // insert the row
                        return sqlDb("peopleServices").insert(i).catch(function(err) {
                            console.log("ERROR WHILE FILLING PEOPLE_SERVICES TABLE");
                            console.log(err);
                        })
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}

function initServicesTable() {
    return sqlDb.schema.hasTable("services").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("services", table => {
                table.increments("id").primary();
                table.string("name");
                table.text("description");
                table.string("contacts");
                table.string("info");
            })
            .then(() => {
                return Promise.all(
                    _.map(services_list, i => {
                        // insert the row
                        return sqlDb("services").insert(i).catch( err => {
                            console.log("ERROR WHILE FILLING SERVICES TABLE");
                            console.log(err);
                        })
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}

function initServicesLocationsTable() {
    return sqlDb.schema.hasTable("servicesLocations").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("servicesLocations", table => {
                table.increments("id").primary();
                table.integer("serviceId");
                table.integer("locationId");
                table.string("locationName");
            })
            .then(() => {
                return Promise.all(
                    _.map(servicesLocations_list, i => {
                        // insert the row
                        return sqlDb("servicesLocations").insert(i).catch(function(err) {
                            console.log("ERROR WHILE FILLING SERVICES_LOCATIONS TABLE");
                            console.log(err);
                        })
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}

function initWhoWeAreTable() {
    return sqlDb.schema.hasTable("whoweare").then(exists => {
        // if doesn't exists, create the table
        if (!exists) {
            sqlDb.schema.createTable("whoweare", table => {
                table.text("info");
            })
            .then(() => {
                return Promise.all(
                    _.map(whoweare_info, i => {
                        // insert the row
                        return sqlDb("whoweare").insert(i).catch( err => {
                            console.log("ERROR WHILE FILLING WHOWEARE TALBE");
                            console.log(err);
                        });
                    })
                );
            });
        //If a table is existing, use that table whitout ricreating it
        } else {
            return true;
        }
    });
}


// for every table required, check if existing. If not create and populate
function initDb() {
    initEventsTable();
    initLocationsTable();
    initPeopleTable();
    initPeopleServicesTable();
    initServicesTable();
    initServicesLocationsTable();
    initWhoWeAreTable();

    return true;
}

// APPLICATION INITIALIZATION

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json({inflate: true}));
app.use(bodyParser.urlencoded({extended: true, inflate: true}));


// APP.GET METHODS

/* retrieve "who we are" data, return result as a JSON array with a single elem */
app.get("/whoweare", function(request, response) {
    // i can retrieve the whole table, because it contains only 1 entry
    let myQuery = sqlDb("whoweare")
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* retrieve data about all services, return result as JSON array */
app.get("/services", function(request,response) {
    let myQuery = sqlDb("services")
        .then(result => {
            response.send(JSON.stringify(result));
        })
})


/* retrieve data about all people, return result as a JSON array */
app.get("/people", function(request, response) {
    let myQuery = sqlDb("people").orderByRaw('surname, name')
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* retrieve data about all the locations return result as a JSON array */
app.get("/locations", function(request, response) {
    let myQuery = sqlDb("locations")
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* retrieve data about all events, return result as a JSON array */
app.get("/events", function(request, response) {
    let myQuery = sqlDb("events").orderBy('date')
        .then(result => {
          response.send(JSON.stringify(result));
        })
})

/* given a person id, retrieve all data about that person,
return result as a JSON array with a single element */
app.get("/people/:id", function(request, response) {
    let myQuery = sqlDb("people");
    myQuery.where("id", request.params.id)
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* given a service id, retrieve all data about that service
 return result as a JSON array with a single element */
app.get("/services/:id", function(request, response) {
    let myQuery = sqlDb("services");
    myQuery.where("id", request.params.id)
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* retrieve data about locations of services. Return result as a JSON array */
app.get("/serviceslocations", function(request, response) {
    let myQuery = sqlDb("serviceslocations")
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* given a location id, retrieve all data about that location
 return result as a JSON array with a single element */
app.get("/locations/:id", function(request, response) {
    let myQuery = sqlDb("locations");
    myQuery.where("id", request.params.id)
        .then(result => {
            response.send(JSON.stringify(result));
        })
})


/* given a location id, retrieve data of the services located in that location
 return result as a JSON array*/
app.get("/servicesinlocation/:id", function(request, response) {
    let myQuery = sqlDb.select().from("services").whereIn("id", function() {
            this.select("serviceId").from("servicesLocations").where("locationId", request.params.id);
        })
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* given a service id, retrieve data of the locations of that service
 return result as a JSON array*/
app.get("/locationsofservice/:id", function(request, response) {
    let myQuery = sqlDb.select().from("locations").whereIn("id", function() {
            this.select("locationId").from("servicesLocations").where("serviceId", request.params.id);
        })
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* given a service id, retrieve data of people working in it
 return result as a JSON array */
app.get("/peoplebyservice/:id", function(request, response) {
    let myQuery = sqlDb.select().from("people").whereIn("id", function() {
            this.select("personId").from("peopleServices").where("serviceId", request.params.id);
        })
        .then(result => {
            response.send(JSON.stringify(result));
        })
})

/* given a person id, retrieve data of services
 return result as a JSON array */
app.get("/servicesbypeople/:id", function(request, response) {
    let myQuery = sqlDb.select().from("services").whereIn("id", function() {
            this.select("serviceId").from("peopleServices").where("personId", request.params.id);
        })
        .then(result => {
            response.send(JSON.stringify(result));
        })
})


// APP.POST METHODS

/* **NOTE**: current implementation of the input form has a slightly
  counter-intuitive behavior,in order to make it easier to test. The input
  email address is used as recipient of the message instead of sender.
  In this way a tester is able to easily verify the behavior of the feature. */

/*  Form data handling. Given the following data:
 *      - name: writer's name
 *      - mail: writer's mail
 *      - subject: subject of the inquery
 *      - message: writer's message
 *
 *      an email will be sent to the writer's mail
 */

app.post('/contactForm', function(request, response) {

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use Secure Socket Layer
        auth: {
            user: 'lacasaperilmondo@gmail.com',
            pass: 'lacasalacasa'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"' + request.body.name + '" <cooperativaandy@gmail.com>', // sender address
        to: request.body.mail, // list of receivers
        subject: request.body.subject, // Subject line
        html: '<p>Message: ' + request.body.message + '</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('thanks');
});

// INSTANTIATION OF THE APPLICATION. WE ARE READY TO START!

let serverPort = process.env.PORT || 5000;
app.set("port", serverPort);

initSqlDB();
initDb();

// Start the server on port 5000
app.listen(serverPort, function() {
    console.log(`Your app is ready at port ${serverPort}`);
});
