using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Global;
using WebApi.Models;
using static WebApi.Global.enumFile;

namespace WebApi.Services
{
    public class CandidateDetails
    {
        string connectionString;

        public IConfigurationRoot GetConfiguration()
        {
            var bilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return bilder.Build();
        }
        public CandidateDetails()
        {
            var configuration = GetConfiguration();
            connectionString = configuration.GetSection("Data").GetSection("ConnectionString").Value;
        }

        public IEnumerable<CandidateAllDetailsModel> GetCandidateDetails(int id)
        {
            try
            {
                List<CandidateAllDetailsModel> lstcandidate = new List<CandidateAllDetailsModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("CandidateDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateId", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CandidateAllDetailsModel details = new CandidateAllDetailsModel();
                        details.CandidateName = rdr["candidate_name"].ToString();
                        details.Experience = Convert.ToDouble(rdr["experience"]);
                        details.Mobile = Convert.ToDouble(rdr["mobile"]);
                        details.CandidateTechnology = rdr["technology"].ToString();
                        details.PracticalName = rdr["practical_name"].ToString();
                        details.Category = Convert.ToByte(rdr["category"]);
                        details.Defination = rdr["defination"].ToString();
                        details.PracticalTechnology = rdr["Technology"].ToString();
                        details.Email = rdr["emailAddress"].ToString();
                        details.MachineName = rdr["machine_name"].ToString();
                        details.Floor = Convert.ToInt32(rdr["floor_id"]);
                        details.MachineIP = rdr["machineIP"].ToString();
                        details.WorkingDirectoryPath = rdr["workingDirectory_path"].ToString();
                        details.UserName = rdr["loginName"].ToString();
                        details.AssignedTime = rdr["assigneTime"].ToString();
                        details.TimeTaken = rdr["timeTaken"].ToString();
                        
                        lstcandidate.Add(details);
                    }

                    foreach (CandidateAllDetailsModel x in lstcandidate)
                    {
                        x.CategoryName = ((practicalCategory)x.Category).GetStringValue();
                        x.FloorName= ((Floor)x.Floor).GetStringValue();
                    }
                    con.Close();
                }
                return lstcandidate;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<CandidateInfoModel> GetAllCandidate()
        {
            try
            {
                List<CandidateInfoModel> lstcandidate = new List<CandidateInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getCandidate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateID", 0);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CandidateInfoModel candidate = new CandidateInfoModel();
                        candidate.CandidateId = Convert.ToInt32(rdr["candidate_id"]);
                        candidate.CandidateName = rdr["candidate_name"].ToString();
                        candidate.Experience = Convert.ToDouble(rdr["experience"]);
                        candidate.Technology = rdr["technology"].ToString();
                        candidate.PracticalStatus = Convert.ToInt32(rdr["practical_status"]);
                        candidate.Mobile = Convert.ToDouble(rdr["mobile"]);
                        candidate.Email = rdr["emailAddress"].ToString();

                        lstcandidate.Add(candidate);
                    }
                    foreach (CandidateInfoModel x in lstcandidate)
                    {
                        x.PracStatusName = ((candidateStatus)x.PracticalStatus).GetStringValue();
                    }
                    con.Close();
                }
                return lstcandidate;
            }
            catch
            {
                throw;
            }
        }

        public bool deleteCandidate(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("deleteCandidate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);

                    con.Open();
                    cmd.ExecuteReader();

                    con.Close();
                }
                return true;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<CandidateInfoModel> GetCandidateData(int candidateId)
        {
            try
            {
                List<CandidateInfoModel> lstcandidate = new List<CandidateInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getCandidate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateID", candidateId);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CandidateInfoModel candidate = new CandidateInfoModel();
                        candidate.CandidateId = Convert.ToInt32(rdr["candidate_id"]);
                        candidate.CandidateName = rdr["candidate_name"].ToString();
                        candidate.Experience = Convert.ToDouble(rdr["experience"]);
                        candidate.Technology = rdr["technology"].ToString();
                        candidate.PracticalStatus = Convert.ToInt32(rdr["candidateStatus"]);
                        candidate.Mobile = Convert.ToDouble(rdr["mobile"]);
                        candidate.Email = rdr["emailAddress"].ToString();

                        lstcandidate.Add(candidate);
                    }
                    con.Close();
                }
                return lstcandidate;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<CandidateInfoModel> GetCandidateFilteredData(FilterModel filterData)
        {
            try
            {
                List<CandidateInfoModel> lstcandidate = new List<CandidateInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("filterCandidate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateName", filterData.CandidateName);
                    cmd.Parameters.AddWithValue("@candidateTech", filterData.Technology);
                    cmd.Parameters.AddWithValue("@candidateStatus", filterData.PracticalStatus);
                    cmd.Parameters.AddWithValue("@mobile", filterData.Mobile);
                    cmd.Parameters.AddWithValue("@email", filterData.Email);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CandidateInfoModel candidate = new CandidateInfoModel();
                        candidate.CandidateId = Convert.ToInt32(rdr["candidate_id"]);
                        candidate.CandidateName = rdr["candidate_name"].ToString();
                        candidate.Experience = Convert.ToDouble(rdr["experience"]);
                        candidate.Technology = rdr["technology"].ToString();
                        candidate.PracticalStatus = Convert.ToInt32(rdr["candidateStatus"]);
                        candidate.Mobile = Convert.ToDouble(rdr["mobile"]);
                        candidate.Email = rdr["emailAddress"].ToString();

                        lstcandidate.Add(candidate);
                    }
                    foreach (CandidateInfoModel x in lstcandidate)
                    {
                        x.PracStatusName = ((candidateStatus)x.PracticalStatus).GetStringValue();
                    }
                    con.Close();
                }
                return lstcandidate;
            }
            catch
            {
                throw;
            }
        }



        //To Add new candidate record 
        public int AddCandidate(CandidateInfoModel candidate)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Add_Candidate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateID", 0);
                    cmd.Parameters.AddWithValue("@username", candidate.CandidateName);
                    cmd.Parameters.AddWithValue("@Experience", candidate.Experience);
                    cmd.Parameters.AddWithValue("@Technology", candidate.Technology);
                    cmd.Parameters.AddWithValue("@mobile", candidate.Mobile);
                    cmd.Parameters.AddWithValue("@email", candidate.Email);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateCandidate(CandidateInfoModel candidate, int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Add_Candidate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateID", id);
                    cmd.Parameters.AddWithValue("@username", candidate.CandidateName);
                    cmd.Parameters.AddWithValue("@Experience", candidate.Experience);
                    cmd.Parameters.AddWithValue("@Technology", candidate.Technology);
                    cmd.Parameters.AddWithValue("@mobile", candidate.Mobile);
                    cmd.Parameters.AddWithValue("@email", candidate.Email);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public bool verifyEmail(string email)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("verifyEmail", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@email", email);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        if (Convert.ToInt32(rdr["mailCount"]) == 0)
                        {
                            return true;
                        }
                    }

                    con.Close();
                }
                return false;
            }
            catch
            {
                throw;
            }
        }

    }
}
