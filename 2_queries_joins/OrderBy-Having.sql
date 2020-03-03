-- is null / is not

ON students.id = student_id
WHERE students.end_date is NULL

-- Order BY 

SELECT students.name as student, count(assignment_submissions.*) as total_submissions
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.end_date IS NULL
GROUP BY students.name;

-- Having


SELECT students.name as student, 
count(assignment_submissions.*) as total_submissions
FROM students JOIN assignment_submissions ON
students.id = student_id
GROUP BY students.name
HAVING count(assignment_submissions.*) < 100;

-- Join 3 tables

SELECT sum(assignment_submissions.duration) as total_duration
FROM assignment_submissions
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = 'FEB12';

-- Count in specifique collums

SELECT count(id)
FROM students 
WHERE cohort_id IN (1,2,3);

-- Recordatorio -1
-- =====================
-- SELECT
-- FROM
-- GROUP BY
-- HAVING (Filtro los elementos Group By )
-- ORDER BY (ordena despues de having)

-- Recordatorio -2
-- =====================
-- SELECT
-- FROM
-- WHERE (filtra por elemento)
-- GROUP BY
-- HAVING (Filtro los elementos Group By )
-- ORDER BY (ordena despues de having)

-- Join - Groupe BY - Having -Order By
SELECT cohorts.name as cohort_name, COUNT(students.*) AS student_count 
FROM cohorts
JOIN students ON cohorts.id = cohort_id
GROUP by COUNT(students.*)
HAVING COUNT(students.*) >= 18
ORDER BY student_count;