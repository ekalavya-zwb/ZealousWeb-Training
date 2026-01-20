DELIMITER $$

CREATE PROCEDURE onboard_employee (
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_hire_date DATE,
    IN p_salary DECIMAL(10,2),
    IN p_dept_id INT,
    IN p_manager_id INT,
    IN p_project_id INT,
    IN p_hours_worked INT,
    IN p_role VARCHAR(100),
    OUT p_employee_id INT

)
BEGIN

    DECLARE v_email_exists INT;
    DECLARE v_dept_exists INT;
    DECLARE v_project_exists INT;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
    RESIGNAL;
END;

START TRANSACTION;

    SELECT COUNT(*) INTO v_email_exists
    FROM employees
    WHERE email = p_email;

    IF v_email_exists > 0 THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee with this email already exists';
    END IF;

    SELECT COUNT(*) INTO v_dept_exists
    FROM departments
    WHERE dept_id = p_dept_id;

    IF v_dept_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid department';
    END IF;

    SELECT COUNT(*) INTO v_project_exists
    FROM projects
    WHERE project_id = p_project_id;

    IF v_project_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid project';
    END IF;

    INSERT INTO employees (
        first_name,
        last_name,
        email,
        hire_date,
        salary,
        dept_id,
        manager_id
    )
    VALUES (
        p_first_name,
        p_last_name,
        p_email,
        p_hire_date,
        p_salary,
        p_dept_id,
        p_manager_id
    );

SET p_employee_id = LAST_INSERT_ID();

INSERT INTO employee_projects (
        emp_id,
        project_id,
        hours_worked,
        role
    )
    VALUES (
        p_employee_id,
        p_project_id,
        p_hours_worked,
        p_role
    );
    COMMIT;

END $$

DELIMITER ;

    




