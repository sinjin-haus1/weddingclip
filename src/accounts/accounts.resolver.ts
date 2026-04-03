import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Account } from './account.schema';
import { AccountsService } from './accounts.service';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query(() => [Account], { name: 'accounts' })
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Account> {
    return this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  async createAccount(@Args('name') name: string, @Args('type') type: string): Promise<Account> {
    return this.accountsService.create({ name, type });
  }

  @Mutation(() => Account)
  async updateAccount(
    @Args('id', { type: () => ID }) id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('type', { nullable: true }) type?: string,
  ): Promise<Account> {
    return this.accountsService.update(id, { name, type });
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.accountsService.remove(id);
  }
}
