import { Controller, Body, Param, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DepositDto } from './dto/deposit.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { NewTransactionDto } from 'src/transactions/dto/new-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUsers() {
    return this.userService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneUser(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Post()
  async addUser(@Body() user: CreateUserDto) {
    const user_info = await this.userService.create(user);

    const initialDepositTransaction: CreateTransactionDto = {
      sender: user_info.id,
      receiver: user_info.id,
      source_currency: 'USD',
      target_currency: 'USD',
      exchange_rate: 1,
      amount: 1000,
      success: true,
    };

    await this.transactionsService.create(initialDepositTransaction);

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async depositMoney(@Body() deposit: DepositDto) {
    const newDepositTransaction: CreateTransactionDto = {
      sender: deposit.user,
      receiver: deposit.user,
      source_currency: 'USD',
      target_currency: 'USD',
      exchange_rate: 1,
      amount: deposit.amount,
      success: true,
    };

    await this.transactionsService.create(newDepositTransaction);
    return this.userService.deposit(deposit);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  async transferMoney(@Body() details: NewTransactionDto) {
    const amountToTargetCurrency = details.amount * details.exchange_rate;

    const senderBalance = await this.userService.checkBalance(
      details.sender,
      details.source_currency,
    );

    if (senderBalance > details.amount) {
      /* Record and Carryout valid transaction */
      const validTransfer: CreateTransactionDto = {
        sender: details.sender,
        receiver: details.receiver,
        source_currency: details.source_currency,
        target_currency: details.target_currency,
        exchange_rate: details.exchange_rate,
        amount: amountToTargetCurrency,
        success: true,
      };

      this.transactionsService.create(validTransfer); /* Record transaction */
      return this.userService.transfer(validTransfer); /* Make transfer */
    } else {
      /* Record Invalid transaction */
      const invalidTransfer: CreateTransactionDto = {
        sender: details.sender,
        receiver: details.receiver,
        source_currency: details.source_currency,
        target_currency: details.target_currency,
        exchange_rate: details.exchange_rate,
        amount: amountToTargetCurrency,
        success: false,
      };

      this.transactionsService.create(invalidTransfer); /* Record transaction */
    }
  }
}
