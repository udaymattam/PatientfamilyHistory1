import http from "../http-common";

class TutorialDataService {
  getAll() {
      return http.get("saec2458f2-1e24-41c8-b71b-0e701af7583d/Patient/12742633");
  }

  get(id) {
      return http.get(`/ec2458f2-1e24-41c8-b71b-0e701af7583d/FamilyMemberHistory?patient=${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
      return http.get(`/ec2458f2-1e24-41c8-b71b-0e701af7583d/Patient?name=${title}`);
  }
}

export default new TutorialDataService();