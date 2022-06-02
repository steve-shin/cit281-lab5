const fastify = require("fastify")();

let students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];


const generateNextId = () => {
  let nextId = null;
  nextId = students.length + 1; 

  return nextId;
};




function appendsToStudent(newStudent) {
  let nextId = generateNextId();
 //  let updatedStudentArray;
console.log(nextId)
  students = [...students, {id: nextId, first: newStudent.first, last: newStudent.last}]


  return students;
}


 function getStudentById(id) {
  for (let s of students) {
      if (s.id === id) {
          return s;
      }
  }
  return "Not Found";
};


fastify.get("/cit/student", function (request, reply) {
  // home route
  reply
    .code(200) // status code
    .header("Content-Type", "application/json; charset=utf-8") // mime type for arrays and jsons
    .send(students); // we need to send back the student array
});


fastify.post("/cit/student", function (request, reply) {
  // home route
  const newStudent = request.body; // {first: "", last: ""}
  const updatedStudentArray = appendsToStudent(newStudent);

  reply
    .code(200) // status code
    .header("Content-Type", "application/json; charset=utf-8") // mime type for arrays and jsons
    .send(updatedStudentArray); // we need to send back the updated student arry
});



fastify.get("/cit/student/:id", (request, reply) => {
  let {id} = request.params
  id = parseInt(id);
  let resp = getStudentById(id);
  if (resp === "Not Found") {
    reply
    .code(404)
    .header("content-Type", "application/json; charset=utf-8")
    .send(resp);
  }
  else {
    reply
    .code(200)
    .header("content-Type", "application/json; charset=utf-8")
    .send(resp);
  }
});



fastify.get("*", (request, reply) => {
  reply
  .code(404)
  .header('Content-Type', 'text/html; charset=utf-8')
  .send("Route Not Found")
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
