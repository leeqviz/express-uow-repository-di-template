export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async refill(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    const result = await this.usersService.refillWallet(id, amount);
    return res.status(200).json({ success: true, data: result });
  }

  async getAnalytics(req, res) {
    const { id } = req.params;

    const result = await this.usersService.getUserAnalytics(id);
    return res.status(200).json({ success: true, data: result });
  }
}
