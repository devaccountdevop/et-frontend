export class SignUp {
    private userName: string = "";
    private email: string = "";
    private password: string = "";

    constructor(name: string, email: string, password:string) {
      this.userName = name;
      this.password = password;
      this.email=email;
    }
    getUserName():string {
      return this.userName;
    }
  
    // Setter for userName
    setUserName(value: string) {
      this.userName = value;
    }
  
    // Getter for email
    getEmail(): string {
      return this.email;
    }
  
    // Setter for email
    setEmail(value: string) {
      this.email = value;
    }
  
    // Getter for password
    getPassword(): string {
      return this.password;
    }
  
    // Setter for password
    setPassword(value: string) {
      this.password = value;
    }
  }
  