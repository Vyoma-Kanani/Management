using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public class UserAuthentication
    {
        string connectionString;

        public IConfigurationRoot GetConfiguration()
        {
            var bilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return bilder.Build();
        }
        public UserAuthentication()
        {
            var configuration = GetConfiguration();
            connectionString = configuration.GetSection("Data").GetSection("ConnectionString").Value;
        }

        public UserDetailsModel authenticateUser(string loginName, string pass)
        {
            try
            {
                UserDetailsModel user = new UserDetailsModel();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("authenticateUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@name", loginName);
                    cmd.Parameters.AddWithValue("@pass", pass);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        user.UserId = Convert.ToInt32(rdr["userId"]);
                        user.LoginName = rdr["loginName"].ToString();
                        user.Password = rdr["password"].ToString();
                        user.Role = Convert.ToInt16(rdr["role"]);
                    }
                    con.Close();
                }
                return user;

            }
            catch
            {
                throw;
            }
        }
        
        public UserDetailsModel getUserDetailsById(int userId)
        {
            try
            {
                UserDetailsModel user = new UserDetailsModel();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getUserDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", userId);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        user.UserId = Convert.ToInt32(rdr["userId"]);
                        user.LoginName = rdr["loginName"].ToString();
                        user.Password = rdr["password"].ToString();
                        user.Role = Convert.ToInt16(rdr["role"]);
                        user.UserName = rdr["userName"].ToString();
                    }
                    con.Close();
                }
                return user;

            }
            catch
            {
                throw;
            }
        }

    }
}
