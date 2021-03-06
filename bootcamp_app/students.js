const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// === Simple query res= array of obj simple ===

// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(res => {
//     console.log(res.rows);
// })
// .catch(err => console.error('query error', err.stack));


// === Query + JOIN Cohorts res = array of obj (styled foreach object)===
// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// LIMIT 5;
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//   })
// })
// .catch(err => console.error('query error', err.stack));



// // === Query + JOIN + add 1x parameter Cohort.name ++ voir ==> Parameterized Query-1 ===>>
// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3] || 5};
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//   })
// }).catch(err => console.error('query error', err.stack));

// // === Query + JOIN + add 1x parameter teacher.name Assisted ++ voir ==> Parameterized Query-2 ===>>
// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
// ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(row => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   })
// });

//========== Parameterized Query 1 ===============================

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`, limit];

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

  pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  }).catch(err => console.error('query error', err.stack));

  //========== Parameterized Query 2 ===============================
// Store all potentially malicious values in an array. 
const valuesTeacher = [`%${cohortName}%`];

  const queryStringTeachers =`SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = $1 || 'JUL02'
  ORDER BY teacher;
  `;
  pool.query(queryStringTeachers, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
  });