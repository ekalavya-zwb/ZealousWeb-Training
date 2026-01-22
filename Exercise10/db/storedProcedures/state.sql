DELIMITER $$

CREATE PROCEDURE change_employee_state (
    IN p_emp_id INT,
    IN p_state VARCHAR(100)
)
BEGIN
    DECLARE emp_exists INT;
    DECLARE old_state VARCHAR(100);

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

    SELECT state INTO old_state
    FROM employees
    WHERE id = p_emp_id;

    IF old_state = "ON_PROJECT" THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee is ON_PROJECT!';
    END IF;

    IF old_state = "TERMINATED" THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee is already TERMINATED!';
    END IF;

    UPDATE employees
    SET state = p_state
    WHERE id = p_emp_id;

    INSERT INTO transitions_log (emp_id, old_state, new_state)
    VALUES (p_emp_id, old_state, p_state);

    COMMIT;
END $$

DELIMITER ;
