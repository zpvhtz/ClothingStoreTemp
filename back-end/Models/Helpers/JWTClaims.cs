using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Helpers
{
    public class JWTClaims
    {
        public string AccountId { get; set; }
        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
    }
}
