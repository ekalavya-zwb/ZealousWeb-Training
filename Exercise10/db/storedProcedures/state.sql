DELIMITER $$

CREATE PROCEDURE change_employee_state (
    IN p_emp_id INT,
    IN p_state VARCHAR(50)
)
BEGIN
    DECLARE emp_exists INT;
    DECLARE state_check VARCHAR(50);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    SELECT COUNT(*) INTO emp_exists
    FROM employees
    WHERE id = p_emp_id;

    IF emp_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee not found!';
    END IF;

    SELECT state INTO state_check
    FROM employees
    WHERE id = p_emp_id;

    IF state_check = "ON_PROJECT" THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee is assigned to a project!';
    END IF;

    UPDATE employees
    SET state = p_state
    WHERE id = p_emp_id;

    COMMIT;
END $$

DELIMITER ;
