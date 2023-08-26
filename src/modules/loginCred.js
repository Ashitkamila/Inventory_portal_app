const logCredit = () => {
  let user = JSON.parse(localStorage.getItem("user_info"));

  if (user !== null && user !== undefined) {
    let credentialsObj = {
      plantID: user.plant_id,
      companyCode: user.company_code,
      companyName: user.company_name,
      plantName: user.plant_name,
      email: user.email,
      userName: user.full_name,
      role: user.role,
    };
    return credentialsObj;
  }
};

export default logCredit;
