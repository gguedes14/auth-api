import TokensModel from '../model/TokensModel';

export default class SaveJwtTokens {
  static async saveToken(email: string, token: string) {
    const tokenSaved = await TokensModel.saveToken({
      email,
      token,
    });

    return tokenSaved;
  }
}
