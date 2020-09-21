using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        UserAuthentication objAuthenticate = new UserAuthentication();
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("Login")]
        public UserDetailsModel Login([FromBody]UserDetailsModel login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });

                user.token = tokenString;
            }

            return user;
        }

        private string GenerateJSONWebToken(UserDetailsModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.LoginName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Password),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserDetailsModel AuthenticateUser(UserDetailsModel login)
        {
            UserDetailsModel user = null;

            user = objAuthenticate.authenticateUser(login.LoginName, login.Password);

            //Validate the User Credentials 
            //Demo Purpose, I have Passed HardCoded User Information 
            if (user.LoginName == null)
            {
                user = null;
            }
            return user;
        }

        [HttpGet]
        [Route("getUserDetailsById/{userId}")]
        public UserDetailsModel getUserDetailsById(int userId)
        {
            return objAuthenticate.getUserDetailsById(userId);
        }
    }
}
