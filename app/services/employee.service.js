import db from "./db.services.js";
import workExperienceService from "./workExperience.service.js";
import trainingExperienceService from "./trainingExperience.service.js";
import lastEducationService from "./lastEducation.service.js";

const getAll = async () => {
  const [rows] = await db.query("SELECT * FROM candidate_employees");

  const employees = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      workExperiences: await workExperienceService.getAllByEmployeeId(row.id),
      trainingExperiences: await trainingExperienceService.getAllByEmployeeId(
        row.id
      ),
      lastEducations: await lastEducationService.getAllByEmployeeId(row.id),
    }))
  );

  return employees;
};

const getOne = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM candidate_employees WHERE user_id = ?",
    [userId]
  );

  // we get the work experience by calling the workExperienceService
  const workExperiences = await workExperienceService.getAllByEmployeeId(
    rows[0].id
  );

  // same thing
  const trainingExperiences =
    await trainingExperienceService.getAllByEmployeeId(rows[0].id);

  // same thing
  const lastEducations = await lastEducationService.getAllByEmployeeId(
    rows[0].id
  );

  const data = {
    ...rows[0],
    workExperiences: workExperiences ? workExperiences : [],
    trainingExperiences: trainingExperiences ? trainingExperiences : [],
    lastEducations: lastEducations ? lastEducations : [],
  };

  return data;
};

const getOneById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM candidate_employees WHERE id = ?",
    [id]
  );

  //   console.log(rows[0]);

  return rows[0];
};

const create = async ({ employee, userId }) => {
  const [result] = await db.query(
    "INSERT INTO candidate_employees " +
      "(user_id, position, name, identity_number, place_and_date_of_birth, " +
      "gender, religion, blood_type, marital_status, address_in_identity_card, address, email, " +
      "phone_number, emergency_contact_name, skills, ready_to_be_placed, salary_expectation) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      employee.position,
      employee.name,
      employee.identity_number,
      employee.place_and_date_of_birth,
      employee.gender,
      employee.religion,
      employee.blood_type,
      employee.marital_status,
      employee.address_in_identity_card,
      employee.address,
      employee.email,
      employee.phone_number,
      employee.emergency_contact_name,
      employee.skills,
      employee.ready_to_be_placed,
      employee.salary_expectation,
    ]
  );

  const employeeId = await result.insertId;

  // if employeeId is null, then we return null
  if (!employeeId) {
    return null;
  }

  let lastEducationIds = [];
  let trainingExperienceIds = [];
  let workExperienceIds = [];

  // console.log(employee.lastEducations);

  // since last education is required when creating an employee,
  // and at the same time, an employee can have multiple last educations,
  // we need to create the last educations first, and then get the last education ids
  // by calling the lastEducationService.create
  lastEducationIds = await Promise.all(
    employee.lastEducations.map((lastEducation) =>
      lastEducationService.create({ lastEducation, employeeId })
    )
  );

  // we check if the employee has training experiences or work experiences
  // if yes then we create them
  if (employee.trainingExperiences && employee.trainingExperiences.length > 0) {
    console.log(employee.trainingExperiences);

    trainingExperienceIds = await Promise.all(
      employee.trainingExperiences.map((trainingExperience) =>
        trainingExperienceService.create({ trainingExperience, employeeId })
      )
    );
  }

  if (employee.workExperiences && employee.workExperiences.length > 0) {
    workExperienceIds = await Promise.all(
      employee.workExperiences.map((workExperience) =>
        workExperienceService.create({ workExperience, employeeId })
      )
    );
  }

  return {
    id: employeeId,
    lastEducationIds,
    trainingExperienceIds,
    workExperienceIds,
  };
};

// special for update service, in the employee objects we actually only passing
// the employee data (wihtout any other data (child table) such as work experiences, training experiences, etc)
const update = async (updatedEmployee, id) => {
  const currentEmployeeData = await getOneById(id);
  const { employee: employeeData } = updatedEmployee;

  if (!currentEmployeeData) {
    return null;
  }

  const employee = {
    ...currentEmployeeData,
    ...employeeData,
  };

  const [result] = await db.query(
    `UPDATE candidate_employees SET 
      position = ?, name = ?, identity_number = ?, place_and_date_of_birth = ?, 
      gender = ?, religion = ?, blood_type = ?, marital_status = ?, 
      address_in_identity_card = ?, address = ?, email = ?, 
      phone_number = ?, emergency_contact_name = ?, skills = ?, 
      ready_to_be_placed = ?, salary_expectation = ?  
      WHERE id = ?`,
    [
      employee.position,
      employee.name,
      employee.identity_number,
      employee.place_and_date_of_birth,
      employee.gender,
      employee.religion,
      employee.blood_type,
      employee.marital_status,
      employee.address_in_identity_card,
      employee.address,
      employee.email,
      employee.phone_number,
      employee.emergency_contact_name,
      employee.skills,
      employee.ready_to_be_placed,
      employee.salary_expectation,
      id,
    ]
  );

  if (!result.affectedRows) {
    return null;
  }

  // we check if there is a training experiences data in the employee object updated
  if (employee.trainingExperiences && employee.trainingExperiences.length > 0) {
    await Promise.all(
      employee.trainingExperiences.map((trainingExperience) =>
        trainingExperienceService.update(trainingExperience)
      )
    );
  }

  // same thing
  if (employee.workExperiences && employee.workExperiences.length > 0) {
    await Promise.all(
      employee.workExperiences.map((workExperience) =>
        workExperienceService.update(workExperience)
      )
    );
  }

  // same thing
  if (employee.lastEducations && employee.lastEducations.length > 0) {
    await Promise.all(
      employee.lastEducations.map((lastEducation) =>
        lastEducationService.update(lastEducation)
      )
    );
  }

  console.log(employee);

  return result.affectedRows;
};

export default {
  getAll,
  getOne,
  create,
  update,
};
