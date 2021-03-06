# Tutorial for Script

This Java program allows creating, modifying and deleting data on the SMART sandbox's FHIR server 
by generating HTTP POST, PUT and DELETE requests.

## Set up
The program needs external jar files to run. You need to import them from the `jar` directory before you run the code.


## How to use the methods?
<code>postMethod(path) </code>  Post method allows you to write resource to the server.  what you need to do is create a file and put all the resources you want to post to the server as a individual json file. and pass the path of the file as the method's parameter.

<code>deleteMethod(resourceType, id) </code>  delete method allows you to delete the resource in the server but you need to clarify the resource type you would like to delete and the id of that resource.

<code>putMethod(resourceType, id, file path)</code>  put method, is a update method, when you want to modify the resource already exist in the server, you can use this method to replace the piece of resource in the server.  in this function you need to provide the id of the resource you would like to replace and it's resource type, also the path of the new file which use to replace the resource in the server.

### Example for post
Appointment.json
````
{
    "resourceType": "Appointment",
    "status": "booked",
        "reason": [
          {
            "coding": [
              {
                "system": "snomed",
                "code": "1",
                "display": "Check-up"
              }
            ]
          }
        ],
        "start": "2017-01-02T03:04:05+01:00",
         "participant": [
    {
      "actor": {
        "reference": "Patient/d0d0cde0-4b21-42f6-9c1e-bfa447d72059"
      }
      "required": "required",
      "status": "accepted"
    }
  ]
}
````
this appointment.json is under the C desk. so the path is C:\appointment.json. you should enter this path as string  in the <code>postMethod("C:\appointment,json")</code> method and run it. if you have multiple json files in the C desk it will post all of them one by one. each time you run the method it will print out the response in the console. the console will give you the id of the resource you just created.

##  Log file
The log file will be created when you run the method, it records all the resource's you created and deleted.  each time you run the method script will write a record in the log file. you can file log file under project's root file.
````
POST
ID: 219709  resourceType: Appointment  Date: 2019-02-13 10:40:19  File: json\test.json

DELETE
ID:219705  resourceType:Appointment



````