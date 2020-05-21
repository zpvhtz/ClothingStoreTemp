using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ValidationAccountVM
    {
        public Guid AccountId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
