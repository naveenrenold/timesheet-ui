class httpClient {
  private static baseUrl = "http://localhost:5000";

  //Endpoints
  //Attendance
  static postAttendance = "/api/attendance/attendance";
  //Auth
  static getAuthorisation = "/api/auth?employeeId=";
  //Employee
  static employeeLogin = "/api/employee/login";
  static updateAttendance = "/api/employee/updateattendance";
  static getEmployee = "/api/employee/getEmployee/"; // +employeeId

  static async get(url: string) {
    let response = await fetch(this.baseUrl + url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    let responseJson = await response.json();
    return responseJson;
  }

  static async post(url: string, requestBody: any) {
    let response = await fetch(this.baseUrl + url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    let responseJson = await response.json();
    return responseJson;
  }
}

export default httpClient;
