import { Category } from '../common/entities/Category';

export class CategortyController {
  private static readonly path = 'https://english-for-kids-alex-protas.herokuapp.com/categories';

  static async getCategory(id: number): Promise<Category> {
    const response = await fetch(`${this.path}`);
    const data = (await response.json()) as {
      id: number;
      name: string;
    };
    return data;
  }

  static async getAllCategory(): Promise<Array<Category>> {
    const response = await fetch(`${this.path}`);
    const data = (await response.json()) as Array<Category>;
    return data;
  }

  static async setCategory(name: string): Promise<number> {
    const method = 'POST';
    const body = { name };
    const response = await fetch(`${this.path}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
        method,
      });
    return response.status;
  }

  static async updateCategory(id: number, name: string): Promise<number> {
    const method = 'PUT';
    const body = { name };
    const response = await fetch(`${this.path}/${id}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
        method,
      });
    return response.status;
  }

  static async deleteCategory(id: number): Promise<number> {
    const method = 'DELETE';
    const response = await fetch(`${this.path}/${id}`,
      {
        method,
      });
    return response.status;
  }
}
