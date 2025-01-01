export class User {
    constructor({ email, password, name, surname }) {
      this.email = email;
      this.password = password;
      this.name = name;
      this.surname = surname;
  
      this.validate();
    }
  
    validate() {
      if (!this.email || !this.isValidEmail(this.email)) {
        throw new Error("Email inválido.");
      }
      if (!this.password || this.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres.");
      }
      if (!this.name || typeof this.name !== "string") {
        throw new Error("El nombre es requerido y debe ser un texto.");
      }
      if (!this.surname || typeof this.surname !== "string") {
        throw new Error("El apellido es requerido y debe ser un texto.");
      }
    }
  
    isValidEmail(email) {
      // Regex básico para validar el correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    toDynamoDBFormat() {
      return {
        pk: `USER#${this.email}`,
        name: this.name,
        surname: this.surname,
        createdAt: new Date().toISOString(),
      };
    }
  }
  