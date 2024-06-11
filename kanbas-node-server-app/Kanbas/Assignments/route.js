import Database from "../Database/index.js";
export default function AssignmentRoutes(app) {

  app.get("/api/assignments", (req, res) => {
    console.log(Database.assignments);
    res.send(Database.assignments);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      _id: new Date().getTime().toString(),
      ...req.body,
      course: cid,
    };

    console.log(newAssignment);
    Database.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(204);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = req.body;
    Database.assignments = Database.assignments.map((a) =>
      a._id === id ? { ...a, ...assignment } : a
    );
    res.sendStatus(204);
  });
}
