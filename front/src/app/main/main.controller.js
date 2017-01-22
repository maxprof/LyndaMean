export class MainController {
  constructor ($http) {
    'ngInject';
    this.$http = $http;
    this.getMessage();
  }
  postMessage(){
     this.$http.post('http://localhost:5000/api/message', {message: this.message});
  }

  getMessage(){
    var vm = this;    
    this.$http.get('http://localhost:5000/api/message').success((res) => {
      vm.messages = res;
    })
  }
}
