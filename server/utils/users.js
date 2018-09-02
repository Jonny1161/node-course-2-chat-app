[{
  id: 'ewhaifoehawofeiwhe',
  name: 'Jon',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
    // Working code as well - Self-made
    // var removeIndex = this.users.findIndex((user) => user.id === id);
    // var searched = this.users.filter((user) => user.id === id);
    //
    // var users = this.users.splice(removeIndex, 1);
    //
    // return searched[0];
  }
  getUser (id) {
    var users = this.users.filter((user) => user.id === id);
    return users[0];
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Jon', 27);
// var description = me.getUserDescription();
// console.log(description);
