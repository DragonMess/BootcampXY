SELECT students.name as student, AVG(assignment_submissions.duration)
as average_assignment_duration
FROM students
JOIN assignment_submissions
ON students.id = student_id
WHERE students.end_date is NULL
GROUP by students.name
order BY AVG(assignment_submissions.duration) desc;