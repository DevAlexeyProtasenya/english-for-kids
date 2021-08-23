import { CardType } from '../common/entities/Card';

export class CardController {
  private static readonly path = 'https://english-for-kids-alex-protas.herokuapp.com/card';

  private static readonly pathMain = 'https://english-for-kids-alex-protas.herokuapp.com/';

  static async getCardByCategory(idCategory: number): Promise<Array<CardType>> {
    const response = await fetch(`${this.path}/${idCategory}`);
    const data = (await response.json()) as Array<CardType>;
    data.map((element) => {
      const card = element;
      card.imageSRC = `${this.pathMain}${element.imageSRC}`;
      card.sound = `${this.pathMain}${element.sound}`;
      return card;
    });
    return data;
  }

  static async getAllCards(): Promise<Array<CardType>> {
    const response = await fetch(`${this.path}`);
    const data = (await response.json()) as Array<CardType>;
    return data;
  }

  static async deleteCard(id: number): Promise<number> {
    const method = 'DELETE';
    const response = await fetch(`${this.path}/${id}`,
      {
        method,
      });
    return response.status;
  }
}
