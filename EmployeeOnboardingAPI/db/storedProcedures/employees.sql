DELIMITER $$

CREATE PROCEDURE onboard_employee (
    IN p_email VARCHAR(100),
    IN p_dept_id INT,
    OUT p_dept_count

)
BEGIN

START TRANSACTION;

IF EXISTS (SELECT 1 FROM employees WHERE email = p_email) THEN
    SET Error_Msg = "Email already exists!"
END IF

SELECT COUNT(*) INTO p_dept_count
FROM departments WHERE dept_id = p_dept_id


END $$

DELIMITER ;