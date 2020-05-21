using Models;
using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CustomerService : BaseService<Customer, CustomerRepository>
    {

        CustomerRepository customerRepository = new CustomerRepository();

        public async Task<bool> CreateCustomerWithAccountId(CustomerVM customer)
        {
            return await customerRepository.CreateCustomerWithAccountId(customer);
        }

        public async Task<bool> CreateCustomerWithUsername(CustomerVM customer)
        {
            return await customerRepository.CreateCustomerWithUsername(customer);
        }

        public async Task<bool> UpdateCustomerInformation(Customer customer)
        {
            return await customerRepository.UpdateCustomerInformation(customer);
        }
    }
}
