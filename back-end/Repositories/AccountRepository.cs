using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;
using Models.Helpers;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class AccountRepository : BaseRepository<Account>
    {
        private readonly ClothetsStoreContext ctx;

        public AccountRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public AccountRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Account>> GetAll()
        {
            return await ctx.Account.ToListAsync();
        }

        public override async Task<Account> GetById(Guid id)
        {
            Account account = await ctx.Account.Where(p => p.AccountId == id)
                                               .FirstOrDefaultAsync();

            return account;
        }

        public async Task<Account> GetAccountByUsername(string username)
        {
            Account account = await ctx.Account.Where(a => a.Username == username)
                                               .FirstOrDefaultAsync();

            return account;
        }

        public async Task<bool> CheckAvailability(string username)
        {
            Account account = await ctx.Account.Where(ac => ac.Username == username)
                                               .FirstOrDefaultAsync();

            return account == null ? true : false;
        }

        public async Task<bool> CheckEmailAvailability(string email)
        {
            Customer customer = await ctx.Customer.Where(c => c.Email == email)
                                                  .FirstOrDefaultAsync();

            return customer == null ? true : false;
        }

        public async Task<bool> CheckOldPasswordByAccountId(ValidationAccountVM validationAccount)
        {
            Account account = await ctx.Account.Where(a => a.AccountId == validationAccount.AccountId && a.Password == validationAccount.Password)
                                               .FirstOrDefaultAsync();

            return account == null ? false : true;
        }

        public async Task<bool> CheckOldPasswordByUsername(ValidationAccountVM validationAccount)
        {
            Account account = await ctx.Account.Where(a => a.Username == validationAccount.Username && a.Password == validationAccount.Password)
                                               .FirstOrDefaultAsync();

            return account == null ? false : true;
        }

        public async Task<bool> ChangePassword(Account account)
        {
            Account acc = new Account();
            acc = await ctx.Account.Where(a => a.AccountId == account.AccountId)
                                   .FirstOrDefaultAsync();

            acc.Password = account.Password;
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateCustomerAccount(Account account)
        {
            account.AccountId = Guid.NewGuid();
            account.RoleId = Guid.Parse("E1BDF26E-230C-42FE-BC87-084FB7753835"); //Customer
            account.StatusId = Guid.Parse("87577063-322E-4901-98D2-FF519341D992");
            ctx.Account.Add(account);
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateCustomerAccountAndCustomer(CustomerAccountVM customerAccount)
        {
            Account account = new Account();
            account.AccountId = Guid.NewGuid();
            account.Username = customerAccount.Username;
            account.Password = customerAccount.Password;
            account.RoleId = Guid.Parse("E1BDF26E-230C-42FE-BC87-084FB7753835"); //Customer
            account.StatusId = Guid.Parse("87577063-322E-4901-98D2-FF519341D992");
            ctx.Account.Add(account);
            await ctx.SaveChangesAsync();

            Customer customer = new Customer();
            customer.CustomerId = Guid.NewGuid();
            customer.Name = customerAccount.Name;
            customer.Phone = customerAccount.Phone == "" ? "blank" : customerAccount.Phone;
            customer.GenderId = customerAccount.GenderId == Guid.Empty ? Guid.Parse("45E3CC14-E862-459F-AB58-09FD3FFEA244") : customerAccount.GenderId; //Nam
            customer.Address = customerAccount.Address == "" ? "blank" : customerAccount.Address;
            customer.Birthday = customerAccount.Birthday;
            customer.Email = customerAccount.Email == "" ? "blank" : customerAccount.Email;
            customer.AccountId = account.AccountId;
            ctx.Customer.Add(customer);
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<string> AuthenticateAccount(Account account, AppSettings appSettings)
        {
            string token = Authenticate(account, appSettings);

            if (token == null)
            {
                return "";
            }

            return token;
        }
        public async Task<string> AuthenticateAccountEmployee(Account account, AppSettings appSettings)
        {
            string token = AuthenticateEmployee(account, appSettings);

            if (token == null)
            {
                return "";
            }

            return token;
        }

        public string Authenticate(Account account, AppSettings appSettings)
        {
            Account accountAuthenticated = ctx.Account.Where(a => a.Username == account.Username && a.Password == account.Password)
                                                      .Include(a => a.Role)
                                                      .FirstOrDefault();

            // return null if account of user not found
            if (accountAuthenticated == null)
            {
                return null;
            }

            else
            {
                Customer customer = ctx.Customer.Where(c => c.AccountId == accountAuthenticated.AccountId).FirstOrDefault();

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);
                //var key = Encoding.ASCII.GetBytes("a");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, customer.CustomerId.ToString().ToUpper()), //claim user id
                        new Claim(ClaimTypes.Role, accountAuthenticated.Role.Name) //claim role,
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
        }
        public string AuthenticateEmployee(Account account, AppSettings appSettings)
        {
            Account accountAuthenticated = ctx.Account.Where(a => a.Username == account.Username && a.Password == account.Password)
                                                      .Include(a => a.Role)
                                                      .FirstOrDefault();

            // return null if user not found
            if (accountAuthenticated == null)
            {
                return null;
            }

            else
            {
                Employee employee = ctx.Employee.Where(c => c.AccountId == accountAuthenticated.AccountId).FirstOrDefault();

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);
                //var key = Encoding.ASCII.GetBytes("a");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        //new Claim(ClaimTypes.Name, customer.Name),
                        //new Claim(ClaimTypes.Email, customer.Email),
                        //new Claim(ClaimTypes.MobilePhone, customer.Phone),
                        //new Claim(ClaimTypes.StreetAddress, customer.Address),
                        //new Claim(ClaimTypes.DateOfBirth, customer.Birthday.ToString()),
                        //new Claim(ClaimTypes.PrimarySid, accountAuthenticated.AccountId.ToString().ToUpper()), //accountId
                        new Claim(ClaimTypes.NameIdentifier, employee.EmployeeId.ToString()), //customerId
                        new Claim(ClaimTypes.Role, accountAuthenticated.Role.Name),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
        }

        public async Task<JWTClaims> ValidateToken(Token token, AppSettings appSettings)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadToken(token.TokenId) as JwtSecurityToken;

            if (jwtToken == null)
                return new JWTClaims();

            var symmetricKey = Encoding.ASCII.GetBytes(appSettings.Secret);

            var validationParameters = new TokenValidationParameters()
            {
                RequireExpirationTime = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
            };

            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token.TokenId, validationParameters, out securityToken);

            var claimList = principal.Claims.ToList();
            JWTClaims claims = new JWTClaims();

            Guid customerId = Guid.Parse(claimList.Where(c => c.Properties.Values.Contains("nameid"))
                                                  .Select(c => c.Value)
                                                  .FirstOrDefault());

            Customer customer = await ctx.Customer.Where(c => c.CustomerId == customerId)
                                                  .Include(c => c.Account)
                                                  .Include(c => c.Account.Role)
                                                  .FirstOrDefaultAsync();

            claims.AccountId = customer.AccountId.ToString();
            claims.CustomerId = customer.CustomerId.ToString();
            claims.Name = customer.Name;
            claims.Email = customer.Email;
            claims.Role = customer.Account.Role.Name;
            claims.Phone = customer.Phone;
            claims.Address = customer.Address;
            claims.Birthday = customer.Birthday;

            //for(int i = 0; i < 8; i++)
            //{
            //    string type = claimList[i].Type;
            //    type = type.Substring(type.IndexOf("claims/") + 7);

            //    switch (type)
            //    {
            //        case "nameidentifier":
            //            claims.CustomerId = claimList[i].Value;
            //            break;
            //        case "name":
            //            claims.Name = claimList[i].Value;
            //            break;
            //        case "emailaddress":
            //            claims.Email = claimList[i].Value;
            //            break;
            //        case "streetaddress":
            //            claims.Address = claimList[i].Value;
            //            break;
            //        case "mobilephone":
            //            claims.Phone = claimList[i].Value;
            //            break;
            //        case "dateofbirth":
            //            claims.Birthday = DateTime.Parse(claimList[i].Value);
            //            break;
            //        case "role":
            //            claims.Role = claimList[i].Value;
            //            break;
            //        case "primarysid":
            //            claims.AccountId = claimList[i].Value;
            //            break;
            //        default:
            //            claims.Phone = claimList[i].Value;
            //            break;
            //    }
            //}

            return claims;
        }
    }
}
