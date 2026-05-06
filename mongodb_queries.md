# MongoDB Zen Class Programme Database

## Database Setup

## Create database

use zenClass;

---

## Users Collection

db.users.insertOne({
  name: "User 1",
  email: "user1@gmail.com",
  batch: "B43"
});

---

## Topics Collection

db.topics.insertOne({
  topic_name: "MongoDB",
  date: new Date("2020-10-10")
});

db.topics.find().pretty();


---

## Tasks Collection

const topic = db.topics.findOne();

db.tasks.insertOne({
  task_name: "MongoDB Task",
  topic_id: topic._id,
  date: new Date("2020-10-10")
});

---

## Mentors Collection

db.mentors.insertOne({
  name: "Mentor1"
});

const mentor = db.mentors.findOne();

db.users.updateOne(
  { name: "User 1" },
  { $set: { mentor_id: mentor._id } }
);

---

## Insert Multiple Users

db.users.insertMany([
  { name: "User 2", email: "user2@gmail.com", batch: "B43", mentor_id: mentor._id },
  { name: "User 3", email: "user3@gmail.com", batch: "B43", mentor_id: mentor._id },
  { name: "User 4", email: "user4@gmail.com", batch: "B43", mentor_id: mentor._id }
]);

---

## Insert More Topics

db.topics.insertMany([
  { topic_name: "HTML", date: new Date("2020-10-05") },
  { topic_name: "CSS", date: new Date("2020-10-07") },
  { topic_name: "JS", date: new Date("2020-11-01") }
]);

---

## Insert Tasks Dynamically

const topics = db.topics.find().toArray();

const tasksData = topics.map(topic => ({
  task_name: topic.topic_name + " Task",
  topic_id: topic._id,
  date: topic.date
}));

db.tasks.insertMany(tasksData);

---

## Company Drives

const users = db.users.find().toArray();

db.company_drives.insertMany([
  {
    company_name: "TCS",
    date: new Date("2020-10-20"),
    students: [users[0]._id, users[1]._id]
  },
  {
    company_name: "Infosys",
    date: new Date("2020-11-02"),
    students: [users[2]._id]
  }
]);

---

## CodeKata

db.codekata.insertMany([
  { user_id: users[0]._id, problems_solved: 20 },
  { user_id: users[1]._id, problems_solved: 45 },
  { user_id: users[2]._id, problems_solved: 10 }
]);

---

## Attendance

db.attendance.insertMany([
  { user_id: users[0]._id, date: new Date("2020-10-16"), status: "absent" },
  { user_id: users[1]._id, date: new Date("2020-10-20"), status: "present" },
  { user_id: users[2]._id, date: new Date("2020-10-25"), status: "absent" }
]);

---

## Task Submissions

const tasks = db.tasks.find().toArray();

db.task_submissions.insertMany([
  { user_id: users[0]._id, task_id: tasks[0]._id, submitted: false },
  { user_id: users[1]._id, task_id: tasks[1]._id, submitted: true },
  { user_id: users[2]._id, task_id: tasks[2]._id, submitted: false }
]);

---

# Queries

---

## Query 1: Topics & Tasks in October

db.topics.find({
  date: {
    $gte: new Date("2020-10-01"),
    $lt: new Date("2020-11-01")
  }
});

db.tasks.find({
  date: {
    $gte: new Date("2020-10-01"),
    $lt: new Date("2020-11-01")
  }
});

---

## Query 2: Company Drives Between 15 Oct – 31 Oct

db.company_drives.find({
  date: {
    $gte: new Date("2020-10-15"),
    $lt: new Date("2020-11-01")
  }
});

---

## Query 3: Company Drives with Students

db.company_drives.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "students",
      foreignField: "_id",
      as: "student_details"
    }
  }
]);

---

## Query 4: Problems Solved by Users

db.codekata.aggregate([
  {
    $group: {
      _id: "$user_id",
      total_problems: { $sum: "$problems_solved" }
    }
  }
]);

---

## Query 5: Mentors with More Than 15 Mentees

db.users.aggregate([
  {
    $group: {
      _id: "$mentor_id",
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 15 }
    }
  }
]);

---

## Query 6: Absent Users & Task Not Submitted (15–31 Oct)

db.attendance.aggregate([
  {
    $match: {
      status: "absent",
      date: {
        $gte: new Date("2020-10-15"),
        $lt: new Date("2020-11-01")
      }
    }
  },
  {
    $lookup: {
      from: "task_submissions",
      localField: "user_id",
      foreignField: "user_id",
      as: "submission"
    }
  },
  {
    $unwind: "$submission"
  },
  {
    $match: {
      "submission.submitted": false
    }
  },
  {
    $count: "absent_and_not_submitted"
  }
]);

---