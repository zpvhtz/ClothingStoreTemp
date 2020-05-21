using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class CustomerRepository : BaseRepository<Customer>
    {
        private readonly ClothetsStoreContext ctx;

        public CustomerRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public CustomerRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Customer>> GetAll()
        {
            return await ctx.Customer.ToListAsync();
        }

        public override async Task<Customer> GetById(Guid id)
        {
            Customer customer = await ctx.Customer.Where(p => p.AccountId == id)
                                                  .FirstOrDefaultAsync();

            return customer;
        }

        public async Task<bool> CreateCustomerWithAccountId(CustomerVM customer)
        {
            Customer cus = new Customer();
            cus.CustomerId = Guid.NewGuid();
            cus.Name = customer.Name;
            cus.Phone = customer.Phone;
            cus.GenderId = customer.GenderId;
            cus.Address = customer.Address;
            cus.Birthday = customer.Birthday;
            cus.Email = customer.Email;
            cus.AccountId = customer.AccountId;
            ctx.Customer.Add(cus);
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateCustomerWithUsername(CustomerVM customer)
        {
            Account account = new Account();
            account = await ctx.Account.Where(acc => acc.Username == customer.Username)
                                       .FirstOrDefaultAsync();

            Customer cus = new Customer();
            cus.CustomerId = Guid.NewGuid();
            cus.Name = customer.Name;
            cus.Phone = customer.Phone;
            cus.GenderId = customer.GenderId;
            cus.Address = customer.Address;
            cus.Birthday = customer.Birthday;
            cus.Email = customer.Email;
            cus.AccountId = account.AccountId;
            ctx.Customer.Add(cus);
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateCustomerInformation(Customer customer)
        {
            Customer cus = await ctx.Customer.Where(c => c.CustomerId == customer.CustomerId)
                                             .FirstOrDefaultAsync();

            if(cus == null)
            {
                return false;
            }

            cus.Name = customer.Name;
            cus.Birthday = customer.Birthday;
            cus.Email = customer.Email;
            cus.Phone = customer.Phone;
            cus.GenderId = customer.GenderId;
            cus.Address = customer.Address;
            await ctx.SaveChangesAsync();

            return true;
        }
    }
}
