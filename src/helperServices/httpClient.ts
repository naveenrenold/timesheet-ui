class httpClient {
  private static baseUrl = "http://localhost:5000";

  //Endpoints
  //Attendance
  static getAttendance = "/api/attendance?";
  static postAttendance = "/api/attendance";
  //Auth
  static getAuthorisation = "/api/auth?employeeId=";
  //Employee
  static employeeLogin = "/api/employee/login";
  static updateAttendance = "/api/employee/updateattendance";
  static getEmployee = "/api/employee/getEmployee/"; // +employeeId

  static async get<T>(url: string, handleError = false) {
    let response = await fetch(this.baseUrl + url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    let responseJson: T = await response.json();
    // if (handleError && !response.ok) {
    //   this.handleStatusError(response, responseJson);
    // }
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
  // private static handleStatusError(response: Response, body: any) {
  //   switch (response.status) {
  //     case 400:
  //       alert(body.error || body.message || "Failed due to bad request");
  //       break;
  //     case 500:
  //       alert(body.message || body || "Something went wrong :(");
  //       break;
  //     default:
  //       alert(body.message || body || "Unknown error occured");
  //   }
  // }
}

export default httpClient;
