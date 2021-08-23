export class UserController {
  private static readonly path = 'https://english-for-kids-alex-protas.herokuapp.com/users/check/';

  static async verifyLogin(login: string, password: string): Promise<boolean> {
    const method = 'POST';
    const body = { login, password };
    const response = await fetch(`${this.path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method,
    });
    if (response.status === 200) {
      localStorage.setItem('login', login);
      return true;
    }
    return false;
  }
}
